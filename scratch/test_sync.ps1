# Test script for path matching
$jsPath = "js/portfolio-data.js"
$content = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)
$content -match 'const portfolioData = (\[[\s\S]*?\]);' | Out-Null
$jsonStr = $Matches[1]
$portfolioData = ConvertFrom-Json $jsonStr
$existingPaths = @{}
foreach ($item in $portfolioData) {
    $existingPaths[$item.imagePath] = $true
}

$portfolioDirs = Get-ChildItem -Directory -Filter "*ortf*lio*"
$portfolioDir = $portfolioDirs[0].Name
$portfolioName = "Portf" + [char]0xF3 + "lio"

Write-Host "FS Dir:" $portfolioDir
Write-Host "Web Dir:" $portfolioName

$imageFiles = Get-ChildItem -Path $portfolioDir -Recurse -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png)$' }
foreach ($file in $imageFiles) {
    $relPath = $file.FullName.Substring($file.FullName.IndexOf($portfolioDir))
    $relPath = $relPath -replace "^$portfolioDir", $portfolioName
    $relPath = $relPath.Replace("\", "/")
    
    if ($relPath -like "*Encontro*") {
        Write-Host "Path: $relPath"
        Write-Host "Exists in DB: $($existingPaths.ContainsKey($relPath))"
    }
}
