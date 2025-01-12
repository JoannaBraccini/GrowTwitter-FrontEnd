export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
  };
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  username: string;
}
