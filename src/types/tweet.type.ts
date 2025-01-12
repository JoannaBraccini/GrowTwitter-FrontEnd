export type TweetType = "TWEET" | "REPLY";

export interface Tweet {
  id: string;
  userId: string;
  user?: {
    name: string;
    username: string;
  };
  type: TweetType;
  parentId?: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;

  likesCount?: number;
  retweetsCount?: number;
  repliesCount?: number;

  likes?: Actions[];
  retweets?: Actions[];
  replies?: Tweet[];
}

interface Actions {
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
export type DeleteTweetRequest = Pick<Tweet, "id">;
export type RetweetRequest = Pick<Tweet, "id" | "userId">;
export type LikeRequest = Pick<Tweet, "id" | "userId">;

export interface TweetSearchRequest {
  page?: number;
  take?: number;
  search?: string;
}
