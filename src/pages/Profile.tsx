import { useEffect, useState } from "react";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { BackIcon, RetweetIcon } from "../assets/icons";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showAlert } from "../store/modules/alert/alertSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getUserDetails } from "../store/modules/users/usersActions";
import { User } from "../types";
import { setUserDetails } from "../store/modules/users/userDetailsSlice";
import verifiedBlue from "../assets/verified-blue.svg";
import callendar from "../assets/callendar.svg";
import { formatDate } from "../utils";
import { Post } from "../components/Post";
import { Modal } from "../components/Modal";
import { ProfileStyle } from "../components/Profile/ProfileStyle";
import { useLogout } from "../hooks/useLogout";
import { Tabs } from "../components/Tabs";

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
  const [activeTab, setActiveTab] = useState<TabOptions>("Posts");

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

  const defaultCover =
    "https://media.licdn.com/dms/image/v2/D4E16AQHxso5JBwzWaQ/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1732718244624?e=1745452800&v=beta&t=VU2WC0c6lIcYSA_qjf8zz8jdNKNKRtXPSogylskHlqY";

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
      case "Posts":
        return user.tweets || [];
      case "Respostas":
        return tweets.filter(
          (tweet) =>
            tweet.parentId &&
            tweet.tweetType === "REPLY" &&
            tweet.userId === user.id
        );
      case "Mídia":
        return user.tweets.filter((tweet) => tweet.imageUrl) || [];
      case "Curtidas":
        return tweets.filter(
          (tweet) =>
            tweet.likes && tweet.likes.some((like) => like.userId === user.id)
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
            <h2>{user.name}</h2>
            <span>{user?.tweets?.length} posts</span>
          </div>
        </div>
        <div className="banner">
          <div className="cover">
            <img src={defaultCover} />
          </div>
          <div className="avatar">
            <img src={user.avatarUrl} alt={user.name} />
          </div>
          <Button ghost size="small" onClick={() => handleEdit}>
            Editar perfil
          </Button>
        </div>
        <div className="details">
          <div className="user">
            <h2>{user.name}</h2>
            <span className="verified">
              <img src={verifiedBlue} alt="Selo verificado" /> Obter verificação
            </span>
          </div>
          <small>@{user.username}</small>
          <div className="bio">{user.bio}</div>
          <span className="callendar">
            <img src={callendar} />
            Ingressou em {formatDate(user.createdAt, "long")}
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
          ></Tabs>
          <div className="tweets-content">
            {filteredTweets.length > 0 ? (
              filteredTweets.map((tweet) => (
                <div className="tweet" key={tweet.id}>
                  {activeTab === "Posts" && tweet.retweets?.length === 1 && (
                    <span className="retweet">
                      <RetweetIcon /> 'Você repostou'
                    </span>
                  )}
                  <Post
                    tweetUser={user}
                    isOwnTweet={true}
                    tweet={tweet}
                    userLogged={userLogged}
                    openModal={openModal}
                  />
                </div>
              ))
            ) : (
              <p className="empty-message">{emptyMessages[activeTab]}</p>
            )}
          </div>
        </div>
      </ProfileStyle>
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
