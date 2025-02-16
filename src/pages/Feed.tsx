import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { TweetBox } from "../components/TweetBox";
import { FeedStyle } from "../components/Feed/FeedStyle";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getTweets } from "../store/modules/tweets/tweetsActions";
import { getUserDetails, getUsers } from "../store/modules/users/usersActions";
import { Modal } from "../components/Modal";
import { Tabs } from "../components/Tabs";
import { useCreateTweet } from "../hooks/useCreateTweet";
import { Post } from "../components/Post";

export function Feed() {
  const dispatch = useAppDispatch();
  const {
    token,
    user: userLogged,
    loading,
  } = useAppSelector((state) => state.userLogged);
  const { user } = useAppSelector((state) => state.userDetail);
  const { tweets, loading: loadingTweets } = useAppSelector(
    (state) => state.tweetsList
  );
  const { users } = useAppSelector((state) => state.usersList);
  const [activeTab, setActiveTab] = useState<"Para você" | "Seguindo">(
    "Para você"
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  // Buscar tweets
  useEffect(() => {
    if (userLogged && token) {
      if (!user || user.id !== userLogged.id) {
        dispatch(getUserDetails(userLogged.id));
      }
      dispatch(getTweets({ page: 1, take: 20 }));
      dispatch(getUsers({}));
    }
  }, [dispatch, token, user, userLogged]);

  // Filtrar tweets dependendo da aba
  const filteredTweets =
    activeTab === "Para você"
      ? tweets
      : tweets.filter((tweet) =>
          user?.following?.some(
            (follow) =>
              follow.id === tweet.userId || tweet.userId === userLogged.id
          )
        );

  return (
    <DefaultLayout>
      {loading || loadingTweets ? (
        <Loader />
      ) : (
        <FeedStyle>
          <div className="feed-header">
            <Tabs
              tabs={["Para Você", "Seguindo"]}
              activeTab={activeTab}
              onTabChange={() => setActiveTab}
            />
          </div>
          <TweetBox
            key="tweet-box"
            userPhoto={user.avatarUrl}
            userName={user.name}
            initialContent=""
            onTweetSubmit={useCreateTweet}
          />
          {filteredTweets?.map((tweet) => {
            const tweetUser = users.find((user) => user.id === tweet.userId);
            const isOwnTweet = tweet.userId === userLogged.id;

            return (
              <Post
                key={tweet.id}
                tweetUser={tweetUser}
                isOwnTweet={isOwnTweet}
                tweet={tweet}
                userLogged={userLogged}
                openModal={openModal}
              />
            );
          })}
        </FeedStyle>
      )}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </DefaultLayout>
  );
}
