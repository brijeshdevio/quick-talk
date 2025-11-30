// USER PROFILE

export interface UserType {
  _id: string;
  name: string;
  email: string;
}

// !AUTH CONTEXT
export interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// USER REGISTER
export interface RegisterType {
  name: string;
  email: string;
  password: string;
}

// USER LOGIN
export type LoginType = Omit<RegisterType, "name">;

// CHAT ITEM
export interface ChatItemType {
  _id: string;
  lastMessage: {
    _id: string;
    content: string;
  };
  member: {
    _id: string;
    name: string;
    avatar?: string;
    isOnline: string;
    lastSeen: string;
  };
  updatedAt: string;
}

// MESSAGE
export interface MessageType {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
}
