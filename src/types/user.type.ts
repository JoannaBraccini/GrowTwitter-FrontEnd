import { Tweet } from "./tweet.type";

export interface User {
  id: string;
  name: string;
  email?: string;
  username: string;
  followers?: UserBase[];
  following?: UserBase[];
  tweets?: Tweet[];
}

export type UserBase = Partial<
  Pick<User, "followers" | "following"> & {
    id: string;
    name: string;
    username: string;
  }
>;

export type UserSearchRequest = Partial<
  Pick<User, "id" | "name" | "username" | "email">
>;
