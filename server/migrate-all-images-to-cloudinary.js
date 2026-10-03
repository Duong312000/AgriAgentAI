const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const cloudinary = require('./config/cloudinary');

const imageDir = path.join(__dirname, '../src/assets/image');

const uploadDirectory = async (dir, folderName) => {
  const files = fs.readdirSync(dir);
  const results = {};

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      const subResults = await uploadDirectory(filePath, `${folderName}/${file.toLowerCase().replace(/\s+/g, '_')}`);
      Object.assign(results, subResults);
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
      const fileNameNoExt = path.parse(file).name.toLowerCase().replace(/\s+/g, '_');
      console.log(`🔄 Đang đẩy ảnh [${file}] lên Cloudinary folder [${folderName}]...`);

      try {
        const res = await cloudinary.uploader.upload(filePath, {
          folder: folderName,
          public_id: fileNameNoExt,
          transformation: [{ quality: 'auto', fetch_format: 'auto' }]
        });
        results[file] = res.secure_url;
        console.log(`  ✅ Thành công: ${res.secure_url}`);
      } catch (err) {
        console.error(`  ❌ Lỗi upload file ${file}:`, err.message);
      }
    }
  }

  return results;
};

const runMigration = async () => {
  console.log('🚀 BẮT ĐẦU CHUYỂN ĐỔI TOÀN BỘ ẢNH TRONG DỰ ÁN LÊN CLOUDINARY...\n');
  const uploadedMap = await uploadDirectory(imageDir, 'agriagent_ai');
  
  console.log('\n-----------------------------------------------------------------');
  console.log('🎉 TỔNG HỢP URL CLOUDINARY CỦA TOÀN BỘ ẢNH DỰ ÁN:');
  console.log(JSON.stringify(uploadedMap, null, 2));
  console.log('-----------------------------------------------------------------\n');

  // Ghi kết quả ra file mapping json để seed.js và frontend dễ truy xuất
  fs.writeFileSync(path.join(__dirname, 'cloudinary_images_map.json'), JSON.stringify(uploadedMap, null, 2));
  console.log('📄 Đã ghi danh sách URL Cloudinary vào server/cloudinary_images_map.json');
};

runMigration();
