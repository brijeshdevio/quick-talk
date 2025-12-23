// ================ USER TYPES ===========
export type UserType = {
  _id: string;
  name: string;
  email: string;
  isOnline: boolean;
  lastSeen: string;
};

// =============== CONTEXT TYPES ===========
export type AuthContext = {
  user: UserType | null;
  loading: boolean;
  isAuthenticated: boolean;
};

// ================ FORM TYPES ===========
export type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
