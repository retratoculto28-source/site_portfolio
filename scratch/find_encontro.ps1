# Find Encontro in database
$jsPath = "js/portfolio-data.js"
$content = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)
$content -match 'const portfolioData = (\[[\s\S]*?\]);' | Out-Null
$jsonStr = $Matches[1]
$portfolioData = ConvertFrom-Json $jsonStr

$matches = $portfolioData | Where-Object { $_.imagePath -like "*Encontro*" }
Write-Host "Found matches: $($matches.Count)"
foreach ($m in $matches) {
    Write-Host "ID:" $m.id
    Write-Host "Title:" $m.title
    Write-Host "ImagePath:" $m.imagePath
    Write-Host "---"
}
