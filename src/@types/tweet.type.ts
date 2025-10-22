export type TweetType = "TWEET" | "REPLY";

export interface Tweet {
  id: string;
  userId: string;
  tweetType: TweetType;
  parentId?: string;
  content?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt?: string;

  likes: Like[];
  retweets: Retweet[];
  replies: Tweet[];
}

export type Like = {
  id: string;
  tweetId: string;
  userId: string;
  createdAt: string;
};

export type Retweet = Like & {
  comment?: string;
};

// Para tweet e comentário
export type CreateTweetRequest = Pick<
  Tweet,
  "parentId" | "content" | "imageUrl" | "tweetType" | "userId"
>;

export type UpdateTweetRequest = Pick<Tweet, "id" | "content" | "imageUrl">;
export type RetweetRequest = {
  tweetId: string;
  comment?: string;
};

export interface TweetSearchRequest {
  page?: number;
  take?: number;
  search?: string;
}
