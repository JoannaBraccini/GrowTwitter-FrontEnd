import { Tweet } from "./tweet.type";

export interface User {
  id: string;
  name: string;
  email?: string;
  username: string;
  bio?: string;
  avatarUrl: string;
  followers?: UserBase[];
  following?: UserBase[];
  tweets?: Tweet[];
}

export type UserBase = Pick<User, "id" | "name" | "username" | "avatarUrl">;

export type UserSearchRequest = Partial<
  Pick<User, "id" | "name" | "username" | "email">
>;

export type UserUpdate = { id: string } & Partial<
  Pick<User, "name" | "username" | "avatarUrl" | "bio">
> & {
    password?: string;
  };
