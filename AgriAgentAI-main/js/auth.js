// js/auth.js

// Hàm hiển thị hộp thoại thông báo tùy chỉnh (Custom Alert Nông Thương)
function showAlert(message, redirectUrl = null) {
    const modal = document.getElementById('nongthuong-alert');
    const msgEl = document.getElementById('nongthuong-alert-msg');
    const okBtn = document.getElementById('nongthuong-alert-ok');

    if (modal && msgEl && okBtn) {
        msgEl.textContent = message;
        modal.style.display = 'flex'; // Hiển thị modal
        
        // Sự kiện khi bấm nút OK
        okBtn.onclick = function(e) {
            e.preventDefault();
            modal.style.display = 'none'; // Ẩn modal
            if (redirectUrl) {
                window.location.href = redirectUrl; // Chuyển trang nếu có
            }
        };
    } else {
        // Fallback dự phòng nếu quên chưa dán HTML hộp thoại
        alert(message);
        if (redirectUrl) window.location.href = redirectUrl;
    }
}

// Lấy danh sách người dùng từ "cơ sở dữ liệu" (localStorage)
function getUsers() {
    const users = localStorage.getItem('agri_users');
    return users ? JSON.parse(users) : [];
}

// Lưu danh sách người dùng
function saveUsers(users) {
    localStorage.setItem('agri_users', JSON.stringify(users));
}

// Hàm xử lý Đăng ký
function handleRegister(event, role) {
    event.preventDefault();

    const fullnameInput = document.getElementById('fullname-input');
    const usernameInput = document.getElementById('reg-username-input');
    const passwordInput = document.getElementById('reg-password-input');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    const termsCheckbox = document.getElementById('terms'); 

    if (!fullnameInput || !usernameInput || !passwordInput || !confirmPasswordInput) {
        showAlert('Lỗi: Không tìm thấy trường nhập liệu. Vui lòng kiểm tra lại ID trong HTML.');
        return;
    }

    const fullname = fullnameInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    // 1. Kiểm tra điền đủ thông tin
    if (!fullname || !username || !password || !confirmPassword) {
        showAlert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    // 2. Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
        showAlert('Mật khẩu nhập lại không khớp!');
        return;
    }

    // 3. Kiểm tra đã tick vào ô điều khoản chưa
    if (!termsCheckbox.checked) {
        showAlert('Bạn phải đồng ý với chính sách và điều khoản của Nông Thương để tiếp tục!');
        return;
    }

    const users = getUsers();
    const existingUser = users.find(u => u.username === username);

    // 4. Kiểm tra trùng tên đăng nhập
    if (existingUser) {
        showAlert('Tên đăng nhập này đã tồn tại. Vui lòng chọn tên khác!');
        return;
    }

    // Lưu user mới vào danh sách
    const newUser = { fullname, username, password, role };
    users.push(newUser);
    saveUsers(users);

    // Tự động đăng nhập luôn sau khi đăng ký thành công
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Thông báo thành công và chuyển hướng
    const nextUrl = role === 'farmer' ? '08-trang-chu-nong-dan.html' : '09-trang-chu-nguoi-mua.html';
    showAlert('Đăng ký thành công!', nextUrl);
}

// Hàm xử lý Đăng nhập
function handleLogin(event) {
    event.preventDefault();

    const usernameInput = document.getElementById('login-username-input');
    const passwordInput = document.getElementById('login-password-input');
    
    if (!usernameInput || !passwordInput) return;

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!username || !password) {
        showAlert('Vui lòng nhập tên đăng nhập và mật khẩu!');
        return;
    }

    const users = getUsers();
    // Kiểm tra xem có tài khoản nào khớp cả tên đăng nhập và mật khẩu không
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Đăng nhập thành công
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        const nextUrl = user.role === 'farmer' ? '08-trang-chu-nong-dan.html' : '09-trang-chu-nguoi-mua.html';
        window.location.href = nextUrl; // Chuyển trang trực tiếp
    } else {
        showAlert('Tên đăng nhập hoặc mật khẩu không chính xác! Vui lòng thử lại.');
    }
}

// Hàm hiển thị tên người dùng (Ưu tiên hiển thị Tên thật - fullname)
function displayUserName() {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
        const currentUser = JSON.parse(currentUserData);
        const nameElements = document.querySelectorAll('.dynamic-username');
        nameElements.forEach(el => {
            el.textContent = currentUser.fullname; 
        });
    }
}

// Hàm đăng xuất
function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('currentUser'); // Xóa phiên đăng nhập
    window.location.href = '03-dang-nhap.html';
}

// Hàm xử lý ẩn/hiện mật khẩu
function togglePassword(icon) {
    // Tìm ô input nằm ngay cùng cấp (trong cùng div relative)
    const input = icon.parentElement.querySelector('input');
    
    if (input.type === "password") {
        input.type = "text"; // Hiện mật khẩu
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash'); // Đổi sang icon con mắt bị gạch chéo
    } else {
        input.type = "password"; // Ẩn mật khẩu
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye'); // Đổi lại thành con mắt bình thường
    }
}

// Tự động chuyển hướng nếu đã đăng nhập (Duy trì phiên đăng nhập)
function checkAutoLogin() {
    const currentUserData = localStorage.getItem('currentUser');
    const currentPage = window.location.pathname.toLowerCase();
    
    // Chỉ tự động chuyển hướng khi ở màn hình chào (01) hoặc đăng nhập (03)
    if (currentUserData && (currentPage.includes('01-') || currentPage.includes('03-') || currentPage.endsWith('/'))) {
        const currentUser = JSON.parse(currentUserData);
        const nextUrl = currentUser.role === 'farmer' ? '08-trang-chu-nong-dan.html' : '09-trang-chu-nguoi-mua.html';
        window.location.href = nextUrl;
    }
}

// Chạy tự động khi tải trang
document.addEventListener('DOMContentLoaded', () => {
    checkAutoLogin();
    displayUserName();
});