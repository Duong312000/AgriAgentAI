// js/chat.js
// Centralized Chat System & Real-time Messaging Interaction for AgriAgent AI

const CHAT_USERS = {
  "khang-xoai": {
    id: "khang-xoai",
    name: "Khang Xoài",
    avatar: "../image/74acf8d5fc78215adb7b31123fc10cc7.jpg",
    status: "Đang hoạt động",
    headerBg: "#fde047",
    headerColor: "#111827",
    chatBg: "#FFFAD4",
    initialMessages: [
      { sender: "them", text: "Dạ em chào anh Thành! Xoài Cát loại 1 hôm nay mới hái bao ngọt tươi ngon luôn ạ.", time: "9:38 AM" },
      { sender: "me", text: "Xoài này bao nhiêu 1 kg vậy em?", time: "9:40 AM" },
      { sender: "them", text: "Dạ 30.000đ/kg thôi anh, ghép chuyến giao tận nơi trong ngày nha!", time: "9:41 AM" }
    ],
    replies: [
      "Dạ em nghe đây anh Thành ơi! Trái cây nhà em hái tại vườn 100% nha.",
      "Dạ anh đặt mua trên hệ thống em chuẩn bị đơn giao liền ạ!",
      "Cảm ơn anh nhiều nghen! Anh cần lấy bao nhiêu kg ạ?",
      "Dạ em đã ghi nhận thông tin của anh rồi nghen!"
    ]
  },
  "duong-mit": {
    id: "duong-mit",
    name: "Dương Mít",
    avatar: "../image/622f949df277af76c811644427ebcace.jpg",
    status: "Đang hoạt động",
    headerBg: "#fde047",
    headerColor: "#111827",
    chatBg: "#FFFAD4",
    initialMessages: [
      { sender: "them", text: "Chào chú Thành, sầu riêng với mít vườn nhà chú đợt này trúng mùa quá!", time: "8:15 AM" },
      { sender: "me", text: "Cảm ơn cháu nhé, bưởi với xoài bên cháu thế nào?", time: "8:20 AM" },
      { sender: "them", text: "Dạ cũng đang vào lứa thu hoạch ngon lắm chú ạ.", time: "8:22 AM" }
    ],
    replies: [
      "Dạ cháu cảm ơn chú! Có gì bà con mình hỗ trợ ghép chuyến vận chuyển nha chú.",
      "Dạ chuẩn luôn chú ơi!",
      "Chú nhắn em số lượng nha em gom chuyến giao sớm cho chú ạ."
    ]
  },
  "truong-giang": {
    id: "truong-giang",
    name: "Trường Giang",
    avatar: "../image/a28917e48c7907a6a465f308c3e68ba2.jpg",
    status: "Truy cập 5 phút trước",
    headerBg: "#fde047",
    headerColor: "#111827",
    chatBg: "#FFFAD4",
    initialMessages: [
      { sender: "them", text: "Dạ em nhận được thông báo đặt dưa hấu của anh rồi ạ.", time: "9:20 AM" },
      { sender: "me", text: "Anh cảm ơn nhé, trời mưa có giao kịp không em?", time: "9:25 AM" },
      { sender: "them", text: "Dạ xe bên em có bạt che kín nên nông sản an toàn 100% ạ!", time: "9:26 AM" }
    ],
    replies: [
      "Dạ bên em đang chuẩn bị đóng hàng gửi anh đây ạ!",
      "Dạ vâng anh yên tâm nghen, tài xế đang trên đường tới rồi ạ.",
      "Cảm ơn anh đã ủng hộ nông dân ạ!"
    ]
  },
  "thanh": {
    id: "thanh",
    name: "Thanh",
    avatar: "../image/492be8585cfc89c15c16f933b6b71976.jpg",
    status: "Đang hoạt động",
    headerBg: "#fde047",
    headerColor: "#111827",
    chatBg: "#FFFAD4",
    initialMessages: [
      { sender: "them", text: "Mình xin xác nhận lại đơn hàng vú sữa và ổi cho bạn nhé.", time: "Thứ 6" },
      { sender: "me", text: "Cảm ơn Thanh, giao giúp mình trong buổi sáng nhé.", time: "Thứ 6" },
      { sender: "them", text: "Ok bạn nhé, tài xế sẽ gọi trước khi giao 15 phút.", time: "Thứ 6" }
    ],
    replies: [
      "Dạ vâng mình ghi nhận rồi nhé!",
      "Hàng tươi ngon lắm bạn yên tâm nha.",
      "Cảm ơn bạn đã đồng hành cùng AgriAgent AI!"
    ]
  },
  "agri-ai": {
    id: "agri-ai",
    name: "AgriAgent AI",
    avatar: "../image/logo.png",
    status: "Trợ lý AI trực tuyến 24/7",
    headerBg: "#fde047",
    headerColor: "#111827",
    chatBg: "#FFFAD4",
    initialMessages: [
      { sender: "them", text: "Chào bạn, mình là AgriAgent AI! Bạn có thắc mắc gì về giá cả hoặc nông sản không ?", time: "Vừa xong" },
      { sender: "me", text: "Tôi muốn hỏi về giá thành và cách chăm cây", time: "Vừa xong" },
      { sender: "them", text: "Mình hiểu ý bạn rồi ! Hãy cho mình thêm thông tin về sản phẩm của bạn nhé, đừng ngần ngại", time: "Vừa xong" }
    ],
    replies: [
      "AgriAgent AI đã phân tích: Mức giá nông sản tuần này có xu hướng ổn định và tăng nhẹ 5-8%.",
      "Bạn có thể sử dụng tính năng Định giá AI để nhận dự báo giá theo thời gian thực cho lứa thu hoạch sắp tới!",
      "Mình khuyến nghị bạn kiểm tra độ ẩm của đất và bón phân hữu cơ sinh học định kỳ lứa này nhé."
    ]
  },
  "support-staff": {
    id: "support-staff",
    name: "Tiến Thành",
    avatar: "../image/bf6893740faf9b9fd905b3094897788d.jpg",
    status: "Nhân viên hỗ trợ CSKH",
    headerBg: "#f7d44c",
    headerColor: "#262626",
    chatBg: "#FFFAD4",
    initialMessages: [
      { sender: "them", text: "Chào Thùy Anh, Trung tâm hỗ trợ AgriAgent AI xin nghe! Bạn đang cần hỗ trợ gì ạ? ❤️", time: "Vừa xong" }
    ],
    replies: [
      "Dạ em chào chị Thùy Anh ạ! Bộ phận CSKH đã ghi nhận yêu cầu và sẽ xử lý ngay lập tức.",
      "Chị Thùy Anh có thể kiểm tra tiến trình đơn hàng tại mục Theo dõi đơn hàng nhé!",
      "Nếu cần hỗ trợ khẩn cấp, chị Thùy Anh có thể liên hệ tổng đài 1900-xxxx ạ."
    ]
  }
};

// Interactive Chat Handler Function
function initChatPage() {
  const urlParams = new URLSearchParams(window.location.search);
  let userId = urlParams.get('user') || 'khang-xoai';
  
  // Check if current page is specific static chat page
  const pagePath = window.location.pathname.toLowerCase();
  if (pagePath.includes('18-tro-chuyen-ai-agriagent')) {
    userId = 'agri-ai';
  } else if (pagePath.includes('19-tro-chuyen-nhan-vien')) {
    userId = 'support-staff';
  }

  const user = CHAT_USERS[userId] || CHAT_USERS['khang-xoai'];

  // Update Header UI
  const headerNameEl = document.getElementById('chat-header-name');
  const headerAvatarEl = document.getElementById('chat-header-avatar');
  const headerStatusEl = document.getElementById('chat-header-status');
  const chatMessagesEl = document.getElementById('chat-messages-list');
  const chatInputEl = document.getElementById('chat-input');
  const sendBtnEl = document.getElementById('btn-send-chat');

  if (headerNameEl) headerNameEl.textContent = user.name;
  if (headerAvatarEl) headerAvatarEl.src = user.avatar;
  if (headerStatusEl) headerStatusEl.textContent = user.status;

  // Lấy thông tin user hiện tại để đồng bộ tên trong chat
  const currentUserData = localStorage.getItem('currentUser');
  let currentUserName = "Bạn";
  if (currentUserData) {
      currentUserName = JSON.parse(currentUserData).fullname;
  }

  // Hàm tự động đổi tên mặc định thành tên người dùng thực tế
  function replaceNameInText(text) {
      if(!text) return "";
      return text.replace(/anh Thành|chú Thành|Thùy Anh/gi, currentUserName);
  }

  // Load Initial Messages
  let messages = [...user.initialMessages];

  function renderMessages() {
    if (!chatMessagesEl) return;
    chatMessagesEl.innerHTML = '';

    messages.forEach(msg => {
      const isMe = msg.sender === 'me';
      const msgRow = document.createElement('div');
      
      // Đổi tên trong tin nhắn trước khi hiển thị
      const displayMsgText = replaceNameInText(msg.text);
      
      if (isMe) {
        msgRow.style.cssText = "align-self: flex-end; max-width: 82%; background-color: #4f52ff; color: #ffffff; padding: 12px 18px; border-radius: 20px 20px 4px 20px; font-size: 15px; font-weight: 500; line-height: 1.4; box-shadow: 0 4px 12px rgba(79, 82, 255, 0.25); margin-bottom: 12px;";
        msgRow.innerHTML = `<div>${escapeHtml(displayMsgText)}</div><div style="font-size: 10px; opacity: 0.75; text-align: right; margin-top: 4px;">${msg.time}</div>`;
      } else {
        msgRow.style.cssText = "display: flex; gap: 10px; align-items: flex-end; max-width: 85%; margin-bottom: 12px;";
        msgRow.innerHTML = `
          <img src="${user.avatar}" alt="Avatar" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; flex-shrink: 0; margin-bottom: 2px;">
          <div style="background-color: #ffffff; padding: 12px 18px; border-radius: 20px 20px 20px 4px; font-size: 15px; color: #111827; font-weight: 500; line-height: 1.4; box-shadow: 0 3px 10px rgba(0,0,0,0.06);">
            <div>${escapeHtml(displayMsgText)}</div>
            <div style="font-size: 10px; color: #94a3b8; text-align: right; margin-top: 4px;">${msg.time}</div>
          </div>
        `;
      }
      chatMessagesEl.appendChild(msgRow);
    });

    // Scroll to bottom
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  }

  function getCurrentTimeString() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  function handleSendMessage() {
    if (!chatInputEl) return;
    const text = chatInputEl.value.trim();
    if (!text) return;

    // Push User Message
    messages.push({
      sender: "me",
      text: text,
      time: getCurrentTimeString()
    });

    chatInputEl.value = '';
    renderMessages();

    // Auto reply simulation after 1 second
    setTimeout(() => {
      const replyPool = user.replies || [`Dạ em cảm ơn ${currentUserName}! Em sẽ nhắn lại ngay ạ.`];
      const randomReply = replyPool[Math.floor(Math.random() * replyPool.length)];
      
      messages.push({
        sender: "them",
        text: randomReply,
        time: getCurrentTimeString()
      });
      renderMessages();
    }, 1000);
  }

  if (sendBtnEl) {
    sendBtnEl.addEventListener('click', handleSendMessage);
  }

  if (chatInputEl) {
    chatInputEl.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
      }
    });
  }

  renderMessages();
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}