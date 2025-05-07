import { getTweets, updateTweet } from "../store/modules/tweets/tweetsActions";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { UpdateTweetRequest } from "../@types";
import { showAlert } from "../store/modules/alert/alertSlice";
import { useCallback } from "react";

export function useUpdateTweet(closeModal: () => void) {
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.userLogged.user);

  const handleUpdateTweet = useCallback(
    async (id: string, content?: string, imageUrl?: string) => {
      if (!userLogged) {
        dispatch(
          showAlert({
            message: "Faça login para acessar esta função",
            type: "warning",
          })
        );
        return;
      }

      if ((!content || !content.trim()) && (!imageUrl || !imageUrl.trim())) {
        dispatch(
          showAlert({
            message: "Seu tweet não pode estar vazio.",
            type: "warning",
          })
        );
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
