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
  sender: string;
  receiver: string;
}

export interface ContactType {
  _id: string;
  name: string;
  email: string;
}
