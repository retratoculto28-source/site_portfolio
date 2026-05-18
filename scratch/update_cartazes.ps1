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

# Construct names using character codes to prevent any encoding issues
$portfolioName = "Portf" + [char]0xF3 + "lio"
$musicas = "m" + [char]0xFA + "sicas"
$newItemPath = "$portfolioName/Design/Figma/Cartazes musicais/A Rua.jpg"

Write-Host "Constructed clean item path: $newItemPath"

# Filter out any existing items with "A Rua.jpg" (in case of previous bad runs)
$filteredData = @()
foreach ($item in $portfolioData) {
    if ($item.imagePath -notlike "*A Rua.jpg") {
        $filteredData += $item
    } else {
        Write-Host "Cleaning up existing/broken entry: $($item.imagePath)"
    }
}
$portfolioData = $filteredData

# Create the clean custom object
$newItem = [PSCustomObject]@{
    id          = $null
    title       = "A Rua"
    description = "Cartazes inspirados em excertos de $musicas"
    category    = "Design"
    subcategory = "Figma"
    project     = "Cartazes musicais"
    imagePath   = $newItemPath
    date        = "2026-05-18"
}

# Find the index of "Combo Da Sorte" to insert "A Rua" right next to it
$insertIndex = -1
for ($i = 0; $i -lt $portfolioData.Count; $i++) {
    if ($portfolioData[$i].project -eq "Cartazes musicais" -and $portfolioData[$i].imagePath -like "*Combo da Sorte*") {
        $insertIndex = $i
        break
    }
}

$newPortfolioData = @()
if ($insertIndex -ne -1) {
    # Insert right after "Combo Da Sorte"
    Write-Host "Found 'Combo Da Sorte' at index $insertIndex. Inserting 'A Rua' right after it."
    for ($i = 0; $i -le $insertIndex; $i++) {
        $newPortfolioData += $portfolioData[$i]
    }
    $newPortfolioData += $newItem
    for ($i = $insertIndex + 1; $i -lt $portfolioData.Count; $i++) {
        $newPortfolioData += $portfolioData[$i]
    }
} else {
    # Fallback to appending at the end if "Combo Da Sorte" is not found
    Write-Host "Could not find 'Combo Da Sorte'. Appending 'A Rua' to the end."
    $newPortfolioData = $portfolioData + $newItem
}

# Re-assign consecutive IDs
for ($i = 0; $i -lt $newPortfolioData.Count; $i++) {
    $newPortfolioData[$i].id = $i + 1
}

# Convert back to JSON and format nicely
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
Write-Host "Portfolio data updated successfully with clean encoding!"
