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
  likes?: { id: string; userId: string }[] | number;
  retweets?: { id: string; userId: string }[] | number;
  replies?: Tweet[] | number;
}

export type CreateTweetRequest = Partial<
  Pick<Tweet, "parentId"> & { userId: string; type: TweetType; content: string }
>;

export type UpdateTweetRequest = Pick<Tweet, "userId" | "content">;
