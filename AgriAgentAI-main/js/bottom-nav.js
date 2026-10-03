/**
 * Reusable Floating Capsule Bottom Navigation Bar Loader Script
 * Usage: Place <div id="bottom-nav-root"></div> and <script src="../js/bottom-nav.js" data-active="home"></script>
 */
(function() {
  function renderBottomNav() {
    const scriptTag = document.currentScript || document.querySelector('script[src*="bottom-nav.js"]');
    const activeTab = scriptTag ? scriptTag.getAttribute('data-active') : 'home';
    
    // Auto-detect based on pathname if not provided
    const pathname = window.location.pathname;
    let activeKey = activeTab || 'home';
    
    if (pathname.includes('trang-chu')) activeKey = 'home';
    else if (pathname.includes('tro-chuyen')) activeKey = 'chat';
    else if (pathname.includes('thong-bao')) activeKey = 'notifications';
    else if (pathname.includes('ca-nhan')) activeKey = 'profile';

    const tabs = [
      { name: 'Trang chủ', link: '08-trang-chu-nong-dan.html', icon: 'fa-solid fa-house', key: 'home' },
      { name: 'Trò chuyện', link: '14-danh-sach-tro-chuyen.html', icon: 'fa-regular fa-comment-dots', key: 'chat' },
      { name: 'Thông Báo', link: '10-thong-bao.html', icon: 'fa-regular fa-bell', key: 'notifications' },
      { name: 'Cá nhân', link: '13-ca-nhan.html', icon: 'fa-regular fa-user', key: 'profile' }
    ];

    let navHtml = '<div class="bottom-nav">\n';
    tabs.forEach(tab => {
      const activeCls = (tab.key === activeKey) ? 'active' : '';
      navHtml += `  <a href="${tab.link}" class="nav-item ${activeCls}">\n`;
      navHtml += `    <i class="${tab.icon}"></i>\n`;
      navHtml += `    <span>${tab.name}</span>\n`;
      navHtml += `  </a>\n`;
    });
    navHtml += '</div>';

    // Target element or append to body inside .app-content
    const rootEl = document.getElementById('bottom-nav-root');
    if (rootEl) {
      rootEl.innerHTML = navHtml;
    } else {
      const appContent = document.querySelector('.app-content') || document.body;
      const navWrapper = document.createElement('div');
      navWrapper.innerHTML = navHtml;
      appContent.appendChild(navWrapper.firstElementChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderBottomNav);
  } else {
    renderBottomNav();
  }
})();
