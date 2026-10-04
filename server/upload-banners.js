const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const cloudinary = require('./config/cloudinary');

const img1 = `C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\7949e978-96fb-4643-858c-199a0a5c2340\\.user_uploaded\\media_1791072488918.png`;
const img2 = `C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\7949e978-96fb-4643-858c-199a0a5c2340\\.user_uploaded\\media_1791072965630.png`;

async function main() {
  try {
    const res1 = await cloudinary.uploader.upload(img1, { folder: 'agriagent_ai/banners' });
    console.log('BANNER_1_URL:', res1.secure_url);

    const res2 = await cloudinary.uploader.upload(img2, { folder: 'agriagent_ai/banners' });
    console.log('BANNER_2_URL:', res2.secure_url);
  } catch (err) {
    console.error('Error uploading:', err);
  }
}

main();
