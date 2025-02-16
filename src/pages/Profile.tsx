import { useEffect, useState } from "react";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { BackIcon, RetweetIcon } from "../assets/icons";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showAlert } from "../store/modules/alert/alertSlice";
import { useNavigate, useParams } from "react-router-dom";
import { logout } from "../store/modules/auth/loginSlice";
import { getUserDetails } from "../store/modules/users/usersActions";
import { User } from "../types";
import { setUserDetails } from "../store/modules/users/userDetailsSlice";
import verifiedBlue from "../assets/verified-blue.svg";
import callendar from "../assets/callendar.svg";
import { Tabs } from "../components/Tabs";
import { formatDate } from "../utils";
import { Post } from "../components/Post";
import { Modal } from "../components/Modal";
import { Avatar } from "../components/Avatar";
import { ProfileStyle } from "../components/Profile/ProfileStyle";
import { useProfileNavigation } from "../hooks/useProfileNavigation";

type TabOptions = "Posts" | "Respostas" | "Mídia" | "Curtidas";

export function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user: userLogged, token } = useAppSelector(
    (state) => state.userLogged
  );
  const { user } = useAppSelector((state) => state.userDetail);
  const { handleProfileClick } = useProfileNavigation();
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

  const userWallpaper =
    "https://th.bing.com/th/id/OIP.hg1BiocPGLHkoo5lOha7zwHaBK?rs=1&pid=ImgDetMain";

  useEffect(() => {
    if (!userLogged || !token) {
      dispatch(
        showAlert({
          message: "Faça login para acessar este conteúdo",
          type: "error",
        })
      );
      dispatch(logout());
      navigate("/sign");
    } else if (!user) {
      dispatch(getUserDetails(userLogged.id));
    }
  }, [token, user, userLogged, dispatch, navigate]);

  useEffect(() => {
    if (username && username !== user.username) {
      dispatch(getUserDetails(userLogged.id));
    }
  }, [dispatch, user.username, userLogged.id, username]);
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
        <BackIcon />
        <div className="header">
          <h2>{user.name}</h2>
          <span>{user?.tweets?.length} posts</span>
        </div>
        <div className="banner">
          <div className="cover">
            <img src={userWallpaper} />
          </div>
          <Avatar>
            <img
              src={user.avatarUrl}
              alt={user.name}
              onClick={() => handleProfileClick(user.id)}
            />
          </Avatar>
          <Button onClick={() => handleEdit}>Editar perfil</Button>
        </div>
        <div className="details">
          <h2>{user.name}</h2>
          <span className="verified">
            <img src={verifiedBlue} alt="Selo verificado" /> Obter verificação
          </span>
          <small>@{user.username}</small>
          <textarea>{user.bio}</textarea>
          <p>
            {callendar} Ingressou em {formatDate(user.createdAt, "long")}
          </p>
        </div>
        <div className="follows">
          <p>
            <strong>{user?.following?.length}</strong> Seguindo{" "}
            {user?.followers?.length} Seguidores
          </p>
        </div>
        <div className="tweets-section">
          <div className="tabs">
            <Tabs
              tabs={["Posts", "Respostas", "Mídia", "Curtidas"] as TabOptions[]}
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab as TabOptions)}
            />
          </div>
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
