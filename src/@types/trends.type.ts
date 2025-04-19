import { Tweet } from "./tweet.type";

export interface Trend {
  category: string;
  topic: string;
  posts: Tweet[];
}
