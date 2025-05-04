import { Tweet } from "./tweet.type";

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
  likes: Like[];
  retweets: Retweet[];
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

export interface Like {
  id: string;
  tweetId: string;
  userId: string;
  user: {
    name: string;
    username: string;
  };
  createdAt: string;
}

export type Retweet = Like & {
  comment?: string;
};

export type UserSearchRequest = Partial<
  Pick<User, "name" | "username" | "email">
>;

export type UserUpdate = { id: string } & Partial<
  Pick<User, "name" | "username" | "avatarUrl" | "bio">
> & {
    passwordOld?: string | undefined;
    passwordNew?: string | undefined;
  };
