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

  likeCount?: number;
  replyCount?: number;
  retweetCount?: number;

  likes: Like[];
  retweets: Retweet[];
  replies: Tweet[];
}

export type Like = Pick<Tweet, "id" | "userId" | "createdAt" | "likeCount"> & {
  tweetId: string;
};

export type Retweet = Omit<Like, "likeCount"> & {
  retweetCount?: number;
  comment?: string;
};

// Para tweet e comentário
export type CreateTweetRequest = Pick<
  Tweet,
  "parentId" | "content" | "imageUrl" | "userId" | "tweetType"
>;

export type UpdateTweetRequest = Pick<
  Tweet,
  "id" | "userId" | "content" | "imageUrl"
>;
export type RetweetRequest = Pick<Retweet, "tweetId" | "comment">;

export interface TweetSearchRequest {
  page?: number;
  take?: number;
  search?: string;
}
