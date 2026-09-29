import os

output_dir = r"d:\mytool\AgriAgentAI\giaodienhtml"
os.makedirs(output_dir, exist_ok=True)

# Helper function to generate web mobile HTML document wrapper without fake phone shell
def wrap_html(title, content, current_page=""):
    return f"""<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <div class="web-container">
    <div class="app-content">
{content}
    </div>
  </div>
</body>
</html>
"""

# Helper function for bottom navigation bar - Taller Capsule & Enhanced Drop Shadow
def get_bottom_nav(active_tab):
    tabs = [
        ("Trang chủ", "08-trang-chu-nong-dan.html", "fa-solid fa-house", active_tab == "home"),
        ("Trò chuyện", "14-danh-sach-tro-chuyen.html", "fa-regular fa-comment-dots", active_tab == "chat"),
        ("Thông Báo", "10-thong-bao.html", "fa-regular fa-bell", active_tab == "notifications"),
        ("Cá nhân", "13-ca-nhan.html", "fa-regular fa-user", active_tab == "profile")
    ]
    
    html = '<div class="bottom-nav">\n'
    for name, link, icon, is_active in tabs:
        active_cls = "active" if is_active else ""
        html += f'  <a href="{link}" class="nav-item {active_cls}">\n'
        html += f'    <i class="{icon}"></i>\n'
        html += f'    <span>{name}</span>\n'
        html += '  </a>\n'
    html += '</div>\n'
    return html

# ----------------------------------------------------------------------
# 01. Splash Screen
# ----------------------------------------------------------------------
page_01 = """
      <div style="background: url('../image/splash_banner.jpg') no-repeat center top / cover; min-height: 100vh; display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; padding: 0 24px 40px 24px; box-sizing: border-box;">
        <div style="margin-top: 18vh; display: flex; flex-direction: column; align-items: center; width: 100%;">
          <img src="../image/logo.png" alt="Nông Thương Logo" style="width: 350px; max-width: 88%; height: auto; margin-bottom: -10px; filter: drop-shadow(0 6px 14px rgba(0,0,0,0.1));">
          <h1 style="font-size: 36px; font-weight: 800; color: #1c522a; letter-spacing: 0.5px; margin-top: -26px; margin-bottom: 4px; text-shadow: 0 3px 6px rgba(0,0,0,0.25), 0 1px 2px rgba(255,255,255,0.8);">
            NÔNG THƯƠNG
          </h1>
          <p style="font-family: 'Dancing Script', 'Georgia', cursive, serif; font-size: 22px; font-weight: 700; color: #234d20; margin-top: 2px; text-shadow: 0 1px 2px rgba(255,255,255,0.6);">Nông sản Việt, giá trị Việt</p>
        </div>

        <div style="margin-top: 11vh; width: 100%; max-width: 340px;">
          <a href="03-dang-nhap.html" class="btn-primary" style="background-color: #88ad37; color: #ffffff; font-size: 18px; padding: 16px 20px; border-radius: 30px; font-weight: 800; box-shadow: 0 8px 22px rgba(0,0,0,0.22), 0 4px 12px rgba(100,135,40,0.3); filter: drop-shadow(0 4px 8px rgba(0,0,0,0.18)); display: flex; align-items: center; justify-content: center; text-decoration: none; width: 100%;">
            Đăng nhập
          </a>
          <p style="margin-top: 18px; font-size: 15px; color: #2d4612; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.25), 0 1px 2px rgba(255,255,255,0.8); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));">
            Bạn chưa có tài khoản, <a href="02-dang-ky.html" style="color: #1c522a; font-weight: 800; text-decoration: underline;">Đăng ký ngay</a>
          </p>
        </div>
      </div>
"""
with open(os.path.join(output_dir, "01-man-hinh-chao.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Màn hình chào", page_01))

# ----------------------------------------------------------------------
# 02. Register Screen
# ----------------------------------------------------------------------
page_02 = """
      <div style="padding: 20px 20px 30px 20px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; position: relative; box-sizing: border-box; overflow: hidden;">
        <!-- Góc trên bên trái: Logo Nông Thương -->
        <img src="../image/logo.png" alt="Nông Thương Logo" style="position: absolute; top: 16px; left: 16px; height: 42px; width: auto; z-index: 2;">

        <!-- Góc trên bên phải: Hình bìa hoa văn bia.jpg -->
        <img src="../image/bia.jpg" alt="Hoa văn bìa" style="position: absolute; top: 0; right: 0; width: 160px; height: auto; z-index: 1; pointer-events: none;">

        <!-- Tiêu đề Đăng ký -->
        <div style="text-align: center; margin-top: 45px; margin-bottom: 18px; z-index: 2;">
          <h2 style="font-size: 30px; font-weight: 800; color: #769f2e; margin-bottom: 4px;">Đăng ký</h2>
          <p style="font-size: 14px; color: #555555; margin: 0;">Đăng ký tài khoản để bắt đầu hành trình của bạn</p>
        </div>

        <!-- Thẻ Form chọn vai trò và nhập thông tin -->
        <div style="border: 1.5px solid #b8d67c; background-color: #f9faee; border-radius: 20px; padding: 18px 16px; margin-bottom: 16px; z-index: 2;">
          <div style="text-align: center; font-size: 16px; font-weight: 700; color: #587820; margin-bottom: 14px;">Vai trò</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 18px;">
            <div id="role-farmer" onclick="selectRole('farmer')" style="background: #ffffff; border: 2.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(118, 159, 46, 0.25);">
              <img src="../image/4d6db1ad7275923ce24c19acbf3b0ad1.jpg" alt="Người nông dân" style="height: 44px; width: auto; margin-bottom: 6px; object-fit: contain;">
              <div style="font-size: 14px; font-weight: 800; color: #2d4612;">Người nông dân</div>
            </div>
            <div id="role-buyer" onclick="selectRole('buyer')" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 14px 8px; text-align: center; cursor: pointer; opacity: 0.65; transition: all 0.2s ease;">
              <img src="../image/buyer_icon.png" alt="Người mua hàng" style="height: 44px; width: auto; margin-bottom: 6px; object-fit: contain;">
              <div style="font-size: 14px; font-weight: 800; color: #2d4612;">Người mua hàng</div>
            </div>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Tên (*):</label>
            <input type="text" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập họ và tên">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Tên đăng nhập(*):</label>
            <input type="text" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập tên đăng nhập">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Mật khẩu(*):</label>
            <input type="password" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập mật khẩu">
          </div>
          <div style="margin-bottom: 0;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 6px;">Nhập lại mật khẩu(*):</label>
            <input type="password" style="width: 100%; height: 42px; background: #ffffff; border: 1px solid #d4e3b5; border-radius: 22px; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;" placeholder="Nhập lại mật khẩu">
          </div>
        </div>

        <!-- Điều khoản -->
        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 18px; padding: 0 4px; z-index: 2;">
          <input type="checkbox" id="terms" style="width: 18px; height: 18px; accent-color: #769f2e; cursor: pointer;">
          <label for="terms" style="font-size: 13px; color: #555555; line-height: 1.35;">
            Tôi đồng ý với chính sách và điều khoản của Hệ thống của Nông Thương
          </label>
        </div>

        <!-- Nút Đăng ký -->
        <a id="btn-register" href="08-trang-chu-nong-dan.html" style="display: flex; align-items: center; justify-content: center; background-color: #88ad37; color: #ffffff; font-size: 18px; font-weight: 800; height: 48px; border-radius: 25px; text-decoration: none; box-shadow: 0 4px 12px rgba(136,173,55,0.3); margin-bottom: 16px; z-index: 2;">Đăng ký</a>

        <script>
        function selectRole(role) {
          const farmerBox = document.getElementById('role-farmer');
          const buyerBox = document.getElementById('role-buyer');
          const regBtn = document.getElementById('btn-register');

          if (role === 'farmer') {
            farmerBox.style.border = '2.5px solid #769f2e';
            farmerBox.style.opacity = '1';
            farmerBox.style.boxShadow = '0 4px 12px rgba(118, 159, 46, 0.25)';

            buyerBox.style.border = '1.5px solid #cbd5e1';
            buyerBox.style.opacity = '0.65';
            buyerBox.style.boxShadow = 'none';

            if (regBtn) regBtn.href = '08-trang-chu-nong-dan.html';
          } else {
            buyerBox.style.border = '2.5px solid #769f2e';
            buyerBox.style.opacity = '1';
            buyerBox.style.boxShadow = '0 4px 12px rgba(118, 159, 46, 0.25)';

            farmerBox.style.border = '1.5px solid #cbd5e1';
            farmerBox.style.opacity = '0.65';
            farmerBox.style.boxShadow = 'none';

            if (regBtn) regBtn.href = '09-trang-chu-nguoi-mua.html';
          }
        }
        </script>

        <!-- Đã có tài khoản? -->
        <div style="text-align: center; font-size: 14px; color: #666666; margin-bottom: 16px; z-index: 2;">
          Đã có tài khoản? <a href="03-dang-nhap.html" style="color: #769f2e; font-weight: 700; text-decoration: none;">Đăng nhập</a>
        </div>

        <!-- Đăng nhập mạng xã hội -->
        <div style="text-align: center; position: relative; margin-top: auto; margin-bottom: 14px; z-index: 2;">
          <span style="position: relative; z-index: 2; background-color: #ffffff; padding: 0 12px; font-size: 13px; color: #888888;">hoặc tiếp tục bằng mạng xã hội</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; z-index: 2;">
          <button style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; height: 42px; font-size: 14px; font-weight: 600; color: #333333; cursor: pointer;"><i class="fa-brands fa-facebook" style="color: #1877f2; font-size: 18px;"></i> Facebook</button>
          <button style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; height: 42px; font-size: 14px; font-weight: 600; color: #333333; cursor: pointer;"><i class="fa-brands fa-google" style="color: #ea4335; font-size: 18px;"></i> Google</button>
        </div>
      </div>
"""
with open(os.path.join(output_dir, "02-dang-ky.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Đăng ký tài khoản", page_02))

# ----------------------------------------------------------------------
# 03. Login Screen
# ----------------------------------------------------------------------
page_03 = """
      <div style="background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; position: relative; box-sizing: border-box;">
        <!-- Top Banner Header với nendangnhap.jpg và vòm lượn sóng uốn cong cao bên trái -->
        <div style="height: 250px; position: relative; overflow: hidden; background-color: #e2e8f0;">
          <img src="../image/nendangnhap.jpg" alt="Chợ nổi trái cây" style="width: 100%; height: 100%; object-fit: cover; object-position: center;">
          <svg style="position: absolute; bottom: -1px; left: 0; width: 100%; height: 75px; z-index: 2; pointer-events: none;" viewBox="0 0 500 100" preserveAspectRatio="none">
            <path d="M 0,100 L 0,55 C 35,15 110,-5 190,30 C 280,65 390,75 500,70 L 500,100 Z" fill="#ffffff"/>
          </svg>
        </div>

        <!-- Thân trang Đăng nhập -->
        <div style="padding: 10px 24px 30px 24px; flex: 1; display: flex; flex-direction: column; position: relative; z-index: 3;">
          <!-- Cụm Logo (105px) + Chữ Đăng nhập sát rạt nhau trên 1 hàng và dịch nhiều hơn sang trái -->
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 0px; margin-top: -25px; margin-bottom: 8px; margin-left: -130px;">
            <img src="../image/logo.png" alt="Logo Nông Thương" style="height: 105px; width: auto; margin-right: -12px;">
            <h2 style="font-size: 34px; font-weight: 800; color: #769f2e; text-align: center; margin: 0;">Đăng nhập</h2>
          </div>
          <p style="font-size: 14px; color: #555555; text-align: center; margin-top: 0; margin-bottom: 24px;">Đăng nhập tài khoản để tiếp tục hành trình của bạn</p>

          <!-- Input Email hoặc Tên đăng nhập -->
          <div style="margin-bottom: 18px;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 8px;">Email hoặc tên đăng nhập (*):</label>
            <div style="position: relative;">
              <i class="fa-regular fa-user" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px;"></i>
              <input type="text" placeholder="Nhập email hoặc tên đăng nhập" style="width: 100%; height: 48px; border-radius: 14px; border: 1px solid #e2e8f0; padding-left: 48px; padding-right: 16px; font-size: 15px; font-weight: 600; color: #2d3748; outline: none; box-sizing: border-box;">
            </div>
          </div>

          <!-- Input Mật khẩu -->
          <div style="margin-bottom: 18px;">
            <label style="display: block; font-size: 14px; font-weight: 700; color: #587820; margin-bottom: 8px;">Mật khẩu:</label>
            <div style="position: relative;">
              <i class="fa-solid fa-lock" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px;"></i>
              <input type="password" placeholder="Nhập mật khẩu" style="width: 100%; height: 48px; border-radius: 14px; border: 1px solid #e2e8f0; padding-left: 48px; padding-right: 48px; font-size: 15px; font-weight: 600; color: #2d3748; outline: none; box-sizing: border-box;">
              <i class="fa-regular fa-eye" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px; cursor: pointer;"></i>
            </div>
          </div>

          <!-- Ghi nhớ & Quên mật khẩu -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
            <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #555555; cursor: pointer;">
              <input type="checkbox" style="width: 16px; height: 16px; accent-color: #769f2e; cursor: pointer;">
              Ghi nhớ đăng nhập
            </label>
            <a href="04-quen-mat-khau-email.html" style="font-size: 13px; font-weight: 700; color: #587820; text-decoration: none;">Quên mật khẩu?</a>
          </div>

          <!-- Nút Đăng nhập -->
          <a href="08-trang-chu-nong-dan.html" style="display: flex; align-items: center; justify-content: center; gap: 10px; background-color: #88ad37; color: #ffffff; font-size: 18px; font-weight: 800; height: 50px; border-radius: 25px; text-decoration: none; box-shadow: 0 4px 14px rgba(136,173,55,0.35); margin-bottom: 28px;">
            Đăng nhập <i class="fa-solid fa-arrow-right"></i>
          </a>

          <!-- Mạng xã hội -->
          <div style="text-align: center; position: relative; margin-bottom: 16px;">
            <div style="position: absolute; top: 50%; left: 0; right: 0; height: 1px; background-color: #e2e8f0; z-index: 1;"></div>
            <span style="position: relative; z-index: 2; background-color: #ffffff; padding: 0 12px; font-size: 13px; color: #888888;">hoặc tiếp tục bằng mạng xã hội</span>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 30px;">
            <button style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; height: 44px; font-size: 14px; font-weight: 600; color: #333333; cursor: pointer;"><i class="fa-brands fa-facebook" style="color: #1877f2; font-size: 18px;"></i> Facebook</button>
            <button style="display: flex; align-items: center; justify-content: center; gap: 8px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; height: 44px; font-size: 14px; font-weight: 600; color: #333333; cursor: pointer;"><i class="fa-brands fa-google" style="color: #ea4335; font-size: 18px;"></i> Google</button>
          </div>

          <!-- Bạn chưa có tài khoản? -->
          <div style="text-align: center; font-size: 14px; color: #555555; margin-top: auto;">
            Bạn chưa có tài khoản? <a href="02-dang-ky.html" style="color: #769f2e; font-weight: 700; text-decoration: none;">Đăng ký ngay</a>
          </div>
        </div>
      </div>
"""
with open(os.path.join(output_dir, "03-dang-nhap.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Đăng nhập", page_03))

# ----------------------------------------------------------------------
# 04. Forgot Password - Email Prompt
# ----------------------------------------------------------------------
page_04 = """
      <div style="padding: 24px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column;">
        <div style="margin-bottom: 40px;">
          <a href="03-dang-nhap.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i> Quay lại</a>
        </div>

        <div style="text-align: center; margin-bottom: 32px;">
          <h2 style="font-size: 28px; font-weight: 800; color: #587820; margin-bottom: 12px;">Quên mật khẩu</h2>
          <p style="font-size: 15px; color: #64748b; line-height: 1.5; padding: 0 10px;">
            Chúng tôi sẽ gửi mã xác thực OTP qua email khôi phục tài khoản của bạn.
          </p>
        </div>

        <div class="form-group" style="margin-bottom: 24px;">
          <label class="form-label" style="color: #475569; font-weight: 600;">Số điện thoại hoặc email khôi phục</label>
          <div style="position: relative;">
            <i class="fa-regular fa-envelope" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #769f2e; font-size: 18px;"></i>
            <input type="email" class="form-input" placeholder="Nhập số điện thoại hoặc email khôi phục" style="padding-left: 48px; border-color: #bcd886; height: 50px;">
          </div>
        </div>

        <a href="05-nhap-ma-otp.html" class="btn-primary" style="background-color: #8db837; height: 52px; font-size: 17px;">
          Gửi mã xác thực
        </a>
      </div>
"""
with open(os.path.join(output_dir, "04-quen-mat-khau-email.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Quên mật khẩu", page_04))

# ----------------------------------------------------------------------
# 05. Enter OTP Code
# ----------------------------------------------------------------------
page_05 = """
      <div style="padding: 24px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column;">
        <div style="margin-bottom: 40px;">
          <a href="04-quen-mat-khau-email.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i> Quay lại</a>
        </div>

        <div style="text-align: center; margin-bottom: 32px;">
          <h2 style="font-size: 28px; font-weight: 800; color: #587820; margin-bottom: 12px;">Quên mật khẩu</h2>
          <p style="font-size: 15px; color: #64748b; line-height: 1.5; padding: 0 10px;">
            Chúng tôi đã gửi mã xác thực OTP qua email khôi phục tài khoản của bạn.
          </p>
        </div>

        <div style="margin-bottom: 32px; text-align: center;">
          <label style="display: block; font-size: 15px; font-weight: 700; color: #475569; margin-bottom: 16px;">Nhập mã xác thực:</label>
          <div style="display: flex; justify-content: center; gap: 12px;">
            <input type="text" maxlength="1" placeholder="-" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #334155; border-radius: 12px; outline: none;">
            <input type="text" maxlength="1" placeholder="-" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #334155; border-radius: 12px; outline: none;">
            <input type="text" maxlength="1" placeholder="-" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #334155; border-radius: 12px; outline: none;">
            <input type="text" maxlength="1" placeholder="-" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #334155; border-radius: 12px; outline: none;">
          </div>
        </div>

        <a href="06-xac-nhan-otp.html" class="btn-primary" style="background-color: #8db837; height: 52px; font-size: 17px;">
          Xác nhận
        </a>
      </div>
"""
with open(os.path.join(output_dir, "05-nhap-ma-otp.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Nhập mã OTP", page_05))

# ----------------------------------------------------------------------
# 06. Confirm OTP State
# ----------------------------------------------------------------------
page_06 = """
      <div style="padding: 24px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column;">
        <div style="margin-bottom: 40px;">
          <a href="05-nhap-ma-otp.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i> Quay lại</a>
        </div>

        <div style="text-align: center; margin-bottom: 32px;">
          <h2 style="font-size: 28px; font-weight: 800; color: #587820; margin-bottom: 12px;">Quên mật khẩu</h2>
          <p style="font-size: 15px; color: #64748b; line-height: 1.5; padding: 0 10px;">
            Chúng tôi đã gửi mã xác thực OTP qua email khôi phục tài khoản của bạn.
          </p>
        </div>

        <div style="margin-bottom: 32px; text-align: center;">
          <label style="display: block; font-size: 15px; font-weight: 700; color: #475569; margin-bottom: 16px;">Nhập mã xác thực:</label>
          <div style="display: flex; justify-content: center; gap: 12px;">
            <input type="text" maxlength="1" placeholder="-" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #769f2e; background-color: #f4f8ec; border-radius: 12px; outline: none;">
            <input type="text" maxlength="1" placeholder="-" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #769f2e; background-color: #f4f8ec; border-radius: 12px; outline: none;">
            <input type="text" maxlength="1" placeholder="-" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #769f2e; background-color: #f4f8ec; border-radius: 12px; outline: none;">
            <input type="text" maxlength="1" placeholder="-" style="width: 54px; height: 58px; text-align: center; font-size: 24px; font-weight: 800; border: 2px solid #769f2e; background-color: #f4f8ec; border-radius: 12px; outline: none;">
          </div>
        </div>

        <a href="07-dat-lai-mat-khau-thanh-cong.html" class="btn-primary" style="background-color: #8db837; height: 52px; font-size: 17px;">
          Xác nhận
        </a>
      </div>
"""
with open(os.path.join(output_dir, "06-xac-nhan-otp.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Xác nhận OTP", page_06))

# ----------------------------------------------------------------------
# 07. Reset Password Success Modal
# ----------------------------------------------------------------------
page_07 = """
      <div style="padding: 24px; background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; position: relative; box-sizing: border-box;">
        <h2 style="font-size: 26px; font-weight: 800; color: #587820; text-align: center; margin-top: 40px; margin-bottom: 12px;">Đặt lại mật khẩu mới</h2>
        <p style="font-size: 14px; color: #64748b; text-align: center; line-height: 1.5; margin-bottom: 32px; padding: 0 10px;">
          Hãy nhập mật khẩu mới của bạn vào bên dưới và xem gợi ý khi thiết lập mật khẩu.
        </p>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 14px; font-weight: 700; color: #475569; margin-bottom: 8px;">Nhập mật khẩu mới</label>
          <div style="position: relative;">
            <input type="password" id="pass1_py" placeholder="Nhập mật khẩu mới" style="width: 100%; height: 48px; border-radius: 12px; border: 1px solid #cbd5e1; padding-left: 16px; padding-right: 48px; font-size: 15px; color: #1e293b; outline: none; box-sizing: border-box;">
            <i class="fa-regular fa-eye-slash" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 18px; cursor: pointer;"></i>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="display: block; font-size: 14px; font-weight: 700; color: #475569; margin-bottom: 8px;">Xác nhận lại mật khẩu</label>
          <div style="position: relative;">
            <input type="password" id="pass2_py" placeholder="Nhập lại mật khẩu mới" style="width: 100%; height: 48px; border-radius: 12px; border: 1px solid #cbd5e1; padding-left: 16px; padding-right: 48px; font-size: 15px; color: #1e293b; outline: none; box-sizing: border-box;">
            <i class="fa-regular fa-eye-slash" style="position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #64748b; font-size: 18px; cursor: pointer;"></i>
          </div>
        </div>

        <!-- Nút bấm Đổi mật khẩu kích hoạt Modal thông báo thành công -->
        <button onclick="document.getElementById('successModalPy').style.display='flex'" style="width: 100%; height: 50px; background-color: #88ad37; color: #ffffff; font-size: 17px; font-weight: 800; border-radius: 25px; border: none; cursor: pointer; margin-top: 16px; box-shadow: 0 4px 14px rgba(136,173,55,0.35);">Đổi mật khẩu</button>

        <!-- Overlay Popup Thông báo thành công (Hiển thị mờ đè nền khi bấm Đổi mật khẩu) -->
        <div id="successModalPy" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(30, 41, 59, 0.65); display: none; align-items: flex-end; justify-content: center; z-index: 999;">
          <div style="background-color: #ffffff; border-top-left-radius: 30px; border-top-right-radius: 30px; width: 100%; max-width: 450px; padding: 36px 24px 45px 24px; text-align: center; box-sizing: border-box;">
            <div style="width: 90px; height: 90px; background-color: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; box-shadow: 0 8px 20px rgba(34,197,94,0.3);">
              <i class="fa-solid fa-check" style="font-size: 44px; color: #ffffff;"></i>
            </div>
            <h3 style="font-size: 22px; font-weight: 800; color: #587820; margin-top: 0; margin-bottom: 8px;">Đặt lại mật khẩu thành công</h3>
            <p style="font-size: 14px; color: #64748b; margin-top: 0; margin-bottom: 28px;">Quay lại trang đăng nhập để đăng nhập lại</p>
            <a href="03-dang-nhap.html" style="display: flex; align-items: center; justify-content: center; background-color: #88ad37; color: #ffffff; font-size: 16px; font-weight: 700; height: 48px; border-radius: 12px; text-decoration: none; width: 80%; margin: 0 auto; box-shadow: 0 4px 12px rgba(136,173,55,0.3);">
              Trở về trang đăng nhập
            </a>
          </div>
        </div>
      </div>
"""
with open(os.path.join(output_dir, "07-dat-lai-mat-khau-thanh-cong.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Đặt lại mật khẩu thành công", page_07))

# ----------------------------------------------------------------------
# 08. Farmer Home Screen
# ----------------------------------------------------------------------
page_08 = """
      <div style="background-color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; padding-bottom: 90px; box-sizing: border-box;">
        <!-- Header Top -->
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 16px 20px 10px 20px;">
          <div style="display: flex; align-items: center; gap: 0px; margin-left: -12px;">
            <img src="../image/logo.png" alt="Logo" style="height: 72px; width: auto; margin-right: -8px;">
            <span style="font-size: 28px; font-weight: 800; color: #769f2e; letter-spacing: 0.5px;">NÔNG THƯƠNG</span>
          </div>
          <a href="10-thong-bao.html" style="width: 42px; height: 42px; background-color: #eaf4d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; text-decoration: none; font-size: 18px;">
            <i class="fa-regular fa-bell"></i>
          </a>
        </div>

        <!-- Thanh Tìm kiếm & Nút Lọc sliders -->
        <div style="display: flex; align-items: center; gap: 12px; padding: 0 20px; margin-bottom: 20px;">
          <div style="flex: 1; height: 46px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 25px; display: flex; align-items: center; padding: 0 16px; box-sizing: border-box;">
            <i class="fa-solid fa-magnifying-glass" style="color: #64748b; font-size: 18px;"></i>
            <input type="text" style="border: none; outline: none; background: transparent; width: 100%; font-size: 15px; color: #333333; margin-left: 10px;" placeholder="Tìm kiếm">
          </div>
          <div style="width: 42px; height: 42px; background-color: #eaf4d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; font-size: 18px;">
            <i class="fa-solid fa-sliders"></i>
          </div>
        </div>

        <!-- Banner Chào mừng Tràn Viền Màn Hình Edge-to-Edge -->
        <div style="margin: 0 0 24px 0; width: 100%; background: url('../image/home_banner.jpg') no-repeat center / cover; padding: 24px 20px 28px 20px; position: relative; overflow: hidden; box-sizing: border-box;">
          <!-- Ảnh nhân vật 1.5x xích xuống 1 xíu -->
          <img src="../image/nhanvat.png" alt="Nhân vật Nông Thương" style="position: absolute; right: -18px; top: 8px; height: 225px; width: auto; object-fit: contain; filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.32)); z-index: 2; pointer-events: none;">

          <!-- Cụm chữ chào mừng dịch xích sang bên phải -->
          <div style="position: relative; z-index: 3; max-width: 65%; margin-left: 20px;">
            <div style="font-size: 24px; font-weight: 800; color: #1e5234; margin-bottom: 8px;">Chào mừng bạn !</div>
            <div style="display: inline-block; background-color: #0d6847; color: #ffffff; font-size: 16px; font-weight: 700; padding: 6px 28px; border-radius: 4px; margin-bottom: 10px; clip-path: polygon(0 0, 100% 0, 92% 100%, 8% 100%);">Tiến Thành</div>
            <div style="font-size: 16px; font-weight: 700; color: #92401d; margin-bottom: 14px;">Một ngày vui vẻ nhé</div>
          </div>

          <!-- Nút BÁN SẢN PHẨM NGAY: Rộng hơn, Căn giữa, Có Drop Shadow & Hover -->
          <div style="display: flex; justify-content: center; width: 100%; margin-top: 16px; position: relative; z-index: 4;">
            <a href="15-dang-san-pham-nhap-lieu.html" class="btn-sell-now">
              BÁN SẢN PHẨM NGAY
            </a>
          </div>
        </div>

        <!-- Mục Loại trái cây (1.25x Scroll Ngang) -->
        <!-- Mục Loại trái cây (1.25x Scroll Ngang & Interactive Filter) -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px; margin-bottom: 12px;">
          <span style="font-size: 18px; font-weight: 800; color: #2d4612;">Loại trái cây</span>
          <a href="#" data-category="all" style="font-size: 14px; font-weight: 700; color: #444444; text-decoration: underline;">Xem tất cả</a>
        </div>
        <div class="categories-horizontal-scroll">
          <div class="category-pill-card active" data-category="all">
            <span class="category-pill-name" style="font-size: 15px;">🌟 Tất cả</span>
          </div>
          <div class="category-pill-card" data-category="xoai">
            <img src="../image/Trái cây/xoai.jpg" alt="Xoài" class="category-pill-img">
            <span class="category-pill-name">Xoài</span>
          </div>
          <div class="category-pill-card" data-category="chom-chom">
            <img src="../image/Trái cây/chom chom ban.jpg" alt="Chôm chôm" class="category-pill-img">
            <span class="category-pill-name">Chôm chôm</span>
          </div>
          <div class="category-pill-card" data-category="oi">
            <img src="../image/Trái cây/oi.jpg" alt="Ổi" class="category-pill-img">
            <span class="category-pill-name">Ổi</span>
          </div>
          <div class="category-pill-card" data-category="dua-hau">
            <img src="../image/Trái cây/dua hau.jpg" alt="Dưa hấu" class="category-pill-img">
            <span class="category-pill-name">Dưa hấu</span>
          </div>
          <div class="category-pill-card" data-category="sau-rieng">
            <img src="../image/Trái cây/sau rieng.jpg" alt="Sầu riêng" class="category-pill-img">
            <span class="category-pill-name">Sầu riêng</span>
          </div>
          <div class="category-pill-card" data-category="vai">
            <img src="../image/Trái cây/vai.jpg" alt="Vải" class="category-pill-img">
            <span class="category-pill-name">Vải</span>
          </div>
          <div class="category-pill-card" data-category="thanh-long">
            <img src="../image/Trái cây/thanh long.jpg" alt="Thanh long" class="category-pill-img">
            <span class="category-pill-name">Thanh long</span>
          </div>
        </div>

        <!-- Mục Danh mục sản phẩm -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 20px; margin-bottom: 12px;">
          <span style="font-size: 17px; font-weight: 800; color: #333333;">Danh mục sản phẩm</span>
          <a href="#" data-category="all" style="font-size: 14px; font-weight: 700; color: #444444; text-decoration: underline;">Xem tất cả</a>
        </div>

        <!-- Grid Sản phẩm -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 0 20px;">
          <a href="24-chi-tiet-san-pham.html?id=vai" class="product-card-item" data-category="vai" style="background-color: #eaf4db; border-radius: 20px; padding: 14px 12px; text-align: center; position: relative; text-decoration: none; box-shadow: 0 6px 16px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center;">
            <div style="position: absolute; top: 10px; right: 10px; width: 26px; height: 26px; background: #ffffff; border: 1px solid #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dc2626; font-size: 13px;"><i class="fa-regular fa-heart"></i></div>
            <img src="../image/Trái cây/vai.jpg" alt="Vải" style="width: 95px; height: 95px; border-radius: 50%; object-fit: cover; margin-top: 6px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="font-size: 15px; font-weight: 700; color: #333333; margin-bottom: 4px;">Vải thiều</div>
            <div style="font-size: 12px; color: #444444; margin-bottom: 4px;"><span style="color: #f59e0b;">★</span> 4.5 <span style="color: #666;">(672)</span></div>
            <div style="font-size: 14px; font-weight: 800; color: #1c522a;">27.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=thanh-long" class="product-card-item" data-category="thanh-long" style="background-color: #eaf4db; border-radius: 20px; padding: 14px 12px; text-align: center; position: relative; text-decoration: none; box-shadow: 0 6px 16px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center;">
            <div style="position: absolute; top: 10px; right: 10px; width: 26px; height: 26px; background: #ffffff; border: 1px solid #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dc2626; font-size: 13px;"><i class="fa-regular fa-heart"></i></div>
            <img src="../image/Trái cây/thanh long.jpg" alt="Thanh long" style="width: 95px; height: 95px; border-radius: 50%; object-fit: cover; margin-top: 6px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="font-size: 15px; font-weight: 700; color: #333333; margin-bottom: 4px;">Thanh long</div>
            <div style="font-size: 12px; color: #444444; margin-bottom: 4px;"><span style="color: #f59e0b;">★</span> 4.8 <span style="color: #666;">(62)</span></div>
            <div style="font-size: 14px; font-weight: 800; color: #1c522a;">20.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=dua-hau" class="product-card-item" data-category="dua-hau" style="background-color: #eaf4db; border-radius: 20px; padding: 14px 12px; text-align: center; position: relative; text-decoration: none; box-shadow: 0 6px 16px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center;">
            <div style="position: absolute; top: 10px; right: 10px; width: 26px; height: 26px; background: #ffffff; border: 1px solid #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dc2626; font-size: 13px;"><i class="fa-regular fa-heart"></i></div>
            <img src="../image/Trái cây/dua hau.jpg" alt="Dưa hấu" style="width: 95px; height: 95px; border-radius: 50%; object-fit: cover; margin-top: 6px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="font-size: 15px; font-weight: 700; color: #333333; margin-bottom: 4px;">Dưa hấu</div>
            <div style="font-size: 12px; color: #444444; margin-bottom: 4px;"><span style="color: #f59e0b;">★</span> 5 <span style="color: #666;">(81)</span></div>
            <div style="font-size: 14px; font-weight: 800; color: #1c522a;">20.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=sau-rieng" class="product-card-item" data-category="sau-rieng" style="background-color: #eaf4db; border-radius: 20px; padding: 14px 12px; text-align: center; position: relative; text-decoration: none; box-shadow: 0 6px 16px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center;">
            <div style="position: absolute; top: 10px; right: 10px; width: 26px; height: 26px; background: #ffffff; border: 1px solid #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dc2626; font-size: 13px;"><i class="fa-regular fa-heart"></i></div>
            <img src="../image/Trái cây/sau rieng.jpg" alt="Sầu riêng" style="width: 95px; height: 95px; border-radius: 50%; object-fit: cover; margin-top: 6px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="font-size: 15px; font-weight: 700; color: #333333; margin-bottom: 4px;">Sầu riêng Ri6</div>
            <div style="font-size: 12px; color: #444444; margin-bottom: 4px;"><span style="color: #f59e0b;">★</span> 4.5 <span style="color: #666;">(92)</span></div>
            <div style="font-size: 14px; font-weight: 800; color: #1c522a;">35.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=oi" class="product-card-item" data-category="oi" style="background-color: #eaf4db; border-radius: 20px; padding: 14px 12px; text-align: center; position: relative; text-decoration: none; box-shadow: 0 6px 16px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center;">
            <div style="position: absolute; top: 10px; right: 10px; width: 26px; height: 26px; background: #ffffff; border: 1px solid #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dc2626; font-size: 13px;"><i class="fa-regular fa-heart"></i></div>
            <img src="../image/Trái cây/oi.jpg" alt="Ổi" style="width: 95px; height: 95px; border-radius: 50%; object-fit: cover; margin-top: 6px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="font-size: 15px; font-weight: 700; color: #333333; margin-bottom: 4px;">Ổi vú sữa</div>
            <div style="font-size: 12px; color: #444444; margin-bottom: 4px;"><span style="color: #f59e0b;">★</span> 4.7 <span style="color: #666;">(120)</span></div>
            <div style="font-size: 14px; font-weight: 800; color: #1c522a;">25.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=xoai" class="product-card-item" data-category="xoai" style="background-color: #eaf4db; border-radius: 20px; padding: 14px 12px; text-align: center; position: relative; text-decoration: none; box-shadow: 0 6px 16px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center;">
            <div style="position: absolute; top: 10px; right: 10px; width: 26px; height: 26px; background: #ffffff; border: 1px solid #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dc2626; font-size: 13px;"><i class="fa-regular fa-heart"></i></div>
            <img src="../image/Trái cây/xoai.jpg" alt="Xoài" style="width: 95px; height: 95px; border-radius: 50%; object-fit: cover; margin-top: 6px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="font-size: 15px; font-weight: 700; color: #333333; margin-bottom: 4px;">Xoài Cát</div>
            <div style="font-size: 12px; color: #444444; margin-bottom: 4px;"><span style="color: #f59e0b;">★</span> 4.6 <span style="color: #666;">(210)</span></div>
            <div style="font-size: 14px; font-weight: 800; color: #1c522a;">30.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=chom-chom" class="product-card-item" data-category="chom-chom" style="background-color: #eaf4db; border-radius: 20px; padding: 14px 12px; text-align: center; position: relative; text-decoration: none; box-shadow: 0 6px 16px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center;">
            <div style="position: absolute; top: 10px; right: 10px; width: 26px; height: 26px; background: #ffffff; border: 1px solid #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #dc2626; font-size: 13px;"><i class="fa-regular fa-heart"></i></div>
            <img src="../image/Trái cây/chom chom ban.jpg" alt="Chôm chôm" style="width: 95px; height: 95px; border-radius: 50%; object-fit: cover; margin-top: 6px; margin-bottom: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
            <div style="font-size: 15px; font-weight: 700; color: #333333; margin-bottom: 4px;">Chôm chôm Thái</div>
            <div style="font-size: 12px; color: #444444; margin-bottom: 4px;"><span style="color: #f59e0b;">★</span> 4.9 <span style="color: #666;">(180)</span></div>
            <div style="font-size: 14px; font-weight: 800; color: #1c522a;">34.000 VNĐ/kg</div>
          </a>
        </div>
      </div>
      <script src="../js/products.js"></script>
      <script>document.addEventListener('DOMContentLoaded', initCategoryFilter);</script>

      </div>

      </div>
""" + get_bottom_nav("home")
with open(os.path.join(output_dir, "08-trang-chu-nong-dan.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Trang chủ nông dân", page_08))

# ----------------------------------------------------------------------
# 09. Buyer Home Screen
# ----------------------------------------------------------------------
page_09 = """
      <div class="app-header" style="justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="../image/logo.png" style="height: 32px; width: auto;">
          <span style="font-size: 20px; font-weight: 800; color: #587820;">NÔNG THƯƠNG</span>
        </div>
        <div style="display: flex; gap: 10px;">
          <a href="10-thong-bao.html" style="width: 38px; height: 38px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820; text-decoration: none;">
            <i class="fa-regular fa-bell" style="font-size: 18px;"></i>
          </a>
          <div style="width: 38px; height: 38px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #587820;">
            <i class="fa-solid fa-sliders" style="font-size: 18px;"></i>
          </div>
        </div>
      </div>

      <div style="padding: 0 16px 20px 16px; flex: 1;">
        <div class="search-box">
          <i class="fa-solid fa-magnifying-glass" style="color: #94a3b8; font-size: 18px;"></i>
          <input type="text" placeholder="Tìm kiếm">
        </div>

        <div class="welcome-banner" style="display: flex; justify-content: space-between; align-items: flex-end; padding-right: 10px;">
          <div>
            <div style="font-size: 18px; color: #2d4612; font-weight: 700;">Chào mừng bạn !</div>
            <div class="tag" style="background-color: #0d9488;">thuyanh</div>
            <div style="font-size: 14px; color: #475569; font-weight: 600;">Một ngày vui vẻ nhé</div>
          </div>
          <img src="../image/Thiết kế chưa có tên-Recovered.png" style="height: 120px; width: auto; object-fit: contain; margin-bottom: -10px;">
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 18px; font-weight: 800; color: #2d4612;">Loại trái cây</h3>
          <a href="#" data-category="all" style="font-size: 14px; font-weight: 700; color: #64748b;">Xem tất cả</a>
        </div>
        <div class="categories-horizontal-scroll" style="padding-left: 0; padding-right: 0;">
          <div class="category-pill-card active" data-category="all">
            <span class="category-pill-name" style="font-size: 15px;">🌟 Tất cả</span>
          </div>
          <div class="category-pill-card" data-category="xoai">
            <img src="../image/Trái cây/xoai.jpg" alt="Xoài" class="category-pill-img">
            <span class="category-pill-name">Xoài</span>
          </div>
          <div class="category-pill-card" data-category="chom-chom">
            <img src="../image/Trái cây/chom chom ban.jpg" alt="Chôm chôm" class="category-pill-img">
            <span class="category-pill-name">Chôm chôm</span>
          </div>
          <div class="category-pill-card" data-category="oi">
            <img src="../image/Trái cây/oi.jpg" alt="Ổi" class="category-pill-img">
            <span class="category-pill-name">Ổi</span>
          </div>
          <div class="category-pill-card" data-category="dua-hau">
            <img src="../image/Trái cây/dua hau.jpg" alt="Dưa hấu" class="category-pill-img">
            <span class="category-pill-name">Dưa hấu</span>
          </div>
          <div class="category-pill-card" data-category="sau-rieng">
            <img src="../image/Trái cây/sau rieng.jpg" alt="Sầu riêng" class="category-pill-img">
            <span class="category-pill-name">Sầu riêng</span>
          </div>
          <div class="category-pill-card" data-category="vai">
            <img src="../image/Trái cây/vai.jpg" alt="Vải" class="category-pill-img">
            <span class="category-pill-name">Vải</span>
          </div>
          <div class="category-pill-card" data-category="thanh-long">
            <img src="../image/Trái cây/thanh long.jpg" alt="Thanh long" class="category-pill-img">
            <span class="category-pill-name">Thanh long</span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 16px; font-weight: 800; color: #2d4612;">Danh mục sản phẩm</h3>
          <a href="#" data-category="all" style="font-size: 13px; font-weight: 700; color: #64748b;">Xem tất cả</a>
        </div>

        <div class="product-grid">
          <a href="24-chi-tiet-san-pham.html?id=vai" class="product-card" data-category="vai">
            <i class="fa-regular fa-heart" style="position: absolute; top: 10px; right: 10px; color: #ef4444; font-size: 16px;"></i>
            <img src="../image/Trái cây/vai.jpg" alt="Vải">
            <div class="name">Vải</div>
            <div style="font-size: 12px; color: #f59e0b; margin: 2px 0;"><i class="fa-solid fa-star"></i> 4.5 (672)</div>
            <div class="price">27.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=thanh-long" class="product-card" data-category="thanh-long">
            <i class="fa-regular fa-heart" style="position: absolute; top: 10px; right: 10px; color: #ef4444; font-size: 16px;"></i>
            <img src="../image/Trái cây/thanh long.jpg" alt="Thanh long">
            <div class="name">Thanh long</div>
            <div style="font-size: 12px; color: #f59e0b; margin: 2px 0;"><i class="fa-solid fa-star"></i> 4.8 (62)</div>
            <div class="price">20.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=dua-hau" class="product-card" data-category="dua-hau">
            <i class="fa-regular fa-heart" style="position: absolute; top: 10px; right: 10px; color: #ef4444; font-size: 16px;"></i>
            <img src="../image/Trái cây/dua hau.jpg" alt="Dưa hấu">
            <div class="name">Dưa hấu</div>
            <div style="font-size: 12px; color: #f59e0b; margin: 2px 0;"><i class="fa-solid fa-star"></i> 5 (81)</div>
            <div class="price">20.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=sau-rieng" class="product-card" data-category="sau-rieng">
            <i class="fa-regular fa-heart" style="position: absolute; top: 10px; right: 10px; color: #ef4444; font-size: 16px;"></i>
            <img src="../image/Trái cây/sau rieng.jpg" alt="Sầu riêng">
            <div class="name">Sầu riêng</div>
            <div style="font-size: 12px; color: #f59e0b; margin: 2px 0;"><i class="fa-solid fa-star"></i> 4.5 (92)</div>
            <div class="price">35.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=oi" class="product-card" data-category="oi">
            <i class="fa-regular fa-heart" style="position: absolute; top: 10px; right: 10px; color: #ef4444; font-size: 16px;"></i>
            <img src="../image/Trái cây/oi.jpg" alt="Ổi">
            <div class="name">Ổi vú sữa</div>
            <div style="font-size: 12px; color: #f59e0b; margin: 2px 0;"><i class="fa-solid fa-star"></i> 4.7 (120)</div>
            <div class="price">25.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=xoai" class="product-card" data-category="xoai">
            <i class="fa-regular fa-heart" style="position: absolute; top: 10px; right: 10px; color: #ef4444; font-size: 16px;"></i>
            <img src="../image/Trái cây/xoai.jpg" alt="Xoài">
            <div class="name">Xoài Cát</div>
            <div style="font-size: 12px; color: #f59e0b; margin: 2px 0;"><i class="fa-solid fa-star"></i> 4.6 (210)</div>
            <div class="price">30.000 VNĐ/kg</div>
          </a>

          <a href="24-chi-tiet-san-pham.html?id=chom-chom" class="product-card" data-category="chom-chom">
            <i class="fa-regular fa-heart" style="position: absolute; top: 10px; right: 10px; color: #ef4444; font-size: 16px;"></i>
            <img src="../image/Trái cây/chom chom ban.jpg" alt="Chôm chôm">
            <div class="name">Chôm chôm</div>
            <div style="font-size: 12px; color: #f59e0b; margin: 2px 0;"><i class="fa-solid fa-star"></i> 4.9 (180)</div>
            <div class="price">34.000 VNĐ/kg</div>
          </a>
        </div>
      </div>
      <script src="../js/products.js"></script>
      <script>document.addEventListener('DOMContentLoaded', initCategoryFilter);</script>
      </div>
""" + get_bottom_nav("home")
with open(os.path.join(output_dir, "09-trang-chu-nguoi-mua.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Trang chủ người mua", page_09))

# ----------------------------------------------------------------------
# 10. Notifications Screen
# ----------------------------------------------------------------------
page_10 = """
      <div class="app-header">
        <a href="08-trang-chu-nong-dan.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        <h2 class="header-title" style="font-size: 22px; font-weight: 800;">Thông báo</h2>
      </div>

      <div style="padding: 16px; flex: 1;">
        <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Hôm nay</div>

        <div class="card" style="display: flex; gap: 14px; align-items: flex-start; border-radius: 18px; margin-bottom: 12px;">
          <div style="width: 42px; height: 42px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #769f2e; flex-shrink: 0;">
            <i class="fa-solid fa-bell" style="font-size: 20px;"></i>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <div style="font-weight: 800; font-size: 15px;">voucher mua mít</div>
              <span style="font-size: 12px; color: #94a3b8;">9 phút trước</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">voucher mua mít siu ưu đãi 20%</div>
          </div>
          <span style="width: 20px; height: 20px; background: #769f2e; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">2</span>
        </div>

        <div class="card green-tint" style="display: flex; gap: 14px; align-items: flex-start; border-radius: 18px; margin-bottom: 12px;">
          <div style="width: 42px; height: 42px; background: #fee2e2; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ef4444; flex-shrink: 0;">
            <i class="fa-solid fa-bell-concierge" style="font-size: 20px;"></i>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <div style="font-weight: 800; font-size: 15px;">vourcher mua chuỗi sắp hết hạn</div>
              <span style="font-size: 12px; color: #94a3b8;">9 phút trước</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">vocher mua chúi 20% sắp hết hạn, đừng bỏ lỡ nhé</div>
          </div>
          <span style="width: 20px; height: 20px; background: #769f2e; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">2</span>
        </div>

        <a href="26-theo-doi-don-hang.html" class="card" style="display: flex; gap: 14px; align-items: flex-start; border-radius: 18px; margin-bottom: 16px; text-decoration: none; color: inherit;">
          <div style="width: 42px; height: 42px; background: #fce7f3; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ec4899; flex-shrink: 0;">
            <i class="fa-solid fa-box" style="font-size: 20px;"></i>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <div style="font-weight: 800; font-size: 15px;">Đơn hàng đang vận chuyển</div>
              <span style="font-size: 12px; color: #94a3b8;">9 phút trước</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">đơn hàng sầu riêng đang được vận chuyển, ráng chờ xíu nhé</div>
          </div>
          <span style="width: 20px; height: 20px; background: #769f2e; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">2</span>
        </a>

        <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 12px;">Hôm qua</div>

        <div class="card" style="display: flex; gap: 14px; align-items: flex-start; border-radius: 18px; margin-bottom: 12px;">
          <div style="width: 42px; height: 42px; background: #e0f2fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #0284c7; flex-shrink: 0;">
            <i class="fa-solid fa-cube" style="font-size: 20px;"></i>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <div style="font-weight: 800; font-size: 15px;">Đơn hàng giao thành công</div>
              <span style="font-size: 12px; color: #94a3b8;">12:53 sáng</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">Hãy để lại đánh nhé</div>
          </div>
          <span style="width: 20px; height: 20px; background: #769f2e; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">2</span>
        </div>
      </div>
""" + get_bottom_nav("notifications")
with open(os.path.join(output_dir, "10-thong-bao.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Thông báo", page_10))

# ----------------------------------------------------------------------
# 11. Detailed Notifications View
# ----------------------------------------------------------------------
page_11 = page_10
with open(os.path.join(output_dir, "11-thong-bao-chi-tiet.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Thông báo chi tiết", page_11))

# ----------------------------------------------------------------------
# 12. Add Product via Voice Input
# ----------------------------------------------------------------------
page_12 = """
      <div class="app-header">
        <a href="08-trang-chu-nong-dan.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        <div>
          <h2 style="font-size: 16px; font-weight: 800; color: #587820;">Thu thập thông tin</h2>
          <div style="font-size: 12px; color: #64748b;">Hãy cung cấp thông tin về sản phẩm của bạn</div>
        </div>
      </div>

      <div style="padding: 16px; flex: 1;">
        <div style="border: 2px dashed #f59e0b; background-color: #fffbeb; border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 16px;">
          <i class="fa-solid fa-camera" style="font-size: 40px; color: #334155; margin-bottom: 12px;"></i>
          <div style="font-size: 14px; font-weight: 700; color: #78350f;">Chụp ảnh hoặc tải hình ảnh lên</div>
          <div style="font-size: 12px; color: #92400e; margin-top: 4px;">Hình ảnh sẽ hiện lên tại đây</div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <button class="btn-secondary" style="border: 1px dashed #769f2e; background: #f4f8ec; font-size: 14px;"><i class="fa-solid fa-camera"></i> Chụp ảnh</button>
          <button class="btn-secondary" style="border: 1px dashed #769f2e; background: #f4f8ec; font-size: 14px;"><i class="fa-solid fa-image"></i> Tải ảnh từ thư viện</button>
        </div>

        <div style="font-size: 14px; font-weight: 800; color: #587820; margin-bottom: 4px;">Mô tả chi tiết sản phẩm</div>
        <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Hãy chọn hình thức để mô tả về sản phẩm của bạn</div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; border-radius: 10px; overflow: hidden; margin-bottom: 24px;">
          <div style="background-color: #92400e; color: #ffffff; text-align: center; padding: 12px; font-weight: 700; font-size: 14px;">Giọng nói</div>
          <a href="15-dang-san-pham-nhap-lieu.html" style="background-color: #fef08a; color: #854d0e; text-align: center; padding: 12px; font-weight: 700; font-size: 14px; text-decoration: none;">Nhập chữ</a>
        </div>

        <div style="text-align: center; margin-bottom: 20px;">
          <div style="width: 110px; height: 110px; background: #4d7c0f; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 10px 25px rgba(77,124,15,0.3);">
            <i class="fa-solid fa-microphone" style="font-size: 50px; color: #ffffff;"></i>
          </div>
          <div style="font-size: 16px; font-weight: 800; color: #1e293b;">Đang thu giọng nói...</div>
          <div style="background: #f1f5f9; padding: 10px 16px; border-radius: 12px; margin-top: 10px; font-size: 14px; color: #475569; font-style: italic;">
            "Tôi muốn bán chôm chôm, 50 kg,"
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <div style="font-size: 13px; font-weight: 700; color: #334155; margin-bottom: 10px;">Bạn có thể trả lời những câu hỏi như sau:</div>
          <div style="background: #fef08a; padding: 10px 14px; border-radius: 12px; margin-bottom: 8px; font-size: 13px; font-weight: 700;">Loại trái cây: <span style="font-weight: 400;">Bán trái cây gì?</span></div>
          <div style="background: #fef08a; padding: 10px 14px; border-radius: 12px; margin-bottom: 8px; font-size: 13px; font-weight: 700;">Sản lượng: <span style="font-weight: 400;">Cần bán bao nhiêu kg hoặc tấn?</span></div>
          <div style="background: #fef08a; padding: 10px 14px; border-radius: 12px; margin-bottom: 8px; font-size: 13px; font-weight: 700;">Thời gian: <span style="font-weight: 400;">Khi nào thu hoạch hoặc cần bán xong trước ngày nào?</span></div>
        </div>

        <a href="17-dinh-gia-ai.html" class="btn-primary" style="background-color: #8db837; margin-bottom: 20px;">
          Tiếp theo
        </a>
      </div>
""" + get_bottom_nav("home")
with open(os.path.join(output_dir, "12-dang-san-pham-giong-noi.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Đăng sản phẩm giọng nói", page_12))

# ----------------------------------------------------------------------
# 13. User Profile / Account Center
# ----------------------------------------------------------------------
page_13 = """
      <div style="padding: 24px 20px 20px 20px; flex: 1;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e2e8f0;">
          <div>
            <h2 style="font-size: 24px; font-weight: 800; color: #1e293b;">Tiến Thành</h2>
          </div>
          <div style="width: 54px; height: 54px; background: #769f2e; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff;">
            <i class="fa-solid fa-user" style="font-size: 28px;"></i>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 16px; font-weight: 700; color: #1e293b;"><i class="fa-regular fa-rectangle-list" style="margin-right: 8px;"></i> Quản lý đơn hàng</span>
          <i class="fa-solid fa-chevron-right" style="color: #94a3b8;"></i>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 30px;">
          <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
            <i class="fa-solid fa-bag-shopping" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
            <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Xác nhận đơn hàng</div>
          </div>
          <a href="26-theo-doi-don-hang.html" style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center; text-decoration: none;">
            <i class="fa-solid fa-truck" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
            <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Theo dõi đơn hàng</div>
          </a>
          <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
            <i class="fa-solid fa-ticket" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
            <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Khuyến mãi của tôi</div>
          </div>
          <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
            <i class="fa-solid fa-rotate-left" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
            <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Trả hàng</div>
          </div>
          <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
            <i class="fa-solid fa-circle-check" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
            <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Đơn đã hoàn thành</div>
          </div>
          <div style="border: 1.5px solid #769f2e; border-radius: 16px; padding: 14px 8px; text-align: center;">
            <i class="fa-solid fa-circle-xmark" style="font-size: 24px; color: #769f2e; margin-bottom: 8px;"></i>
            <div style="font-size: 12px; font-weight: 700; color: #1e293b; line-height: 1.3;">Đơn đã hủy</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: #334155; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <i class="fa-regular fa-id-card" style="font-size: 20px; color: #769f2e;"></i>
              <span>Thông tin cá nhân</span>
            </div>
            <i class="fa-solid fa-chevron-right" style="color: #94a3b8;"></i>
          </div>

          <a href="19-tro-chuyen-nhan-vien.html" style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: #334155; text-decoration: none;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <i class="fa-regular fa-handshake" style="font-size: 20px; color: #769f2e;"></i>
              <span>Hỗ trợ</span>
            </div>
            <i class="fa-solid fa-chevron-right" style="color: #94a3b8;"></i>
          </a>

          <a href="16-xac-nhan-xoa-tai-khoan.html" style="display: flex; align-items: center; gap: 12px; font-weight: 700; color: #dc2626; text-decoration: none;">
            <i class="fa-regular fa-trash-can" style="font-size: 20px;"></i>
            <span>Yêu cầu xóa tài khoản</span>
          </a>

          <a href="03-dang-nhap.html" style="display: flex; align-items: center; gap: 12px; font-weight: 700; color: #769f2e; text-decoration: none;">
            <i class="fa-solid fa-arrow-right-from-bracket" style="font-size: 20px;"></i>
            <span>Đăng xuất</span>
          </a>
        </div>
      </div>
""" + get_bottom_nav("profile")
with open(os.path.join(output_dir, "13-ca-nhan.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Trang cá nhân", page_13))

# ----------------------------------------------------------------------
# 14. Chat Conversations List
# ----------------------------------------------------------------------
page_14 = """
      <div class="app-header green" style="justify-content: space-between;">
        <h2 class="header-title" style="font-size: 20px; font-weight: 800;">Trò chuyện</h2>
        <div style="display: flex; gap: 16px; align-items: center;">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 18px;"></i>
          <i class="fa-solid fa-ellipsis-vertical" style="font-size: 18px;"></i>
        </div>
      </div>

      <!-- Top horizontal active story avatars -->
      <div style="background-color: #f4f8ec; padding: 14px 12px; display: flex; gap: 16px; overflow-x: auto; flex-shrink: 0; border-bottom: 1px solid #e2e8f0;">
        <a href="18-tro-chuyen-ai-agriagent.html" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 54px; height: 54px; margin: 0 auto 4px; border: 2px solid #769f2e; border-radius: 50%; padding: 2px; background: #fff;">
            <img src="../image/logo.png" style="width: 100%; height: 100%; border-radius: 50%; object-fit: contain;">
            <span style="position: absolute; bottom: 0; right: 0; width: 14px; height: 14px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #1e293b;">Agri AI</div>
        </a>

        <a href="28-tro-chuyen-ca-nhan.html?user=khang-xoai" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 54px; height: 54px; margin: 0 auto 4px; border: 2px solid #769f2e; border-radius: 50%; padding: 2px; background: #fff;">
            <img src="../image/Trái cây/chom chom ban.jpg" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 0; right: 0; width: 14px; height: 14px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #1e293b;">Khang Xoài</div>
        </a>

        <a href="28-tro-chuyen-ca-nhan.html?user=duong-mit" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 54px; height: 54px; margin: 0 auto 4px; border: 2px solid #769f2e; border-radius: 50%; padding: 2px; background: #fff;">
            <img src="../image/Trái cây/xoai.jpg" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 0; right: 0; width: 14px; height: 14px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #1e293b;">Dương Mít</div>
        </a>

        <a href="28-tro-chuyen-ca-nhan.html?user=truong-giang" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 54px; height: 54px; margin: 0 auto 4px; border: 2px solid #769f2e; border-radius: 50%; padding: 2px; background: #fff;">
            <img src="../image/Trái cây/oi.jpg" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 0; right: 0; width: 14px; height: 14px; background: #cbd5e1; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #1e293b;">Trường Giang</div>
        </a>

        <a href="28-tro-chuyen-ca-nhan.html?user=thanh" style="text-align: center; flex-shrink: 0; text-decoration: none;">
          <div style="position: relative; width: 54px; height: 54px; margin: 0 auto 4px; border: 2px solid #769f2e; border-radius: 50%; padding: 2px; background: #fff;">
            <img src="../image/Trái cây/sau rieng.jpg" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 0; right: 0; width: 14px; height: 14px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="font-size: 11px; font-weight: 700; color: #1e293b;">Thanh</div>
        </a>
      </div>

      <!-- Main Chat Conversations List -->
      <div style="padding: 8px 16px; flex: 1; background: #ffffff;">
        <a href="18-tro-chuyen-ai-agriagent.html" style="display: flex; gap: 14px; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-decoration: none; color: inherit;">
          <div style="position: relative;">
            <img src="../image/logo.png" style="width: 52px; height: 52px; border-radius: 50%; object-fit: contain; background: #fef08a; padding: 4px;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <div style="font-weight: 800; font-size: 15px; color: #1e293b;">AgriAgent AI</div>
              <span style="font-size: 11px; color: #769f2e; font-weight: 700;">Trợ lý AI</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">Chào bạn, mình là AgriAgent AI! Bạn có thắc mắc...</div>
          </div>
        </a>

        <a href="19-tro-chuyen-nhan-vien.html" style="display: flex; gap: 14px; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-decoration: none; color: inherit;">
          <div style="position: relative;">
            <img src="../image/logo.png" style="width: 52px; height: 52px; border-radius: 50%; object-fit: contain; background: #fef08a; padding: 4px;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <div style="font-weight: 800; font-size: 15px; color: #1e293b;">Nhân viên hỗ trợ</div>
              <span style="font-size: 11px; color: #94a3b8;">Vừa xong</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">Chào bạn, Trung tâm hỗ trợ AgriAgent AI xin nghe! ❤️</div>
          </div>
        </a>

        <a href="28-tro-chuyen-ca-nhan.html?user=khang-xoai" style="display: flex; gap: 14px; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-decoration: none; color: inherit;">
          <div style="position: relative;">
            <img src="../image/Trái cây/chom chom ban.jpg" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <div style="font-weight: 800; font-size: 15px; color: #1e293b;">Khang Xoài</div>
              <span style="font-size: 11px; color: #94a3b8;">9:41 AM</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">Dạ 30.000đ/kg thôi anh, ghép chuyến giao tận nơi...</div>
          </div>
        </a>

        <a href="28-tro-chuyen-ca-nhan.html?user=duong-mit" style="display: flex; gap: 14px; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-decoration: none; color: inherit;">
          <div style="position: relative;">
            <img src="../image/Trái cây/xoai.jpg" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <div style="font-weight: 800; font-size: 15px; color: #1e293b;">Dương Mít</div>
              <span style="font-size: 11px; color: #94a3b8;">8:22 AM</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">Dạ cũng đang vào lứa thu hoạch ngon lắm chú ạ.</div>
          </div>
        </a>

        <a href="28-tro-chuyen-ca-nhan.html?user=truong-giang" style="display: flex; gap: 14px; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-decoration: none; color: inherit;">
          <div style="position: relative;">
            <img src="../image/Trái cây/oi.jpg" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover;">
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <div style="font-weight: 800; font-size: 15px; color: #1e293b;">Trường Giang</div>
              <span style="font-size: 11px; color: #94a3b8;">9:26 AM</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">Dạ xe bên em có bạt che kín nên nông sản an toàn...</div>
          </div>
        </a>

        <a href="28-tro-chuyen-ca-nhan.html?user=thanh" style="display: flex; gap: 14px; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9; text-decoration: none; color: inherit;">
          <div style="position: relative;">
            <img src="../image/Trái cây/sau rieng.jpg" style="width: 52px; height: 52px; border-radius: 50%; object-fit: cover;">
            <span style="position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; background: #22c55e; border: 2px solid #fff; border-radius: 50%;"></span>
          </div>
          <div style="flex: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <div style="font-weight: 800; font-size: 15px; color: #1e293b;">Thanh</div>
              <span style="font-size: 11px; color: #94a3b8;">Thứ 6</span>
            </div>
            <div style="font-size: 13px; color: #64748b;">Ok bạn nhé, tài xế sẽ gọi trước khi giao 15 phút.</div>
          </div>
        </a>
      </div>
""" + get_bottom_nav("chat")
with open(os.path.join(output_dir, "14-danh-sach-tro-chuyen.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Danh sách trò chuyện", page_14))

# ----------------------------------------------------------------------
# 15. Add Product Text Entry Form
# ----------------------------------------------------------------------
page_15 = """
      <div class="app-header">
        <a href="08-trang-chu-nong-dan.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        <div>
          <h2 style="font-size: 16px; font-weight: 800; color: #587820;">Thu thập thông tin</h2>
          <div style="font-size: 12px; color: #64748b;">Hãy cung cấp thông tin về sản phẩm của bạn</div>
        </div>
      </div>

      <div style="padding: 16px; flex: 1;">
        <div style="border: 2px dashed #f59e0b; background-color: #fffbeb; border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 16px;">
          <i class="fa-solid fa-camera" style="font-size: 36px; color: #334155; margin-bottom: 8px;"></i>
          <div style="font-size: 13px; font-weight: 700; color: #78350f;">Chụp ảnh hoặc tải hình ảnh lên</div>
        </div>

        <div style="font-size: 14px; font-weight: 800; color: #587820; margin-bottom: 8px;">Mô tả chi tiết sản phẩm</div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; border-radius: 10px; overflow: hidden; margin-bottom: 16px;">
          <a href="12-dang-san-pham-giong-noi.html" style="background-color: #fef08a; color: #854d0e; text-align: center; padding: 10px; font-weight: 700; font-size: 14px; text-decoration: none;">Giọng nói</a>
          <div style="background-color: #92400e; color: #ffffff; text-align: center; padding: 10px; font-weight: 700; font-size: 14px;">Nhập chữ</div>
        </div>

        <div class="form-group">
          <label class="form-label">Loại trái cây muốn bán</label>
          <input type="text" class="form-input" placeholder="Nhập loại trái cây (ví dụ: Xoài, Chôm chôm...)">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Số điện thoại</label>
            <input type="text" class="form-input" placeholder="Nhập số điện thoại">
          </div>
          <div class="form-group">
            <label class="form-label">Ngày thu hoạch</label>
            <input type="text" class="form-input" placeholder="Nhập ngày thu hoạch (ví dụ: 20/10/2026)">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group">
            <label class="form-label">Sản lượng</label>
            <input type="text" class="form-input" placeholder="Nhập sản lượng (ví dụ: 50kg)">
          </div>
          <div class="form-group">
            <label class="form-label">Giá cả/ kg</label>
            <input type="text" class="form-input" placeholder="Nhập giá bán (ví dụ: 30.000đ)">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
          <div class="form-group">
            <label class="form-label">Ấp</label>
            <input type="text" class="form-input" placeholder="Nhập Ấp/Thôn">
          </div>
          <div class="form-group">
            <label class="form-label">Xã</label>
            <input type="text" class="form-input" placeholder="Nhập Xã/Phường">
          </div>
          <div class="form-group">
            <label class="form-label">Tỉnh</label>
            <input type="text" class="form-input" placeholder="Nhập Tỉnh/Thành">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Mô tả chi tiết sản phẩm</label>
          <textarea class="form-input" rows="3" placeholder="Nhập mô tả chi tiết sản phẩm..."></textarea>
        </div>

        <a href="20-chinh-sua-bai-dang.html" class="btn-primary" style="background-color: #8db837; margin-bottom: 20px;">
          Tiếp theo
        </a>
      </div>
""" + get_bottom_nav("home")
with open(os.path.join(output_dir, "15-dang-san-pham-nhap-lieu.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Đăng sản phẩm nhập liệu", page_15))

# ----------------------------------------------------------------------
# 16. Delete Account Confirmation Modal
# ----------------------------------------------------------------------
page_16 = """
      <div style="padding: 24px; background-color: #64748b; min-height: 100vh; position: relative;">
        <div style="opacity: 0.3;">
          <h2 style="font-size: 24px; color: #ffffff;">Trang cá nhân</h2>
        </div>

        <div class="modal-overlay">
          <div class="modal-card" style="padding: 30px 20px;">
            <h3 style="font-size: 22px; font-weight: 800; color: #1e293b; margin-bottom: 14px;">Xóa tài khoản</h3>
            <p style="font-size: 16px; color: #475569; margin-bottom: 28px;">
              Bạn có chắc chắn muốn xóa tài khoản?
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid #e2e8f0; margin: 0 -20px -30px -20px;">
              <a href="01-man-hinh-chao.html" style="padding: 16px; font-weight: 800; color: #dc2626; border-right: 1px solid #e2e8f0; text-decoration: none; font-size: 16px;">Xóa</a>
              <a href="13-ca-nhan.html" style="padding: 16px; font-weight: 800; color: #1e293b; text-decoration: none; font-size: 16px;">Không xóa</a>
            </div>
          </div>
        </div>
      </div>
"""
with open(os.path.join(output_dir, "16-xac-nhan-xoa-tai-khoan.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Xác nhận xóa tài khoản", page_16))

# ----------------------------------------------------------------------
# 17. AI Fruit Pricing Result
# ----------------------------------------------------------------------
page_17 = """
      <div class="app-header">
        <a href="12-dang-san-pham-giong-noi.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        <h2 class="header-title">Kết quả định giá từ AI</h2>
      </div>

      <div style="padding: 16px; flex: 1;">
        <div class="card yellow-tint" style="display: flex; gap: 14px; align-items: center; border-radius: 20px; padding: 16px; margin-bottom: 20px;">
          <img src="../image/Trái cây/chom chom ban.jpg" style="width: 80px; height: 80px; border-radius: 14px; object-fit: cover;">
          <div>
            <h3 style="font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 4px;">Chôm Chôm Vĩnh Long</h3>
            <div style="font-size: 18px; font-weight: 800; color: #4d7c0f;">32.000 - 36.000đ/kg</div>
          </div>
        </div>

        <h3 style="font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 16px;">Vì sao có mức giá này?</h3>
        <p style="font-size: 13px; color: #64748b; margin-bottom: 16px;">AI đã phân tích các yếu tố kinh tế và môi trường theo thời gian thực:</p>

        <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
          <div style="display: flex; gap: 14px; align-items: center;">
            <div style="width: 42px; height: 42px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4d7c0f;">
              <i class="fa-solid fa-star"></i>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 14px; color: #1e293b;">Giá thị trường hiện tại</div>
              <div style="font-size: 12px; color: #64748b;">Tăng 8% so với tuần trước</div>
            </div>
          </div>

          <div style="display: flex; gap: 14px; align-items: center;">
            <div style="width: 42px; height: 42px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4d7c0f;">
              <i class="fa-solid fa-sun"></i>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 14px; color: #1e293b;">Thời tiết</div>
              <div style="font-size: 12px; color: #64748b;">Thời tiết nắng tốt, dự báo thuận lợi cho thu hoạch sớm.</div>
            </div>
          </div>

          <div style="display: flex; gap: 14px; align-items: center;">
            <div style="width: 42px; height: 42px; background: #eaf3d8; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #4d7c0f;">
              <i class="fa-solid fa-box"></i>
            </div>
            <div>
              <div style="font-weight: 800; font-size: 14px; color: #1e293b;">Nguồn cung</div>
              <div style="font-size: 12px; color: #64748b;">Sản lượng khu vực đang giảm nhẹ.</div>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <span style="font-size: 13px; font-weight: 700; color: #1e293b;">Bạn còn câu hỏi nào khác ?</span>
          <a href="18-tro-chuyen-ai-agriagent.html" class="btn-primary" style="background-color: #854d0e; width: auto; font-size: 13px; padding: 8px 14px;">Đặt câu hỏi cho AI</a>
        </div>

        <a href="20-chinh-sua-bai-dang.html" class="btn-primary" style="background-color: #8db837;">
          Tiếp theo
        </a>
      </div>
"""
with open(os.path.join(output_dir, "17-dinh-gia-ai.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Kết quả định giá từ AI", page_17))

# ----------------------------------------------------------------------
# 18. Chat with AgriAgent AI Assistant
# ----------------------------------------------------------------------
page_18 = """
      <div class="app-header green" style="justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <a href="14-danh-sach-tro-chuyen.html" class="btn-back" style="color: #ffffff;"><i class="fa-solid fa-chevron-left"></i></a>
          <img id="chat-header-avatar" src="../image/logo.png" style="width: 40px; height: 40px; border-radius: 50%; object-fit: contain; background: #fef08a; padding: 2px;">
          <div>
            <div id="chat-header-name" style="font-size: 16px; font-weight: 800; color: #ffffff; line-height: 1.2;">AgriAgent AI</div>
            <div id="chat-header-status" style="font-size: 11px; color: rgba(255,255,255,0.85);">Trợ lý AI trực tuyến 24/7</div>
          </div>
        </div>
        <div style="display: flex; gap: 16px; color: #ffffff; font-size: 18px; align-items: center;">
          <i class="fa-solid fa-phone" style="cursor: pointer;"></i>
          <i class="fa-solid fa-video" style="cursor: pointer;"></i>
        </div>
      </div>

      <div id="chat-messages-list" style="padding: 16px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; background-color: #FFFAD4; gap: 10px;">
        <!-- Dynamic chat content populated by js/chat.js -->
      </div>

      <div style="padding: 12px 16px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; align-items: center; gap: 10px; position: sticky; bottom: 0;">
        <button style="border: none; background: none; color: #769f2e; font-size: 20px; cursor: pointer;"><i class="fa-solid fa-paperclip"></i></button>
        <button style="border: none; background: none; color: #769f2e; font-size: 20px; cursor: pointer;"><i class="fa-solid fa-camera"></i></button>
        <input id="chat-input" type="text" placeholder="Nhập tin nhắn..." style="flex: 1; border: 1.5px solid #cbd5e1; outline: none; padding: 10px 16px; border-radius: 24px; font-size: 14px; background: #f8fafc;">
        <button id="btn-send-chat" style="border: none; background: #769f2e; color: #ffffff; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; box-shadow: 0 4px 12px rgba(118,159,46,0.3); flex-shrink: 0;"><i class="fa-solid fa-paper-plane"></i></button>
      </div>
      <script src="../js/chat.js"></script>
      <script>document.addEventListener('DOMContentLoaded', initChatPage);</script>
"""
with open(os.path.join(output_dir, "18-tro-chuyen-ai-agriagent.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Trò chuyện với AI", page_18))

# ----------------------------------------------------------------------
# 19. Chat with Support Staff
# ----------------------------------------------------------------------
page_19 = """
      <div class="app-header green" style="justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <a href="14-danh-sach-tro-chuyen.html" class="btn-back" style="color: #ffffff;"><i class="fa-solid fa-chevron-left"></i></a>
          <img id="chat-header-avatar" src="../image/logo.png" style="width: 40px; height: 40px; border-radius: 50%; object-fit: contain; background: #fef08a; padding: 2px;">
          <div>
            <div id="chat-header-name" style="font-size: 16px; font-weight: 800; color: #ffffff; line-height: 1.2;">Nhân viên hỗ trợ</div>
            <div id="chat-header-status" style="font-size: 11px; color: rgba(255,255,255,0.85);">Bộ phận chăm sóc khách hàng</div>
          </div>
        </div>
        <div style="display: flex; gap: 16px; color: #ffffff; font-size: 18px; align-items: center;">
          <i class="fa-solid fa-phone" style="cursor: pointer;"></i>
          <i class="fa-solid fa-video" style="cursor: pointer;"></i>
        </div>
      </div>

      <div id="chat-messages-list" style="padding: 16px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; background-color: #FFFAD4; gap: 10px;">
        <!-- Dynamic chat content populated by js/chat.js -->
      </div>

      <div style="padding: 12px 16px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; align-items: center; gap: 10px; position: sticky; bottom: 0;">
        <button style="border: none; background: none; color: #769f2e; font-size: 20px; cursor: pointer;"><i class="fa-solid fa-paperclip"></i></button>
        <button style="border: none; background: none; color: #769f2e; font-size: 20px; cursor: pointer;"><i class="fa-solid fa-camera"></i></button>
        <input id="chat-input" type="text" placeholder="Nhập yêu cầu hỗ trợ..." style="flex: 1; border: 1.5px solid #cbd5e1; outline: none; padding: 10px 16px; border-radius: 24px; font-size: 14px; background: #f8fafc;">
        <button id="btn-send-chat" style="border: none; background: #769f2e; color: #ffffff; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; box-shadow: 0 4px 12px rgba(118,159,46,0.3); flex-shrink: 0;"><i class="fa-solid fa-paper-plane"></i></button>
      </div>
      <script src="../js/chat.js"></script>
      <script>document.addEventListener('DOMContentLoaded', initChatPage);</script>
"""
with open(os.path.join(output_dir, "19-tro-chuyen-nhan-vien.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Trò chuyện hỗ trợ", page_19))

# ----------------------------------------------------------------------
# 28. Individual Personal Chat Screen
# ----------------------------------------------------------------------
page_28 = """
      <div class="app-header green" style="justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; gap: 12px;">
          <a href="14-danh-sach-tro-chuyen.html" class="btn-back" style="color: #ffffff;"><i class="fa-solid fa-chevron-left"></i></a>
          <img id="chat-header-avatar" src="../image/Trái cây/chom chom ban.jpg" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid #ffffff;">
          <div>
            <div id="chat-header-name" style="font-size: 16px; font-weight: 800; color: #ffffff; line-height: 1.2;">Nông dân</div>
            <div id="chat-header-status" style="font-size: 11px; color: rgba(255,255,255,0.85);">Đang hoạt động</div>
          </div>
        </div>
        <div style="display: flex; gap: 16px; color: #ffffff; font-size: 18px; align-items: center;">
          <i class="fa-solid fa-phone" style="cursor: pointer;"></i>
          <i class="fa-solid fa-video" style="cursor: pointer;"></i>
        </div>
      </div>

      <div id="chat-messages-list" style="padding: 16px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; background-color: #f9f8ee; gap: 10px;">
        <!-- Dynamic chat content populated by js/chat.js -->
      </div>

      <div style="padding: 12px 16px; background: #ffffff; border-top: 1px solid #e2e8f0; display: flex; align-items: center; gap: 10px; position: sticky; bottom: 0;">
        <button style="border: none; background: none; color: #769f2e; font-size: 20px; cursor: pointer;"><i class="fa-solid fa-paperclip"></i></button>
        <button style="border: none; background: none; color: #769f2e; font-size: 20px; cursor: pointer;"><i class="fa-solid fa-camera"></i></button>
        <input id="chat-input" type="text" placeholder="Nhập tin nhắn..." style="flex: 1; border: 1.5px solid #cbd5e1; outline: none; padding: 10px 16px; border-radius: 24px; font-size: 14px; background: #f8fafc;">
        <button id="btn-send-chat" style="border: none; background: #769f2e; color: #ffffff; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer; box-shadow: 0 4px 12px rgba(118,159,46,0.3); flex-shrink: 0;"><i class="fa-solid fa-paper-plane"></i></button>
      </div>
      <script src="../js/chat.js"></script>
      <script>document.addEventListener('DOMContentLoaded', initChatPage);</script>
"""
with open(os.path.join(output_dir, "28-tro-chuyen-ca-nhan.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Trò chuyện cá nhân", page_28))

# ----------------------------------------------------------------------
# 20. Post / Edit Product Screen
# ----------------------------------------------------------------------
page_20 = """
      <div class="app-header">
        <a href="17-dinh-gia-ai.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        <h2 class="header-title">Đăng bài / chỉnh sửa</h2>
      </div>

      <div style="padding: 16px; flex: 1;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px;">
          <div style="position: relative; height: 130px; border-radius: 16px; overflow: hidden;">
            <img src="../image/Trái cây/chom chom ban.jpg" style="width: 100%; height: 100%; object-fit: cover;">
            <button style="position: absolute; bottom: 8px; left: 8px; background: rgba(255,255,255,0.9); border: none; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 700;">
              <i class="fa-solid fa-image"></i> Thay ảnh
            </button>
          </div>
          <div style="background: #fef08a; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 130px; border: 2px dashed #ca8a04;">
            <i class="fa-solid fa-plus" style="font-size: 28px; color: #854d0e;"></i>
            <span style="font-size: 11px; font-weight: 700; color: #854d0e; margin-top: 4px;">Thêm hình ảnh tại đây</span>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Tên sản phẩm</label>
          <input type="text" class="form-input" placeholder="Nhập tên sản phẩm">
        </div>

        <div class="form-group">
          <label class="form-label">Giá bán (AI gợi ý)</label>
          <div style="position: relative;">
            <input type="text" class="form-input" placeholder="Nhập giá bán (đ/kg)">
            <i class="fa-solid fa-pen" style="position: absolute; right: 14px; top: 50%; transform: translateY(-50%); color: #64748b;"></i>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Mô tả sản phẩm</label>
          <textarea class="form-input" rows="3" placeholder="Nhập mô tả sản phẩm..."></textarea>
          <div style="text-align: right; font-size: 11px; color: #94a3b8; margin-top: 4px;">0/200</div>
        </div>

        <div class="form-group">
          <label class="form-label">Địa chỉ</label>
          <input type="text" class="form-input" placeholder="Nhập địa chỉ (ấp/xã/tỉnh)...">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px;">
          <a href="25-quan-ly-san-pham-nong-dan.html" class="btn-secondary" style="border-color: #334155;">Lưu nháp</a>
          <a href="24-chi-tiet-san-pham.html" class="btn-primary" style="background-color: #8db837;">Đăng ngay</a>
        </div>
      </div>
"""
with open(os.path.join(output_dir, "20-chinh-sua-bai-dang.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Đăng bài chỉnh sửa", page_20))

# ----------------------------------------------------------------------
# 21. Order Checkout Confirmation
# ----------------------------------------------------------------------
page_21 = """
      <div class="app-header green">
        <a href="24-chi-tiet-san-pham.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        <h2 class="header-title" style="font-size: 17px;">Xác Nhận Đặt Mua Nông Sản</h2>
      </div>

      <div style="padding: 16px; flex: 1;">
        <div class="card green-tint" style="display: flex; gap: 12px; align-items: center; border-radius: 16px; margin-bottom: 16px;">
          <img id="checkout-img" src="../image/Trái cây/chom chom ban.jpg" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;">
          <div>
            <div id="checkout-name" style="font-weight: 800; font-size: 15px;">Chôm chôm</div>
            <div id="checkout-price" style="font-weight: 800; font-size: 14px; color: #4d7c0f;">34.000 VNĐ/kg</div>
            <div id="checkout-location" style="font-size: 11px; color: #64748b;">ấp Hòa, Xã Vĩnh Kim, tỉnh Đồng Tháp</div>
          </div>
        </div>

        <div style="font-weight: 800; font-size: 14px; color: #1e293b; margin-bottom: 10px;">Thông tin người nhận</div>
        <div class="form-group"><input type="text" class="form-input" placeholder="Nhập họ và tên người nhận"></div>
        <div class="form-group"><input type="text" class="form-input" placeholder="Nhập số điện thoại người nhận"></div>
        <div class="form-group"><input type="text" class="form-input" placeholder="Nhập địa chỉ giao hàng cụ thể"></div>

        <div class="form-group">
          <label class="form-label">Số lượng đặt mua (kg)</label>
          <input id="checkout-qty" type="number" class="form-input" placeholder="Nhập số lượng (kg)" value="10">
        </div>

        <div style="font-weight: 800; font-size: 14px; color: #1e293b; margin-bottom: 10px;"><i class="fa-solid fa-truck"></i> Tùy chọn hình thức vận chuyển</div>
        
        <div style="border: 2px solid #769f2e; background: #f4f8ec; padding: 12px; border-radius: 14px; margin-bottom: 10px;">
          <div style="font-weight: 800; font-size: 14px; color: #2d4612;">● Tham gia gom đơn (Giảm 50% phí ship)</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Dự kiến giao: 2 - 3 ngày (Chờ gom đủ tuyến)</div>
        </div>

        <div style="border: 1px solid #e2e8f0; padding: 12px; border-radius: 14px; margin-bottom: 20px;">
          <div style="font-weight: 700; font-size: 14px; color: #475569;">○ Giao riêng lập tức</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Dự kiến giao: Trong hôm nay hoặc ngày mai</div>
        </div>

        <div style="font-weight: 800; font-size: 14px; color: #1e293b; margin-bottom: 10px;">Phương thức thanh toán</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px;">
          <div style="border: 2px solid #769f2e; background: #ffffff; padding: 12px; border-radius: 12px; text-align: center; font-size: 13px; font-weight: 700;">
            <i class="fa-solid fa-qrcode" style="font-size: 20px; display: block; margin-bottom: 4px; color: #769f2e;"></i>
            Chuyển khoản QR
          </div>
          <div style="border: 1px solid #e2e8f0; background: #ffffff; padding: 12px; border-radius: 12px; text-align: center; font-size: 13px; font-weight: 700; color: #64748b;">
            <i class="fa-solid fa-money-bill" style="font-size: 20px; display: block; margin-bottom: 4px;"></i>
            Tiền mặt (COD)
          </div>
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; font-size: 14px; color: #64748b; margin-bottom: 6px;">
            <span>Tiền hàng:</span>
            <span id="checkout-subtotal">340.000 đ</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 14px; color: #64748b; margin-bottom: 10px;">
            <span>Phí vận chuyển:</span>
            <span>15.000 đ</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 800; color: #1e293b;">
            <span>Tổng thanh toán:</span>
            <span id="checkout-total" style="color: #2d4612;">355.000 đ</span>
          </div>
        </div>

        <a href="22-thanh-toan-qr-thanh-cong.html" class="btn-primary" style="background-color: #8db837; font-size: 17px;">
          <i class="fa-solid fa-check"></i> Xác Nhận Đặt Hàng
        </a>
      </div>
      <script src="../js/products.js"></script>
      <script>document.addEventListener('DOMContentLoaded', initCheckoutPage);</script>
"""
with open(os.path.join(output_dir, "21-xac-nhan-dat-hang.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Xác nhận đặt hàng", page_21))

# ----------------------------------------------------------------------
# 22. QR Code Payment Success
# ----------------------------------------------------------------------
page_22 = """
      <div class="app-header green">
        <a href="21-xac-nhan-dat-hang.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        <h2 class="header-title" style="font-size: 17px;">Thanh Toán QR Chuyển Khoản</h2>
      </div>

      <div style="padding: 24px 16px; flex: 1; text-align: center;">
        <div class="card" style="border-radius: 24px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 16px;">Quét mã QR để hoàn tất thanh toán</div>
          <div style="width: 180px; height: 180px; margin: 0 auto 16px; border: 4px solid #1e293b; padding: 10px; border-radius: 16px; background: #fff; display: flex; align-items: center; justify-content: center;">
            <i class="fa-solid fa-qrcode" style="font-size: 140px; color: #1e293b;"></i>
          </div>
          <div style="font-size: 24px; font-weight: 800; color: #2d4612; margin-bottom: 4px;">355.000 đ</div>
          <div style="font-size: 12px; color: #64748b;">Tự động xác nhận sau khi nhận tiền</div>
        </div>

        <div style="font-size: 15px; font-weight: 700; color: #16a34a; margin-bottom: 20px;">Thanh toán thành công</div>

        <a href="09-trang-chu-nguoi-mua.html" class="btn-primary" style="background-color: #8db837; margin-bottom: 12px;">
          <i class="fa-solid fa-check"></i> Quay về trang chủ
        </a>
      </div>
"""
with open(os.path.join(output_dir, "22-thanh-toan-qr-thanh-cong.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Thanh toán QR thành công", page_22))

# ----------------------------------------------------------------------
# 23. QR Code Payment Failed
# ----------------------------------------------------------------------
page_23 = """
      <div class="app-header green">
        <a href="21-xac-nhan-dat-hang.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        <h2 class="header-title" style="font-size: 17px;">Thanh Toán QR Chuyển Khoản</h2>
      </div>

      <div style="padding: 24px 16px; flex: 1; text-align: center;">
        <div class="card" style="border-radius: 24px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
          <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 16px;">Quét mã QR để hoàn tất thanh toán</div>
          <div style="width: 180px; height: 180px; margin: 0 auto 16px; border: 4px solid #1e293b; padding: 10px; border-radius: 16px; background: #fff; display: flex; align-items: center; justify-content: center;">
            <i class="fa-solid fa-qrcode" style="font-size: 140px; color: #dc2626;"></i>
          </div>
          <div style="font-size: 24px; font-weight: 800; color: #2d4612; margin-bottom: 4px;">355.000 đ</div>
          <div style="font-size: 12px; color: #64748b;">Tự động xác nhận sau khi nhận tiền</div>
        </div>

        <div style="font-size: 15px; font-weight: 700; color: #dc2626; margin-bottom: 20px;">Thanh toán không thành công</div>

        <a href="22-thanh-toan-qr-thanh-cong.html" class="btn-secondary" style="margin-bottom: 12px;">Thử lại</a>
        <a href="09-trang-chu-nguoi-mua.html" class="btn-primary" style="background-color: #8db837;">Quay về trang chủ</a>
      </div>
"""
with open(os.path.join(output_dir, "23-thanh-toan-qr-that-bai.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Thanh toán QR thất bại", page_23))

# ----------------------------------------------------------------------
# 24. Product Detail Screen
# ----------------------------------------------------------------------
page_24 = """
      <div style="flex: 1; display: flex; flex-direction: column;">
        <div style="height: 240px; position: relative;">
          <img id="product-img" src="../image/Trái cây/chom chom ban.jpg" style="width: 100%; height: 100%; object-fit: cover;">
          <a href="javascript:history.back()" style="position: absolute; top: 16px; left: 16px; width: 36px; height: 36px; background: rgba(255,255,255,0.8); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1e293b; text-decoration: none;">
            <i class="fa-solid fa-chevron-left"></i>
          </a>
        </div>

        <div style="padding: 16px; flex: 1; background: #f9f8ee;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
            <div id="product-price" style="font-size: 26px; font-weight: 800; color: #769f2e;">34.000đ <span style="font-size: 14px; font-weight: 500; color: #64748b;">/ kg</span></div>
            <span id="product-stock" style="background: #eaf3d8; color: #4d7c0f; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 700;">📦 Còn ~50 kg</span>
          </div>

          <h2 id="product-name" style="font-size: 22px; font-weight: 800; color: #1e293b; margin-bottom: 8px;">Chôm chôm Thái</h2>
          <div id="product-location" style="font-size: 13px; color: #64748b; margin-bottom: 16px;"><i class="fa-solid fa-location-dot" style="color: #769f2e;"></i> Ấp Hòa, Xã Vĩnh Kim, Tỉnh Đồng Tháp</div>

          <div class="card" style="display: flex; justify-content: space-between; align-items: center; border-radius: 16px; margin-bottom: 16px;">
            <div style="display: flex; gap: 12px; align-items: center;">
              <div style="width: 44px; height: 44px; background: #cbd5e1; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i class="fa-solid fa-user-nurse" style="font-size: 22px; color: #475569;"></i>
              </div>
              <div>
                <div id="product-farmer" style="font-weight: 800; font-size: 14px; color: #1e293b;">Chú Thành Đồng Tháp <i class="fa-solid fa-circle-check" style="color: #769f2e;"></i></div>
                <div style="font-size: 11px; color: #64748b;">Đã xác minh hộ nông dân</div>
              </div>
            </div>
            <button class="btn-secondary" style="width: auto; padding: 6px 12px; font-size: 12px;">Xem vườn</button>
          </div>

          <div class="card" style="border-radius: 16px; margin-bottom: 20px;">
            <h3 style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 8px;">Mô tả sản phẩm</h3>
            <p id="product-desc" style="font-size: 13px; color: #475569; line-height: 1.6; margin-bottom: 14px;">
              Chôm chôm Thái chín cây, trái to, thơm ngọt tự nhiên. Thu hoạch trực tiếp tại vườn, đảm bảo nông sản sạch không qua trung gian. Bà con ủng hộ giúp vườn thu hoạch đúng lứa!
            </p>
            <div id="product-tags" style="display: flex; gap: 8px; flex-wrap: wrap;">
              <span style="background: #f1f5f9; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; color: #475569;">✓ Hái tại vườn</span>
              <span style="background: #f1f5f9; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; color: #475569;">✓ Bao ăn 1 đổi 1</span>
              <span style="background: #f1f5f9; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700; color: #475569;">🚚 Hỗ trợ ghép chuyến</span>
            </div>
          </div>
        </div>

        <div style="background: #ffffff; padding: 12px 16px; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; align-items: center; position: sticky; bottom: 0;">
          <a href="14-danh-sach-tro-chuyen.html" style="width: 44px; height: 44px; border: 1.5px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #475569; text-decoration: none;">
            <i class="fa-regular fa-comment-dots" style="font-size: 20px;"></i>
          </a>
          <a href="tel:0901234567" style="width: 44px; height: 44px; border: 1.5px solid #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #475569; text-decoration: none;">
            <i class="fa-solid fa-phone" style="font-size: 18px;"></i>
          </a>
          <a id="btn-buy-now" href="21-xac-nhan-dat-hang.html" class="btn-primary" style="flex: 1; background-color: #2d4612;">
            <i class="fa-solid fa-cart-shopping"></i> Giải cứu ngay
          </a>
        </div>
      </div>
      <script src="../js/products.js"></script>
      <script>document.addEventListener('DOMContentLoaded', initProductDetailPage);</script>
"""
with open(os.path.join(output_dir, "24-chi-tiet-san-pham.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Chi tiết sản phẩm", page_24))

# ----------------------------------------------------------------------
# 25. Farmer Product Management Listing
# ----------------------------------------------------------------------
page_25 = """
      <div class="app-header">
        <a href="08-trang-chu-nong-dan.html" class="btn-back"><i class="fa-solid fa-chevron-left"></i></a>
        <h2 class="header-title">Quản lý nông sản</h2>
      </div>

      <div style="padding: 16px; flex: 1;">
        <div class="card green-tint" style="display: flex; gap: 14px; align-items: center; border-radius: 18px; padding: 16px;">
          <img src="../image/Trái cây/chom chom ban.jpg" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;">
          <div style="flex: 1;">
            <div style="font-weight: 800; font-size: 16px; color: #1e293b;">Chôm chôm</div>
            <div style="font-weight: 800; font-size: 14px; color: #4d7c0f; margin: 2px 0;">34.000 VNĐ/kg</div>
            <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">ấp Hòa, Xã Vĩnh Kim, tỉnh Đồng Tháp</div>
            <a href="20-chinh-sua-bai-dang.html" class="btn-primary" style="background-color: #8db837; width: auto; font-size: 12px; padding: 6px 16px; display: inline-flex;">
              Chỉnh sửa
            </a>
          </div>
        </div>
      </div>
""" + get_bottom_nav("home")
with open(os.path.join(output_dir, "25-quan-ly-san-pham-nong-dan.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Quản lý nông sản", page_25))

# ----------------------------------------------------------------------
# 26. Order Tracking Timeline & Map
# ----------------------------------------------------------------------
page_26 = """
      <div class="app-header green">
        <a href="13-ca-nhan.html" class="btn-back"><i class="fa-solid fa-house"></i></a>
        <h2 class="header-title" style="font-size: 17px;">Theo Dõi Đơn Hàng #AG892</h2>
      </div>

      <div style="padding: 16px; flex: 1;">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="width: 50px; height: 50px; background: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; margin: 0 auto 10px;">
            <i class="fa-solid fa-check" style="font-size: 26px;"></i>
          </div>
          <h3 style="font-size: 18px; font-weight: 800; color: #1e293b;">Đặt Hàng Thành Công!</h3>
          <p style="font-size: 13px; color: #ca8a04; font-weight: 700; margin-top: 2px;">Dự kiến giao: Trong ngày (Giao riêng)</p>
        </div>

        <div class="card" style="border-radius: 18px; padding: 18px; margin-bottom: 20px;">
          <div style="font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 14px;"><i class="fa-solid fa-truck-ramp-box"></i> Tiến Trình Đơn Hàng</div>
          
          <div style="display: flex; flex-direction: column; gap: 16px; position: relative; padding-left: 20px;">
            <div style="position: absolute; left: 6px; top: 10px; bottom: 10px; width: 2px; background: #e2e8f0;"></div>

            <div style="position: relative;">
              <span style="position: absolute; left: -20px; top: 2px; width: 14px; height: 14px; background: #769f2e; border-radius: 50%;"></span>
              <div style="font-weight: 800; font-size: 13px; color: #1e293b;">Đơn hàng được ghi nhận & Cập nhật trạng thái</div>
              <div style="font-size: 11px; color: #64748b;">Hệ thống AgriAgent AI đã gửi đơn đến nông dân</div>
            </div>

            <div style="position: relative;">
              <span style="position: absolute; left: -20px; top: 2px; width: 14px; height: 14px; background: #cbd5e1; border-radius: 50%;"></span>
              <div style="font-weight: 700; font-size: 13px; color: #64748b;">Bàn giao đơn vị vận chuyển</div>
              <div style="font-size: 11px; color: #94a3b8;">Đơn vị vận chuyển phân loại & phân phối</div>
            </div>

            <div style="position: relative;">
              <span style="position: absolute; left: -20px; top: 2px; width: 14px; height: 14px; background: #cbd5e1; border-radius: 50%;"></span>
              <div style="font-weight: 700; font-size: 13px; color: #64748b;">Đơn hàng đang trên đường vận chuyển</div>
            </div>

            <div style="position: relative;">
              <span style="position: absolute; left: -20px; top: 2px; width: 14px; height: 14px; background: #cbd5e1; border-radius: 50%;"></span>
              <div style="font-weight: 700; font-size: 13px; color: #64748b;">Giao hàng thành công & Đánh giá</div>
            </div>
          </div>
        </div>

        <div style="height: 180px; background: #e2e8f0; border-radius: 18px; overflow: hidden; position: relative; margin-bottom: 20px; border: 1px solid #cbd5e1;">
          <svg width="100%" height="100%" viewBox="0 0 300 180" style="background: #e6f4ea;">
            <path d="M 30,140 Q 90,60 180,100 T 270,40" fill="none" stroke="#22c55e" stroke-width="5" stroke-dasharray="8 4" />
            <circle cx="30" cy="140" r="10" fill="#15803d" />
            <circle cx="270" cy="40" r="10" fill="#dc2626" />
            <text x="45" y="145" font-size="12" font-weight="bold" fill="#15803d">Vườn Chôm Chôm</text>
            <text x="180" y="35" font-size="12" font-weight="bold" fill="#dc2626">Địa chỉ người nhận</text>
          </svg>
        </div>

        <a href="08-trang-chu-nong-dan.html" class="btn-primary" style="background-color: #8db837;">
          Quay về Màn hình chính
        </a>
      </div>
"""
with open(os.path.join(output_dir, "26-theo-doi-don-hang.html"), "w", encoding="utf-8") as f:
    f.write(wrap_html("Theo dõi đơn hàng", page_26))

print("Rebuilt all HTML pages cleanly with non-duplicated logo layout.")
