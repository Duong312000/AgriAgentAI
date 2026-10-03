import { Injectable } from '@angular/core';
import { ChatUser, ChatMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chatUsers: Record<string, ChatUser> = {
    "khang-xoai": {
      id: "khang-xoai",
      name: "Khang Xoài",
      avatar: "assets/image/74acf8d5fc78215adb7b31123fc10cc7.jpg",
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
      avatar: "assets/image/622f949df277af76c811644427ebcace.jpg",
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
      avatar: "assets/image/a28917e48c7907a6a465f308c3e68ba2.jpg",
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
      avatar: "assets/image/492be8585cfc89c15c16f933b6b71976.jpg",
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
      avatar: "assets/image/logo.png",
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
      avatar: "assets/image/bf6893740faf9b9fd905b3094897788d.jpg",
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

  getChatUser(id: string): ChatUser {
    return this.chatUsers[id] || this.chatUsers['khang-xoai'];
  }

  getAllChatUsers(): ChatUser[] {
    return Object.values(this.chatUsers);
  }
}
