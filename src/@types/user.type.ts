import {
  Tweet,
  Like as TweetLike,
  Retweet as TweetRetweet,
} from "./tweet.type";

export type Verified = "NONE" | "BLUE" | "GOLD";

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  verified: Verified;
  createdAt: string;
  updatedAt: string;
  followers: Follow[];
  following: Follow[];
  tweets: Tweet[];
  likes: TweetLike[];
  retweets: TweetRetweet[];
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
