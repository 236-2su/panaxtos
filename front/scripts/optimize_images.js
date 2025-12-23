const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

const targets = [
    {
        path: 'images/renewal/hero.png',
        width: 1920,
        quality: 80,
    },
    {
        dir: 'images/programs',
        width: 800,
        quality: 80,
    },
    {
        dir: 'images/center',
        width: 800,
        quality: 80,
    }
];

async function processFile(filePath, width, quality) {
    const ext = path.extname(filePath);
    if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) return;

    const outputFilePath = filePath.replace(ext, '.webp');

    try {
        const metadata = await sharp(filePath).metadata();
        let transform = sharp(filePath);

        if (metadata.width > width) {
            transform = transform.resize(width);
        }

        await transform
            .webp({ quality: quality })
            .toFile(outputFilePath);

        console.log(`Optimized: ${filePath} -> ${outputFilePath}`);
    } catch (err) {
        console.error(`Error processing ${filePath}:`, err);
    }
}

async function main() {
    for (const target of targets) {
        if (target.path) {
            const fullPath = path.join(publicDir, target.path);
            if (fs.existsSync(fullPath)) {
                await processFile(fullPath, target.width, target.quality);
            } else {
                console.warn(`File not found: ${fullPath}`);
            }
        } else if (target.dir) {
            const dirPath = path.join(publicDir, target.dir);
            if (fs.existsSync(dirPath)) {
                const files = fs.readdirSync(dirPath);
                for (const file of files) {
                    const fullPath = path.join(dirPath, file);
                    await processFile(fullPath, target.width, target.quality);
                }
            } else {
                console.warn(`Directory not found: ${dirPath}`);
            }
        }
    }
}

main();
