import { BackIcon, RetweetIcon } from "../assets/Icons";
import { Retweet, Tweet, User } from "../@types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { Post } from "../components/Post";
import { ProfileStyle } from "../components/Profile/ProfileStyle";
import { Tabs } from "../components/Tabs";
import { Dialog } from "../components/Dialog";
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

// Type guard para verificar se o objeto é do tipo Tweet
function isTweet(obj: Tweet | Retweet): obj is Tweet {
  return "tweetType" in obj; // Verifica se a propriedade tweetType existe
}

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
    switch (activeTab) {
      case "Posts": {
        const userTweets = tweets?.filter(
          (tweet) => tweet.userId === user.id && tweet.tweetType !== "REPLY"
        );
        return [...userTweets, ...user.retweets];
      }
      case "Respostas":
        return tweets?.filter(
          (tweet) => tweet.tweetType === "REPLY" && tweet.userId === user.id
        );
      case "Mídia":
        return tweets?.filter((tweet) => tweet.imageUrl);
      case "Curtidas":
        return tweets?.filter((tweet) =>
          tweet.likes.some((like) => like.userId === user.id)
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
                if (isTweet(tweet)) {
                  // Caso seja um Tweet
                  return (
                    <div className="tweet" key={tweet.id}>
                      {activeTab === "Posts" && (
                        <Post
                          tweetUser={user}
                          isOwnTweet={true}
                          tweet={tweet}
                          userLogged={userLogged}
                          openModal={openModal}
                          closeModal={closeModal}
                        />
                      )}
                    </div>
                  );
                } else {
                  // Caso seja um Retweet
                  const parentTweet = tweets.find(
                    (t) => t.id === tweet.tweetId
                  ); // Busca o tweet pai
                  return (
                    <div className="tweet" key={tweet.id}>
                      {activeTab === "Posts" && (
                        <>
                          <span className="retweet">
                            <RetweetIcon /> 'Você repostou'
                          </span>
                          {parentTweet && (
                            <Post
                              tweetUser={user}
                              isOwnTweet={true}
                              tweet={parentTweet} // Passa o tweet pai
                              userLogged={userLogged}
                              openModal={openModal}
                              closeModal={closeModal}
                            />
                          )}
                        </>
                      )}
                    </div>
                  );
                }
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
