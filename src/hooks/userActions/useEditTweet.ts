import {
  getTweets,
  updateTweet,
} from "../../store/modules/tweets/tweetsActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { UpdateTweetRequest } from "../../@types";
import { useCallback } from "react";
import { validateTweet } from "../../utils/validateTweet";

export function useUpdateTweet(closeModal: () => void) {
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.userLogged.user);

  const handleUpdateTweet = useCallback(
    async (id: string, content?: string, imageUrl?: string) => {
      if (!validateTweet(dispatch, userLogged, content, imageUrl)) {
        return;
      }

      const tweet: UpdateTweetRequest = {
        id,
        content,
        imageUrl,
      };
      const result = await dispatch(updateTweet(tweet));

      if (updateTweet.fulfilled.match(result)) {
        dispatch(getTweets({ page: 1, take: 20 }));
        closeModal();
      }
    },
    [dispatch, userLogged, closeModal]
  );

  return { handleUpdateTweet };
}
