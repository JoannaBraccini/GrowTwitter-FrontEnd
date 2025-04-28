import { useAppDispatch, useAppSelector } from "../store/hooks";

import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { Modal } from "../components/Modal";
import { Post } from "../components/Post";
import { User } from "../@types";
import { getTweetDetails } from "../store/modules/tweets/tweetsActions";
import { showAlert } from "../store/modules/alert/alertSlice";
import { useEffect } from "react";
import { useModal } from "../hooks";
import { useParams } from "react-router-dom";

export const TweetPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { tweet } = useAppSelector((state) => state.tweetDetail);
  const { users } = useAppSelector((state) => state.usersList);
  const { user } = useAppSelector((state) => state.userLogged);
  const { modalOpen, modalContent, openModal, closeModal } = useModal();

  useEffect(() => {
    if (id) {
      dispatch(getTweetDetails(id));
    }
  }, [dispatch, id]);

  const tweetUser = users.find((user) => user.id === tweet.userId);

  useEffect(() => {
    if (!tweetUser) {
      dispatch(
        showAlert({ message: "Erro ao buscar dados do tweet", type: "error" })
      );
    }
  }, [tweetUser, dispatch]);

  return (
    <DefaultLayout>
      <h1 style={{ marginLeft: 50 }}>Post</h1>
      <Post
        key={tweet.id}
        isOwnTweet={tweet.userId === user.id}
        openModal={openModal}
        tweet={tweet}
        tweetUser={tweetUser || ({} as User)}
        userLogged={user}
        closeModal={closeModal}
      />
      {tweet.replies &&
        tweet.replies.length > 0 &&
        tweet.replies.map((reply) => {
          const replyUser = users.find((user) => user.id === reply.userId);
          return (
            <Post
              key={reply.id}
              isOwnTweet={reply.userId === user.id}
              openModal={openModal}
              tweet={reply}
              tweetUser={replyUser || ({} as User)}
              userLogged={user}
              closeModal={closeModal}
            />
          );
        })}

      <Modal isOpen={modalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </DefaultLayout>
  );
};
