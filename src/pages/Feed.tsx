import { getUserDetails, getUsers } from "../store/modules/users/usersActions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useCreateTweet, useModal } from "../hooks";
import { useEffect, useState } from "react";

import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { Dialog } from "../components/Dialog";
import { FeedStyle } from "../components/Feed/FeedStyle";
import { Post } from "../components/Post";
import { Tabs } from "../components/Tabs";
import { Tweet } from "../@types";
import { TweetBox } from "../components/TweetBox";
import { fetchTweetsAndFeed } from "../store/modules/tweets/tweetsActions";
import { showAlert } from "../store/modules/alert/alertSlice";
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
  const { feed } = useAppSelector((state) => state.tweetsList);
  const { users } = useAppSelector((state) => state.usersList);
  const { modalOpen, modalContent, openModal, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState<TabOptions>("Para você");

  // Buscar tweets
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        if (userLogged && token) {
          await Promise.all([
            dispatch(getUserDetails(userLogged.id)).unwrap(),
            dispatch(getUsers({})).unwrap(),
            dispatch(fetchTweetsAndFeed()).unwrap(),
          ]);
        } else {
          dispatch(
            showAlert({ message: "Você precisa estar logado", type: "error" })
          );
          navigate("/sign");
        }
      } catch (error) {
        console.error("Erro ao buscar tweets:", error);
      }
    };

    fetchTweets();

    return () => {
      // Limpeza de efeitos colaterais, se necessário
    };
  }, [dispatch, navigate, token, userLogged]);

  return (
    <DefaultLayout>
      <FeedStyle>
        <div className="feed-header">
          <h2>Página Inicial</h2>
          <Tabs
            tabs={["Para você", "Seguindo"]}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TabOptions)}
            paddingTop="12px"
          />
        </div>
        <TweetBox
          key="tweet-box"
          tweetUser={user}
          tweet={{} as Tweet}
          mode="create"
          onTweetSubmit={useCreateTweet(closeModal).handleCreateTweet}
        />
        {(() => {
          const tweetsToShow =
            activeTab === "Para você"
              ? tweets.filter((tweet) => tweet.tweetType !== "REPLY")
              : feed.filter(
                  (tweet) =>
                    tweet.userId !== userLogged.id &&
                    tweet.tweetType !== "REPLY"
                );

          if (tweetsToShow.length === 0) {
            return (
              <div
                style={{ padding: "20px", textAlign: "center", color: "#666" }}
              >
                Nenhum tweet encontrado.{" "}
                {activeTab === "Para você"
                  ? "Seja o primeiro a postar!"
                  : "Siga alguém para ver tweets aqui."}
              </div>
            );
          }

          return tweetsToShow.map((tweet) => {
            const tweetUser = users.find((user) => user.id === tweet.userId);

            if (!tweetUser) {
              return null;
            }

            return (
              <Post
                key={tweet.id}
                tweetUser={tweetUser}
                isOwnTweet={tweet.userId === userLogged.id}
                tweet={tweet}
                userLogged={userLogged}
                openModal={openModal}
                closeModal={closeModal}
              />
            );
          });
        })()}
      </FeedStyle>
      <Dialog
        isOpen={modalOpen}
        onClose={closeModal}
        usePortal={true}
        showHeader={true}
      >
        {modalContent}
      </Dialog>
    </DefaultLayout>
  );
}
