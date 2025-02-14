import { Tweet } from "./tweet.type";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followers: Follow[];
  following: Follow[];
  tweets: Tweet[];
}

export type UserBase = Pick<User, "id" | "name" | "username" | "avatarUrl">;
export interface Follow {
  id: string;
  followerId: string;
  followedId: string;
  createdAt: Date;
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
