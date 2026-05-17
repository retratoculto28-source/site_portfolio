# Standardize output encoding to UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$jsPath = "js/portfolio-data.js"
if (-not (Test-Path $jsPath)) {
    Write-Error "js/portfolio-data.js not found!"
    exit 1
}

# Read existing file content using .NET to ensure UTF8 is read correctly
$content = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)

# Extract array using regex
if ($content -match 'const portfolioData = (\[[\s\S]*?\]);') {
    $jsonStr = $Matches[1]
} else {
    Write-Error "Could not find portfolioData array in js/portfolio-data.js"
    exit 1
}

# Convert JSON string to PowerShell objects
$portfolioData = ConvertFrom-Json $jsonStr

# Dynamically locate the 'Portfólio' folder to prevent encoding issues with powershell.exe
$portfolioDirs = Get-ChildItem -Directory -Filter "*ortf*lio*"
if ($portfolioDirs.Count -eq 0) {
    Write-Error "Could not find portfolio directory matching *ortf*lio*"
    exit 1
}
$portfolioDir = $portfolioDirs[0].Name
Write-Host "Resolved filesystem portfolio directory name as: $portfolioDir"

# Programmatically construct the exact web folder name 'Portfólio' using character codes
$portfolioName = "Portf" + [char]0xF3 + "lio"
Write-Host "Configured web path prefix as: $portfolioName"

# Target subcategories and their directory paths for filesystem scanning
$targets = @{
    "Paisagens" = "$portfolioDir/Fotografia/Paisagens"
    "Pessoas"   = "$portfolioDir/Fotografia/Pessoas"
    "Detalhes"  = "$portfolioDir/Fotografia/Detalhes"
}

$updatedSubcategories = @{}

# Scan directories and update items
foreach ($sub in $targets.Keys) {
    $dirPath = $targets[$sub]
    if (-not (Test-Path $dirPath)) {
        Write-Warning "Directory $dirPath does not exist!"
        continue
    }

    # Get files in the directory
    $files = Get-ChildItem -Path $dirPath -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png)$' }
    $fileNames = $files.Name

    # Existing items in this subcategory
    $existingItems = @()
    foreach ($item in $portfolioData) {
        if ($item.category -eq "Fotografia" -and $item.subcategory -eq $sub) {
            $existingItems += $item
        }
    }
    
    # Track existing paths to avoid adding duplicates
    $existingPaths = @{}
    foreach ($item in $existingItems) {
        $existingPaths[$item.imagePath] = $true
    }

    $combinedItems = @()
    foreach ($item in $existingItems) {
        $combinedItems += $item
    }

    foreach ($file in $files) {
        $filename = $file.Name
        # Check for duplicates like 'filename (2).jpg'
        if ($filename -like "* (2)*") {
            $baseFilename = $filename -replace " \(2\)", ""
            if ($baseFilename -in $fileNames) {
                Write-Host "Skipping duplicate copy of: $filename"
                continue
            }
        }

        # Slashes must be forward slashes for web compatibility
        $relPath = "$portfolioName/Fotografia/$sub/$filename"
        if (-not $existingPaths.ContainsKey($relPath)) {
            Write-Host "Adding new photo to $($sub): $filename"
            
            # Extract date from filename: photo_YYYY-MM-DD_HH-MM-SS.jpg -> YYYY-MM-DD
            $date = "2026-05-17"
            if ($filename -match 'photo_(\d{4}-\d{2}-\d{2})_') {
                $date = $Matches[1]
            }

            # Create new custom object matching the schema
            $newItem = [PSCustomObject]@{
                id          = $null
                title       = ""
                description = ""
                category    = "Fotografia"
                subcategory = $sub
                imagePath   = $relPath
                date        = $date
            }
            $combinedItems += $newItem
        }
    }

    # Sort combined items by imagePath (chronological due to filename pattern)
    $sortedItems = $combinedItems | Sort-Object { $_.imagePath.ToLower() }
    $updatedSubcategories[$sub] = $sortedItems
}

# Rebuild portfolioData list preserving target subcategory positions
$newPortfolioData = @()
$processedTargets = @{}

foreach ($item in $portfolioData) {
    $cat = $item.category
    $sub = $item.subcategory
    
    if ($cat -eq "Fotografia" -and $targets.ContainsKey($sub)) {
        if (-not $processedTargets.ContainsKey($sub)) {
            foreach ($subItem in $updatedSubcategories[$sub]) {
                $newPortfolioData += $subItem
            }
            $processedTargets[$sub] = $true
        }
    } else {
        $newPortfolioData += $item
    }
}

# Re-assign consecutive IDs
for ($i = 0; $i -lt $newPortfolioData.Count; $i++) {
    $newPortfolioData[$i].id = $i + 1
}

# Convert back to JSON and format nicely
# Ensure we set a deep recursion depth to prevent truncation
$newJson = ConvertTo-Json -InputObject $newPortfolioData -Depth 100

# Write the final JavaScript file with custom UTF8 encoding without BOM
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

$jsOutContent = @"
// Automatically generated file
const portfolioData = $newJson;

function getPortfolioItems() { return portfolioData; }
function getPortfolioItemById(id) { return portfolioData.find(i => i.id == id); }
function getPortfolioItemsByCategory(category, subcategory) {
    if (subcategory) {
        return portfolioData.filter(i => i.category === category && i.subcategory === subcategory);
    }
    return portfolioData.filter(i => i.category === category);
}
"@

[System.IO.File]::WriteAllText($jsPath, $jsOutContent, $utf8NoBOM)
Write-Host "Portfolio data updated successfully via PowerShell!"
