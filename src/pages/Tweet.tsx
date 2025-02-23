import { Post } from "../components/Post";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showAlert } from "../store/modules/alert/alertSlice";
import { User } from "../types";
import { Modal } from "../components/Modal";
import { useModal } from "../hooks";

export const TweetPage = () => {
  const dispatch = useAppDispatch();
  const { tweet } = useAppSelector((state) => state.tweetDetail);
  const { users } = useAppSelector((state) => state.usersList);
  const { user } = useAppSelector((state) => state.userLogged);
  const { modalOpen, modalContent, openModal, closeModal } = useModal();

  const tweetUser = () => {
    const user = users.find((user) => user.id === tweet.userId);
    if (!user) {
      dispatch(
        showAlert({ message: "Erro ao buscar dados do tweet", type: "error" })
      );
      return {} as User;
    }
    return user;
  };
  return (
    <DefaultLayout>
      <Post
        key={tweet.id}
        isOwnTweet={tweet.userId === user.id}
        openModal={openModal}
        tweet={tweet}
        tweetUser={tweetUser()}
        userLogged={user}
      />
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </DefaultLayout>
  );
};
