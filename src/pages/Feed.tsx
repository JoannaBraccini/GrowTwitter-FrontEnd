import { getUserDetails, getUsers } from "../store/modules/users/usersActions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";

import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { FeedStyle } from "../components/Feed/FeedStyle";
import { Modal } from "../components/Modal";
import { Post } from "../components/Post";
import { Tabs } from "../components/Tabs";
import { Tweet } from "../@types";
import { TweetBox } from "../components/TweetBox";
import { getTweets } from "../store/modules/tweets/tweetsActions";
import { useCreateTweet } from "../hooks/useCreateTweet";
import { useModal } from "../hooks";
import { useNavigate } from "react-router-dom";

type TabOptions = "Para você" | "Seguindo";
export function Feed() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, user: userLogged } = useAppSelector(
    (state) => state.userLogged
  );
  const { user } = useAppSelector((state) => state.userDetail);
  const { tweets } = useAppSelector((state) => state.tweetsList);
  const { users } = useAppSelector((state) => state.usersList);
  const { modalOpen, modalContent, openModal, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState<TabOptions>("Para você");

  // Buscar tweets
  useEffect(() => {
    if (userLogged && token) {
      if (!user || user.id !== userLogged.id) {
        dispatch(getUserDetails(userLogged.id));
      }
      if (!users) dispatch(getUsers({}));
      if (!tweets) dispatch(getTweets({ page: 1, take: 20 }));
    } else {
      navigate("/sign");
    }
  }, [dispatch, navigate, token, tweets, user, userLogged, users]);

  // Filtrar tweets dependendo da aba
  const filteredTweets =
    activeTab === "Para você"
      ? tweets.filter((tweet) => tweet.tweetType !== "REPLY")
      : tweets
          .filter((tweet) => tweet.tweetType !== "REPLY")
          .filter((tweet) =>
            user?.following?.some(
              (follow) =>
                follow.id === tweet.userId || tweet.userId === userLogged.id
            )
          );

  return (
    <DefaultLayout>
      <FeedStyle>
        <div className="feed-header">
          <Tabs
            tabs={["Para você", "Seguindo"]}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TabOptions)}
          />
        </div>
        <TweetBox
          key="tweet-box"
          tweetUser={user}
          tweet={{} as Tweet}
          mode="create"
          onTweetSubmit={useCreateTweet(closeModal).handleCreateTweet}
        />
        <span className="divider" />
        {filteredTweets?.map((tweet) => {
          const tweetUser = users.find((user) => user.id === tweet.userId);
          const isOwnTweet = tweet.userId === userLogged.id;
          if (!tweetUser) return null; // Se não encontrar o usuário, não renderiza o tweet

          return (
            <Post
              key={tweet.id}
              tweetUser={tweetUser}
              isOwnTweet={isOwnTweet}
              tweet={tweet}
              userLogged={userLogged}
              openModal={openModal}
              closeModal={closeModal}
            />
          );
        })}
      </FeedStyle>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </DefaultLayout>
  );
}
