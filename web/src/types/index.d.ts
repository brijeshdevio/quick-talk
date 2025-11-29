export interface UserType {
  _id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export type LoginType = Omit<RegisterType, "name">;

export interface ChatItemProps {
  _id: string;
  member: {
    _id: string;
    name: string;
    isOnline: boolean;
    lastSeen: string;
    avatar?: string;
  };
  lastMessage: {
    _id: string;
    message: string;
  };
}

export interface MessageProps {
  _id: string;
  createdAt: string;
  content: string;
  sender: string;
}

export interface ContactType {
  _id: string;
  name: string;
  email: string;
}

export interface CreateChatType {
  member: string;
}

export interface LocalStoreType {
  isContactModal: boolean;
  setIsContactModal: (value: boolean) => void;
  chat: ChatItemProps;
  setChat: (value: ChatItemProps) => void;
}
