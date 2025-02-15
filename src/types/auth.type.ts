export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
  remember: boolean;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatarUrl: string;
    bio?: string;
  };
}

export interface SignupRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface SignupResponse {
  id: string;
  name: string;
  email: string;
  username: string;
  createdAt: Date;
}
