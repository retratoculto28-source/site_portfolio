# Standardize output encoding to UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$fontsFolder = "css/fonts"
if (-not (Test-Path $fontsFolder)) {
    New-Item -ItemType Directory -Path $fontsFolder | Out-Null
}

$url = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Quicksand:wght@300;400;600&display=swap'
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'

Write-Host "Fetching CSS from Google Fonts..."
$css = Invoke-RestMethod -Uri $url -Headers @{'User-Agent'=$ua}

# Regex to match each @font-face block in the Google Fonts CSS
$matches = [regex]::Matches($css, '(?s)/\* ([^*]+) \*/\s*@font-face\s*\{([^}]+)\}')

$localCssBlocks = @()
$downloadedFiles = @{}

Write-Host "Processing and downloading font files..."

foreach ($m in $matches) {
    $subset = $m.Groups[1].Value.Trim()
    $blockBody = $m.Groups[2].Value
    
    # We only care about latin and latin-ext subsets
    if ($subset -ne "latin" -and $subset -ne "latin-ext") {
        continue
    }

    # Extract font details
    $family = ""
    $style = "normal"
    $weight = "400"
    $remoteUrl = ""

    if ($blockBody -match 'font-family:\s*''([^'']+)''') { $family = $Matches[1] }
    if ($blockBody -match 'font-style:\s*([^;]+)') { $style = $Matches[1].Trim() }
    if ($blockBody -match 'font-weight:\s*([^;]+)') { $weight = $Matches[1].Trim() }
    if ($blockBody -match 'src:\s*url\(([^)]+)\)') { $remoteUrl = $Matches[1] }
    if ($blockBody -match 'unicode-range:\s*([^;]+)') { $range = $Matches[1].Trim() }

    if (-not $remoteUrl) {
        continue
    }

    # Generate a clean, descriptive filename
    $cleanFamily = $family.Replace(" ", "").ToLower()
    $filename = "${cleanFamily}-${weight}-${style}-${subset}.woff2"
    $localFilePath = "$fontsFolder/$filename"

    # Download the file if it hasn't been downloaded in this run
    if (-not $downloadedFiles.ContainsKey($filename)) {
        Write-Host "Downloading $family ($subset, weight $weight, style $style) -> $localFilePath"
        Invoke-WebRequest -Uri $remoteUrl -OutFile $localFilePath
        $downloadedFiles[$filename] = $true
    }

    # Reconstruct the @font-face block with local relative path
    # Using relative path fonts/... since fonts.css will be in css/ directory
    $localUrl = "fonts/$filename"
    $localBlock = @"
/* $subset */
@font-face {
  font-family: '$family';
  font-style: $style;
  font-weight: $weight;
  font-display: swap;
  src: url('$localUrl') format('woff2');
  unicode-range: $range;
}
"@
    $localCssBlocks += $localBlock
}

# Write css/fonts.css file
$fontsCssPath = "css/fonts.css"
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
$fontsCssContent = $localCssBlocks -join "`n`n"
[System.IO.File]::WriteAllText($fontsCssPath, $fontsCssContent, $utf8NoBOM)

Write-Host "Successfully downloaded all fonts and generated $fontsCssPath!"
