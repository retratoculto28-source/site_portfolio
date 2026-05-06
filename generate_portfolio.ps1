$baseDir = "c:\Users\sm200\Downloads\site portfolio"
$portDir = Get-ChildItem -Path $baseDir -Directory | Where-Object { $_.Name -match "^Portf.*lio" } | Select-Object -First 1

if (-not $portDir) {
    Write-Host "Portfolio directory not found!"
    exit
}

$dir = $portDir.FullName
$output = "$baseDir\js\portfolio-data.js"

if (!(Test-Path -Path "$baseDir\js")) {
    New-Item -ItemType Directory -Path "$baseDir\js"
}

$files = Get-ChildItem -Path $dir -Recurse -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|svg|gif)$" }

$id = 1
$items = @()

foreach ($file in $files) {
    $relPath = $file.FullName.Substring($dir.Length + 1)
    $parts = $relPath -split '\\'
    
    $category = $parts[0]
    $subcategory = ""
    if ($parts.Length -gt 2) {
        $subcategory = $parts[1]
    }
    
    $title = $file.BaseName -replace "_", " "
    
    $desc = "Uma obra incrivel na categoria de " + $category
    if ($subcategory) {
        $desc += " (" + $subcategory + ")"
    }
    $desc += ". Esta peca reflete criatividade, dedicacao e um olhar atento aos detalhes."
    
    $img = $portDir.Name + "/" + ($relPath -replace '\\', '/')
    
    $obj = [ordered]@{
        id = $id
        title = $title
        description = $desc
        category = $category
        subcategory = $subcategory
        imagePath = $img
        date = $file.LastWriteTime.ToString("yyyy-MM-dd")
    }
    $items += $obj
    $id++
}

$json = $items | ConvertTo-Json -Depth 10

$jsContent = "// Automatically generated file
const portfolioData = $json;

function getPortfolioItems() { return portfolioData; }
function getPortfolioItemById(id) { return portfolioData.find(i => i.id == id); }
function getPortfolioItemsByCategory(category, subcategory) {
    if (subcategory) {
        return portfolioData.filter(i => i.category === category && i.subcategory === subcategory);
    }
    return portfolioData.filter(i => i.category === category);
}
"

Set-Content -Path $output -Value $jsContent -Encoding UTF8
Write-Host "Generated portfolio-data.js with $($items.Count) items"
