const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/app');
const mapPath = path.join(__dirname, 'cloudinary_images_map.json');
const imgMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

// Bảng thay thế các đường dẫn tĩnh sang HTTPS Cloudinary
const urlReplacements = {
  'assets/image/logo.png': imgMap['logo.png'],
  'assets/image/bia.jpg': imgMap['bia.jpg'],
  'assets/image/nendangnhap.jpg': imgMap['nendangnhap.jpg'],
  'assets/image/splash_banner.jpg': imgMap['splash_banner.jpg'],
  'assets/image/home_banner.jpg': imgMap['home_banner.jpg'],
  'assets/image/home_banner.png': imgMap['home_banner.png'],
  'assets/image/nhanvat.png': imgMap['nhanvat.png'],
  'assets/image/buyer_icon.png': imgMap['buyer_icon.png'],
  'assets/image/nguoi mua.jpg': imgMap['nguoi mua.jpg'],
  'assets/image/co ban trai cay tren thuyen.jpg': imgMap['co ban trai cay tren thuyen.jpg'],
  'assets/image/4d6db1ad7275923ce24c19acbf3b0ad1.jpg': imgMap['4d6db1ad7275923ce24c19acbf3b0ad1.jpg'],
  'assets/image/74acf8d5fc78215adb7b31123fc10cc7.jpg': imgMap['74acf8d5fc78215adb7b31123fc10cc7.jpg'],
  'assets/image/622f949df277af76c811644427ebcace.jpg': imgMap['622f949df277af76c811644427ebcace.jpg'],
  'assets/image/a28917e48c7907a6a465f308c3e68ba2.jpg': imgMap['a28917e48c7907a6a465f308c3e68ba2.jpg'],
  'assets/image/492be8585cfc89c15c16f933b6b71976.jpg': imgMap['492be8585cfc89c15c16f933b6b71976.jpg'],
  'assets/image/bf6893740faf9b9fd905b3094897788d.jpg': imgMap['bf6893740faf9b9fd905b3094897788d.jpg'],
  'assets/image/Trái cây/xoai.jpg': imgMap['xoai.jpg'],
  'assets/image/Trái cây/chom chom ban.jpg': imgMap['chom chom ban.jpg'],
  'assets/image/Trái cây/oi.jpg': imgMap['oi.jpg'],
  'assets/image/Trái cây/dua hau.jpg': imgMap['dua hau.jpg'],
  'assets/image/Trái cây/sau rieng.jpg': imgMap['sau rieng.jpg'],
  'assets/image/Trái cây/vai.jpg': imgMap['vai.jpg'],
  'assets/image/Trái cây/thanh long.jpg': imgMap['thanh long.jpg']
};

const processDirectory = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (/\.(ts|html|css)$/i.test(file)) {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      for (const [oldPath, newUrl] of Object.entries(urlReplacements)) {
        if (newUrl && content.includes(oldPath)) {
          content = content.split(oldPath).join(newUrl);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Đã cập nhật Cloudinary URL trong: ${path.relative(srcDir, filePath)}`);
      }
    }
  }
};

console.log('🚀 Bắt đầu chuyển đổi 100% tất cả các link ảnh trong Angular Frontend sang Cloudinary HTTPS...\n');
processDirectory(srcDir);
console.log('\n🎉 ĐÃ CHUYỂN ĐỔI TOÀN BỘ LINK ẢNH DỰ ÁN SANG CLOUDINARY THÀNH CÔNG!');
