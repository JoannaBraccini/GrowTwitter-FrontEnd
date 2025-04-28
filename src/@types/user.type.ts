import { Tweet } from "./tweet.type";
export type Verified = "NONE" | "BLUE" | "GOLD";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
  bio: string;
  verified: Verified;
  createdAt: string;
  followers: Follow[];
  following: Follow[];
  tweets: Tweet[];
}

export type UserBase = Pick<
  User,
  "id" | "name" | "username" | "avatarUrl" | "verified"
>;

export interface Follow {
  id: string;
  followerId: string;
  followedId: string;
  createdAt: string;
}

export type UserSearchRequest = Partial<
  Pick<User, "name" | "username" | "email">
>;

export type UserUpdate = { id: string } & Partial<
  Pick<User, "name" | "username" | "avatarUrl" | "bio">
> & {
    passwordOld?: string | undefined;
    passwordNew?: string | undefined;
  };
