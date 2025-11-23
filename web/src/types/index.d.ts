export interface ChatItemProps {
  _id: string;
  name: string;
  profileImage: string;
  lastMessage: string;
  lastSeen: string;
  isOnline: boolean;
}

export interface MessageProps {
  _id: string;
  createdAt: string;
  message: string;
}
