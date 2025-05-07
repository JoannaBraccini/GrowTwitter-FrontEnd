import {
  getTweets,
  retweetTweet,
} from "../../store/modules/tweets/tweetsActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { RetweetRequest } from "../../@types";
import { showAlert } from "../../store/modules/alert/alertSlice";
import { useCallback } from "react";

export function useRetweetTweet(closeModal: () => void) {
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.userLogged.user);

  const handleRetweetTweet = useCallback(
    async (tweetId: string, comment: string = ""): Promise<boolean> => {
      if (!userLogged) {
        dispatch(
          showAlert({
            message: "Faça login para acessar esta função",
            type: "warning",
          })
        );
        return false;
      }

      const tweet: RetweetRequest = {
        tweetId,
        comment,
      };
      const result = await dispatch(retweetTweet(tweet));

      if (retweetTweet.fulfilled.match(result)) {
        dispatch(getTweets({ page: 1, take: 20 }));
        closeModal();
        return true;
      }

      return false;
    },
    [dispatch, userLogged, closeModal]
  );

  return { handleRetweetTweet };
}
