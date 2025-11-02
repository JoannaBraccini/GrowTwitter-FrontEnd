import { Tweet, User } from "../@types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BackIcon, ExploreIcon } from "../assets/Icons";
import { Button } from "../components/Button";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { Dialog } from "../components/Dialog";
import { Post } from "../components/Post";
import { ProfileStyle } from "../components/Profile/ProfileStyle";
import { Tabs } from "../components/Tabs";
import callendar from "../assets/callendar.svg";
import defaultCover from "/logo_growtweet.svg";
import { formatDate } from "../utils/formatDate";
import { getUserDetails } from "../store/modules/users/usersActions";
import { setUserDetails } from "../store/modules/users/userDetailsSlice";
import { showAlert } from "../store/modules/alert/alertSlice";
import { useLogout } from "../hooks/useLogout";
import { useModal } from "../hooks";
import { useVerificationIcon } from "../hooks/useVerifyIcon";

type TabOptions = "Posts" | "Respostas" | "Mídia" | "Curtidas";

export function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { handleLogout } = useLogout();
  const { user: userLogged, token } = useAppSelector(
    (state) => state.userLogged
  );
  const { user } = useAppSelector((state) => state.userDetail);
  const { users } = useAppSelector((state) => state.usersList);
  const { tweets } = useAppSelector((state) => state.tweetsList);
  const { modalOpen, modalContent, openModal, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState<TabOptions>("Posts");

  const { icon, label } = useVerificationIcon(user);

  useEffect(() => {
    if (!userLogged || !token) {
      dispatch(
        showAlert({
          message: "Faça login para acessar este conteúdo",
          type: "error",
        })
      );
      handleLogout();
    } else if (!user || (username && username !== user.username)) {
      const userFound = users.find((user) => user.username === username);
      if (userFound) {
        dispatch(getUserDetails(userFound.id));
      } else {
        dispatch(
          showAlert({
            message: "Erro ao buscar dados do usuário",
            type: "error",
          })
        );
      }
    }
  }, [
    token,
    user,
    userLogged,
    dispatch,
    navigate,
    username,
    users,
    handleLogout,
  ]);

  function handleEdit(user: User) {
    dispatch(setUserDetails(user));
  }

  const getFilteredTweets = () => {
    const userRetweets = tweets?.filter(
      (tweet) =>
        tweet.userId === user?.id &&
        tweet.tweetType !== "REPLY" &&
        tweet.parentId
    );

    switch (activeTab) {
      case "Posts": {
        const userTweets = tweets?.filter(
          (tweet) => tweet.userId === user?.id && tweet.tweetType !== "REPLY"
        );
        console.log("userTweets", userTweets);

        const retweets = userRetweets
          .map((retweet) => {
            const originalTweet = tweets?.find(
              (t) => t.id === retweet.parentId
            );
            return originalTweet
              ? { ...originalTweet, id: retweet.id } // Substituir o id pelo id do retweet
              : undefined;
          })
          .filter((retweet): retweet is Tweet => retweet !== undefined);
        console.log("retweets", retweets);

        return [...userTweets, ...retweets];
      }
      case "Respostas":
        console.log(
          "replies",
          tweets?.filter((tweet) => tweet.tweetType === "REPLY" && tweet.userId)
        );
        return tweets?.filter(
          (tweet) => tweet.tweetType === "REPLY" && tweet.userId === user?.id
        );
      case "Mídia":
        console.log(
          "midia",
          tweets?.filter((tweet) => tweet.imageUrl && tweet.userId === user?.id)
        );

        return tweets?.filter(
          (tweet) => tweet.imageUrl && tweet.userId === user?.id
        );
      case "Curtidas":
        console.log(
          "likes",
          tweets?.filter((tweet) =>
            tweet.likes.some((like) => like.userId === user?.id)
          )
        );

        return tweets?.filter((tweet) =>
          tweet.likes.some((like) => like.userId === user?.id)
        );
      default:
        return [];
    }
  };

  const emptyMessages = {
    Posts: "Este usuário ainda não tweetou.",
    Respostas: "Este usuário ainda não respondeu nenhum tweet.",
    Mídia: "Este usuário ainda não postou nenhuma mídia.",
    Curtidas: "Este usuário ainda não curtiu nenhum tweet.",
  };

  const filteredTweets = getFilteredTweets();

  return (
    <DefaultLayout>
      <ProfileStyle>
        <div className="header">
          <div className="icon">
            <BackIcon />
          </div>
          <div className="data">
            <h2>{user?.name || "Usuário"}</h2>
            <span>{user?.tweets?.length || 0} posts</span>
          </div>
          <div className="search-icon" onClick={() => navigate("/explore")}>
            <ExploreIcon />
          </div>
        </div>
        <div className="banner">
          <div className="cover">
            <img src={defaultCover} />
          </div>
          <div className="avatar">
            <img
              src={user?.avatarUrl || defaultCover}
              alt={user?.name || "Avatar"}
            />
          </div>
          <Button ghost size="small" onClick={() => handleEdit}>
            Editar perfil
          </Button>
        </div>
        <div className="details">
          <div className="user">
            <h2>{user?.name || "Usuário"}</h2>
            <span
              className={`verified ${
                userLogged?.id !== user?.id || label !== "Obter verificação"
                  ? "hidden"
                  : ""
              }`}
            >
              <img src={icon} alt={label} />
              {userLogged?.id === user?.id &&
                label === "Obter verificação" &&
                label}
            </span>
          </div>
          <small>@{user?.username || "username"}</small>
          <div className="bio">{user?.bio || "Sem biografia"}</div>
          <span className="callendar">
            <img src={callendar} />
            Ingressou em{" "}
            {user?.createdAt ? formatDate(user.createdAt, "long") : "N/A"}
          </span>
        </div>
        <div className="follows">
          {user?.following?.length > 0 && (
            <span>
              <strong>{user.following.length}</strong> Seguindo
            </span>
          )}
          {user?.followers?.length > 0 && (
            <span>
              <strong>{user.followers.length}</strong> Seguidores
            </span>
          )}
        </div>
        <div className="tweets-section">
          <Tabs
            tabs={["Posts", "Respostas", "Mídia", "Curtidas"]}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TabOptions)}
            paddingTop="10px"
          />
          <div className="tweets-content">
            {filteredTweets.length > 0 ? (
              filteredTweets.map((tweet) => {
                // Se for uma resposta, busca o tweet original
                const parentTweet =
                  activeTab === "Respostas" && tweet.parentId
                    ? tweets?.find((t) => t.id === tweet.parentId)
                    : null;

                return (
                  <div
                    className={`tweet ${parentTweet ? "reply-thread" : ""}`}
                    key={tweet.id}
                  >
                    {/* Renderiza o tweet original primeiro, se existir */}
                    {parentTweet && (
                      <div className="parent-tweet">
                        <Post
                          tweetUser={
                            users.find((u) => u.id === parentTweet.userId) ||
                            user
                          }
                          isOwnTweet={parentTweet.userId === userLogged?.id}
                          tweet={parentTweet}
                          userLogged={userLogged}
                          openModal={openModal}
                          closeModal={closeModal}
                          className="parent-tweet"
                        />
                      </div>
                    )}
                    {/* Indicador visual de resposta */}
                    {parentTweet && (
                      <div className="reply-indicator">
                        Respondendo a @
                        {users.find((u) => u.id === parentTweet.userId)
                          ?.username || "usuário"}
                      </div>
                    )}
                    {/* Renderiza a resposta */}
                    <Post
                      tweetUser={
                        users.find((u) => u.id === tweet.userId) || user
                      }
                      isOwnTweet={tweet.userId === userLogged?.id}
                      tweet={tweet}
                      userLogged={userLogged}
                      openModal={openModal}
                      closeModal={closeModal}
                    />
                  </div>
                );
              })
            ) : (
              <p className="empty-message">{emptyMessages[activeTab]}</p>
            )}
          </div>
        </div>
      </ProfileStyle>
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
