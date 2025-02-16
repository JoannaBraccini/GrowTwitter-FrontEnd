import { useCallback } from "react";
import { showAlert } from "../store/modules/alert/alertSlice";
import { CreateTweetRequest } from "../types";
import { createTweet } from "../store/modules/tweets/tweetsActions";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function useCreateTweet() {
  const dispatch = useAppDispatch();
  const userLogged = useAppSelector((state) => state.userLogged.user);

  const handleCreateTweet = useCallback(
    (content: string, imageUrl: string, parentId?: string) => {
      if (!userLogged) {
        dispatch(
          showAlert({
            message: "Faça login para acessar esta função",
            type: "warning",
          })
        );
        return;
      }

      if (!content.trim() && !imageUrl.trim()) {
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
      dispatch(createTweet(newTweet));
    },
    [dispatch, userLogged]
  );

  return { handleCreateTweet };
}
