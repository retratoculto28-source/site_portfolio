const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, '..', 'Portfólio');
const outputJsFile = path.join(__dirname, 'portfolio-data.js');
let idCounter = 1;

function readDirectory(dir, category = '', subcategory = '') {
    let items = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!category) {
                items = items.concat(readDirectory(fullPath, file));
            } else if (!subcategory) {
                items = items.concat(readDirectory(fullPath, category, file));
            } else {
                items = items.concat(readDirectory(fullPath, category, subcategory + '/' + file));
            }
        } else {
            // It's a file (image)
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.svg', '.gif'].includes(ext)) {
                items.push({
                    id: idCounter++,
                    title: file.replace(ext, '').replace(/_/g, ' '),
                    description: `Uma obra incrível na categoria de ${category} (${subcategory}). Esta peça reflete criatividade, dedicação e um olhar atento aos detalhes.`,
                    category: category,
                    subcategory: subcategory,
                    imagePath: `Portfólio/${category}/${subcategory}/${file}`,
                    date: stat.mtime.toISOString().split('T')[0]
                });
            }
        }
    }
    return items;
}

const portfolioData = readDirectory(portfolioDir);

const jsContent = `// Automatically generated file
const portfolioData = ${JSON.stringify(portfolioData, null, 4)};

// Helper functions
function getPortfolioItems() {
    return portfolioData;
}

function getPortfolioItemById(id) {
    return portfolioData.find(item => item.id === parseInt(id));
}

function getPortfolioItemsByCategory(category, subcategory = null) {
    if (subcategory) {
        return portfolioData.filter(item => item.category === category && item.subcategory === subcategory);
    }
    return portfolioData.filter(item => item.category === category);
}

function getCategoriesTree() {
    const tree = {};
    portfolioData.forEach(item => {
        if (!tree[item.category]) {
            tree[item.category] = new Set();
        }
        if (item.subcategory) {
            tree[item.category].add(item.subcategory);
        }
    });
    
    // Convert Sets to Arrays
    for (const cat in tree) {
        tree[cat] = Array.from(tree[cat]);
    }
    return tree;
}
`;

fs.mkdirSync(__dirname, { recursive: true });
fs.writeFileSync(outputJsFile, jsContent);
console.log('Successfully generated portfolio-data.js with ' + portfolioData.length + ' items.');
