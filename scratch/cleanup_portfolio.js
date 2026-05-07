const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'portfolio-data.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Extract the array part
    const startMarker = 'const portfolioData = [';
    const endMarker = '];\n\nfunction';
    
    let startIndex = content.indexOf(startMarker);
    let endIndex = content.lastIndexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) {
        console.error("Could not find portfolioData array markers");
        process.exit(1);
    }

    let arrayStr = content.substring(startIndex + startMarker.length, endIndex);
    
    // We need to parse objects. Since they aren't strictly JSON (might have trailing commas, etc.)
    // we'll use a regex to find each object { ... }
    const objects = [];
    const objectRegex = /\{[\s\S]*?\}/g;
    let match;
    
    while ((match = objectRegex.exec(arrayStr)) !== null) {
        let objText = match[0];
        // Basic cleanup to make it JSON-ish
        // Remove trailing commas before closing braces
        objText = objText.replace(/,\s*\}/g, '}');
        try {
            // Keys are quoted in this file, so it might work
            const obj = JSON.parse(objText);
            objects.push(obj);
        } catch (e) {
            // If JSON.parse fails, it might be due to unquoted keys or other issues
            // Let's try a safer but riskier eval-like approach (only if safe)
            // Or just skip/report
            console.warn("Failed to parse object:", objText.substring(0, 50) + "...");
        }
    }

    console.log(`Found ${objects.length} objects.`);

    // Deduplicate by imagePath
    const seenPaths = new Set();
    const uniqueObjects = [];
    
    for (const obj of objects) {
        if (!obj.imagePath || !seenPaths.has(obj.imagePath)) {
            if (obj.imagePath) seenPaths.add(obj.imagePath);
            uniqueObjects.push(obj);
        }
    }

    console.log(`Unique objects: ${uniqueObjects.length}`);

    // Reconstruct the file
    const newArrayStr = JSON.stringify(uniqueObjects, null, 4);
    // Add double space after colon to match original style if desired
    const formattedArrayStr = newArrayStr.replace(/": /g, '":  ');
    
    const header = content.substring(0, startIndex + startMarker.length);
    const footer = content.substring(endIndex);
    
    const newContent = `${header}\n${formattedArrayStr.substring(1, formattedArrayStr.length - 1)}\n${footer}`;
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log("File updated successfully.");

} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
