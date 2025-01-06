type TweetType = {
  TWEET: string;
  REPLY: string;
};

export interface Tweet {
  id: string;
  userId: string;
  type: TweetType;
  parentId?: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
  likes?: { id: string; userId: string }[];
  retweets?: { id: string; userId: string }[];
  replies?: Tweet[];
}

// Para tweet e comentário
export type CreateTweetRequest = Pick<Tweet, "parentId"> & {
  userId: string;
  type: TweetType;
  content: string;
};

export type UpdateTweetRequest = Pick<Tweet, "id" | "userId" | "content">;
export type DeleteTweetRequest = Pick<Tweet, "id">;
export type RetweetRequest = Pick<Tweet, "id" | "userId">;
export type LikeRequest = Pick<Tweet, "id" | "userId">;

export interface TweetSearchRequest {
  page?: number;
  take?: number;
  search?: string;
}
