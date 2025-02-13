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

  likes: Actions[];
  retweets: Actions[];
  replies: Tweet[];
}

export interface Actions {
  id: string;
  userId: string;
  user: {
    name: string;
    username: string;
  };
}

// Para tweet e comentário
export type CreateTweetRequest = Pick<Tweet, "parentId"> & {
  userId: string;
  type: TweetType;
  content: string;
};

export type UpdateTweetRequest = Pick<Tweet, "id" | "userId" | "content">;
export type ActionsRequest = Pick<Tweet, "id" | "userId">;

export interface TweetSearchRequest {
  page?: number;
  take?: number;
  search?: string;
}
