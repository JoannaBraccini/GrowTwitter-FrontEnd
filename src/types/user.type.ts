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

export type UserQueryFilter = Partial<
  Pick<User, "name" | "username" | "email">
>;
