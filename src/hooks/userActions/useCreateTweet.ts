import {
  createTweet,
  getTweets,
} from "../../store/modules/tweets/tweetsActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { CreateTweetRequest } from "../../@types";
import { useCallback } from "react";
import { validateTweet } from "../../utils/validateTweet";

export function useCreateTweet(closeModal: () => void) {
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.userLogged.user);

  const handleCreateTweet = useCallback(
    async (content?: string, imageUrl?: string, parentId?: string) => {
      if (!validateTweet(dispatch, userLogged, content, imageUrl)) {
        return;
      }

      const newTweet: CreateTweetRequest = {
        userId: userLogged.id,
        parentId,
        content,
        imageUrl,
        tweetType: parentId ? "REPLY" : "TWEET",
      };
      const result = await dispatch(createTweet(newTweet));

      if (createTweet.fulfilled.match(result)) {
        dispatch(getTweets({ page: 1, take: 20 }));
        closeModal();
      }
    },
    [dispatch, userLogged, closeModal]
  );

  return { handleCreateTweet };
}
