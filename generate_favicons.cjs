const sharp = require('sharp');
const path = require('path');

async function generateFavicons() {
  const input = path.join(__dirname, 'public', 'assets', 'StraightLine_Favicon_512x512.png');
  const publicDir = path.join(__dirname, 'public');

  try {
    // Generate favicons
    await sharp(input).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.ico'));
    await sharp(input).resize(16, 16).png().toFile(path.join(publicDir, 'favicon-16x16.png'));
    await sharp(input).resize(32, 32).png().toFile(path.join(publicDir, 'favicon-32x32.png'));
    await sharp(input).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('Favicons generated successfully.');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons();
