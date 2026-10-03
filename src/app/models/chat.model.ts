export interface ChatMessage {
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: string;
  headerBg?: string;
  headerColor?: string;
  chatBg?: string;
  initialMessages: ChatMessage[];
  replies: string[];
}
