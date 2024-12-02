export interface LoginRequest {
  username?: string;
  email?: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: string;
  username: string;
  name: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  username: string;
}

export type ProfileUpdate = Partial<
  Pick<LoginRequest, "username" | "password">
>;
