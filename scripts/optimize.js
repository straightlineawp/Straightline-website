import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import extractZip from 'extract-zip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const ASSETS_DIR = path.join(PUBLIC_DIR, 'assets');

const toKebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-.]/g, '');
};

const dirsToProcess = [
  'Articluating boom lift/articulated diesel',
  'Articluating boom lift/articulated electric',
  'telescopic boom lift/telescopic diesel',
  'telescopic boom lift/telescopic electric',
  'Self propelled scissor lift',
  'crawler scissor lift',
  'rough terrain scissor lift',
  'mini electric scissor lift',
];

const rootAssets = [
  'StraightLine LOGO.png',
  'certificate-honway.pdf',
  'warehouse.mp4',
];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function processFile(srcPath, destDir) {
  if (!fs.existsSync(srcPath)) return;
  const fileName = path.basename(srcPath);
  const ext = path.extname(fileName).toLowerCase();
  const nameWithoutExt = path.basename(fileName, ext);
  
  let newName = toKebabCase(nameWithoutExt);
  
  if (['.png', '.jpg', '.jpeg'].includes(ext)) {
    const destPath = path.join(destDir, `${newName}.webp`);
    console.log(`Optimizing image: ${fileName} -> ${newName}.webp`);
    await sharp(srcPath).webp({ quality: 80 }).toFile(destPath);
  } else if (['.mp4', '.pdf'].includes(ext)) {
    const destPath = path.join(destDir, `${newName}${ext}`);
    console.log(`Copying file: ${fileName} -> ${newName}${ext}`);
    fs.copyFileSync(srcPath, destPath);
  }
}

async function main() {
  await ensureDir(ASSETS_DIR);

  console.log('Processing root assets...');
  for (const asset of rootAssets) {
    await processFile(path.join(ROOT_DIR, asset), ASSETS_DIR);
  }

  console.log('Processing category assets...');
  for (const relativeDir of dirsToProcess) {
    const fullDir = path.join(ROOT_DIR, relativeDir);
    if (!fs.existsSync(fullDir)) continue;
    
    // We'll flatten the images into a single assets folder, or keep structure?
    // Let's create subfolders based on category
    const categoryName = toKebabCase(path.basename(relativeDir));
    const destCategoryDir = path.join(ASSETS_DIR, categoryName);
    await ensureDir(destCategoryDir);

    const files = fs.readdirSync(fullDir);
    for (const file of files) {
      const filePath = path.join(fullDir, file);
      if (fs.statSync(filePath).isFile()) {
        await processFile(filePath, destCategoryDir);
      }
    }
  }

  console.log('Extracting frames...');
  const zipPath = path.join(ROOT_DIR, 'frames_24fps.zip');
  const framesDestDir = path.join(ASSETS_DIR, 'frames');
  const tempExtractedDir = path.join(ROOT_DIR, 'temp_frames');
  
  if (fs.existsSync(zipPath)) {
    await ensureDir(framesDestDir);
    await ensureDir(tempExtractedDir);
    
    console.log('Using pre-extracted frames...');
    try {
      // await extractZip(zipPath, { dir: tempExtractedDir });
      
      // Look for the extracted frames
      const walkSync = (dir, filelist = []) => {
        fs.readdirSync(dir).forEach(file => {
          const filepath = path.join(dir, file);
          if (fs.statSync(filepath).isDirectory()) {
            filelist = walkSync(filepath, filelist);
          } else {
            filelist.push(filepath);
          }
        });
        return filelist;
      };

      const extractedFiles = walkSync(tempExtractedDir);
      let count = 0;
      for (const file of extractedFiles) {
        if (file.toLowerCase().endsWith('.png')) {
          const destName = path.basename(file).replace('.png', '.webp');
          await sharp(file)
            .resize(1280, 720)
            .webp({ quality: 75 })
            .toFile(path.join(framesDestDir, destName));
          count++;
          if (count % 50 === 0) console.log(`Processed ${count} frames...`);
        }
      }
      console.log(`Processed ${count} frames in total.`);
    } catch (e) {
      console.error('Error extracting zip:', e);
    }
  }
  
  console.log('Optimization complete!');
}

main().catch(console.error);
