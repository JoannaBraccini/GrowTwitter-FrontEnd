export type TweetType = "TWEET" | "REPLY";

export interface Tweet {
  id: string;
  userId: string;
  tweetType: TweetType;
  parentId?: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;

  likeCount?: number;
  replyCount?: number;
  retweetCount?: number;

  likes: Like[];
  retweets: Retweet[];
  replies: Tweet[];
}

export type Like = Pick<Tweet, "id" | "userId" | "createdAt"> & {
  tweetId: string;
  likeCount: number;
};

export type Retweet = Omit<Like, "likeCount"> & {
  retweetCount: number;
  comment?: string;
};

// Para tweet e comentário
export type CreateTweetRequest = Pick<Tweet, "parentId"> & {
  userId: string;
  type: TweetType;
  content: string;
};

export type UpdateTweetRequest = Pick<Tweet, "id" | "userId" | "content">;
export type RetweetRequest = Pick<Retweet, "id" | "comment">;

export interface TweetSearchRequest {
  page?: number;
  take?: number;
  search?: string;
}
