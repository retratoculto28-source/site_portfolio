import json
import re

# Read the current file
with open("js/portfolio-data.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract the array content
match = re.search(r"const portfolioData = (\[.*\]);", content, re.DOTALL)
if not match:
    print("Could not find portfolioData array")
    exit(1)

data = json.loads(match.group(1))

# Update Photography items
for item in data:
    if item.get("category") == "Fotografia":
        item["title"] = ""
        item["description"] = ""

# Write back
with open("js/portfolio-data.js", "w", encoding="utf-8") as f:
    f.write("// Automatically generated file\n")
    f.write("const portfolioData = ")
    f.write(json.dumps(data, indent=4, ensure_ascii=False))
    f.write(";\n\n")
    f.write("function getPortfolioItems() { return portfolioData; }\n")
    f.write("function getPortfolioItemById(id) { return portfolioData.find(i => i.id == id); }\n")
    f.write("function getPortfolioItemsByCategory(category, subcategory) {\n")
    f.write("    if (subcategory) {\n")
    f.write("        return portfolioData.filter(i => i.category === category && i.subcategory === subcategory);\n")
    f.write("    }\n")
    f.write("    return portfolioData.filter(i => i.category === category);\n")
    f.write("}\n")
