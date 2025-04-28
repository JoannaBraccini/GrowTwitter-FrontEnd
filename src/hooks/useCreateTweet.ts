import { useCallback } from "react";
import { showAlert } from "../store/modules/alert/alertSlice";
import { CreateTweetRequest } from "../@types";
import { createTweet, getTweets } from "../store/modules/tweets/tweetsActions";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function useCreateTweet(closeModal: () => void) {
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.userLogged.user);

  const handleCreateTweet = useCallback(
    async (content?: string, imageUrl?: string, parentId?: string) => {
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
