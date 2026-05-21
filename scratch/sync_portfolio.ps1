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

# Locate the 'Portfólio' folder dynamically
$portfolioDirs = Get-ChildItem -Directory -Filter "*ortf*lio*"
if ($portfolioDirs.Count -eq 0) {
    Write-Error "Could not find portfolio directory matching *ortf*lio*"
    exit 1
}
$portfolioDir = $portfolioDirs[0].Name
Write-Host "Resolved filesystem portfolio directory name as: $portfolioDir"

# Programmatically construct 'Portfólio' for web path prefix to avoid encoding issues
$portfolioName = "Portf" + [char]0xF3 + "lio"

# Build existing paths hash table
$existingPaths = @{}
foreach ($item in $portfolioData) {
    $existingPaths[$item.imagePath] = $item
}

# Recursively scan the Portfólio directory for images (.png, .jpg, .jpeg)
$imageFiles = Get-ChildItem -Path $portfolioDir -Recurse -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png)$' }

$newItems = @()

# Pre-define encoding-safe strings using character codes to prevent terminal encoding corruption
$juntaDescription = "Designs criados ao longo de um est" + [char]0xE1 + "gio para publica" + [char]0xE7 + [char]0xE3 + "o e utiliza" + [char]0xE7 + [char]0xE3 + "o em eventos."
$figmaIdDescription = "Cria" + [char]0xE7 + [char]0xE3 + "o de identidade visual completa, incluindo icon, banner principal e secund" + [char]0xE1 + "rio."
$figmaCartazDescription = "Cartazes inspirados em excertos de m" + [char]0xFA + "sicas"

foreach ($file in $imageFiles) {
    $filename = $file.Name
    
    # Skip temporary files or duplicates with (2) if the original exists
    if ($filename -like "* (2)*") {
        $baseFilename = $filename -replace " \(2\)", ""
        $siblingFiles = Get-ChildItem -Path $file.DirectoryName -File -Filter $baseFilename
        if ($siblingFiles.Count -gt 0) {
            Write-Host "Skipping duplicate/copy file: $filename"
            continue
        }
    }

    # Reconstruct the web-friendly relative path using forward slashes
    $relPath = $file.FullName.Substring($file.FullName.IndexOf($portfolioDir))
    $relPath = $relPath -replace "^$portfolioDir", $portfolioName
    $relPath = $relPath.Replace("\", "/")

    # Check if this file is already in the database
    if (-not $existingPaths.ContainsKey($relPath)) {
        Write-Host "Found new file to register: $relPath"

        # Determine Category and Subcategory from the file path
        $pathParts = $relPath.Split('/')
        $category = $pathParts[1]
        $subcategory = $pathParts[2]
        
        $project = ""
        $title = $file.BaseName
        $description = ""
        $date = "2026-05-18" # Default to last Canva update date for consistency

        # Determine Project, Title, and Description based on category/subcategory and hierarchy
        if ($category -eq "Design") {
            if ($subcategory -eq "Canva") {
                if ($relPath -like "*Junta de Freguesia de Rio Tinto*") {
                    $subfolder = $pathParts[4]
                    $project = "Junta de Freguesia de Rio Tinto ($subfolder)"
                    $description = $juntaDescription
                } else {
                    $project = $pathParts[3]
                }
            } elseif ($subcategory -eq "Figma") {
                if ($relPath -like "*Cartazes musicais*") {
                    $project = "Cartazes musicais"
                    $description = $figmaCartazDescription
                } elseif ($relPath -like "*Identidade Visual*") {
                    $projectFolder = $pathParts[4]
                    $project = "Identidade Visual - $projectFolder"
                    $description = $figmaIdDescription
                } else {
                    $project = $pathParts[3]
                }
            } else {
                $project = $pathParts[3]
            }
        } elseif ($category -eq "Ilustração" -or $category -eq ("Ilustra" + [char]0xE7 + [char]0xE3 + "o")) {
            $project = "Outros"
            if ($pathParts.Length -gt 4) {
                $project = $pathParts[3]
            }
            # Keep it safe
            $description = ""
            # For category naming, let's normalize to "Ilustração"
            $category = "Ilustra" + [char]0xE7 + [char]0xE3 + "o"
        } elseif ($category -eq "Fotografia") {
            $project = "Geral"
            $description = ""
            if ($filename -match 'photo_(\d{4}-\d{2}-\d{2})_') {
                $date = $Matches[1]
            } else {
                $date = "2026-05-06"
            }
            $title = ""
        }

        # Create new item object
        $newItem = [PSCustomObject]@{
            id          = $null
            title       = $title
            description = $description
            category    = $category
            subcategory = $subcategory
            project     = $project
            imagePath   = $relPath
            date        = $date
        }
        $newItems += $newItem
    }
}

if ($newItems.Count -eq 0) {
    Write-Host "No new files detected in Portfólio folder! The database is already up to date."
} else {
    Write-Host "Detected $($newItems.Count) new files to add."
    
    # Combine existing database items with new items
    $combinedData = @()
    foreach ($item in $portfolioData) {
        $combinedData += $item
    }
    foreach ($item in $newItems) {
        $combinedData += $item
    }

    # Re-order the entire list
    $sortedData = $combinedData | Sort-Object {
        $_.category
        $_.subcategory
        $_.project
        $_.imagePath
    }

    # Re-assign consecutive IDs starting from 1
    for ($i = 0; $i -lt $sortedData.Count; $i++) {
        $sortedData[$i].id = $i + 1
    }

    # Convert back to JSON and format nicely
    $newJson = ConvertTo-Json -InputObject $sortedData -Depth 100

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
    Write-Host "Portfolio database successfully synchronized and updated without encoding errors!"
}
