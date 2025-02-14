import { useEffect, useState } from "react";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { BackIcon, RetweetIcon } from "../assets/icons";
import { Button } from "../components/Button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showAlert } from "../store/modules/alert/alertSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/modules/auth/loginSlice";
import { Loader } from "../components/Loader";
import { getUserDetails } from "../store/modules/users/usersActions";
import { User } from "../types";
import { setUserDetails } from "../store/modules/users/userDetailsSlice";
import verifiedBlue from "../assets/verified-blue.svg";
import callendar from "../assets/callendar.svg";
import { Tabs } from "../components/Tabs";
import { TabReplies } from "../components/Tabs/TabReplies";
import { TabLikes } from "../components/Tabs/TabLikes";
import { formatDate } from "../utils";

export function Profile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    user: userLogged,
    token,
    loading,
  } = useAppSelector((state) => state.userLogged);
  const { user, loading: loadingDetails } = useAppSelector(
    (state) => state.userDetail
  );
  const [activeTab, setActiveTab] = useState<
    "Posts" | "Respostas" | "Mídia" | "Curtidas"
  >("Posts");

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
      setTimeout(() => {
        dispatch(logout());
        navigate("/sign");
      }, 1000);
    } else if (!user) {
      dispatch(getUserDetails(userLogged.id));
    }
  }, [token, user, userLogged, dispatch, navigate]);

  function handleEdit(user: User) {
    dispatch(setUserDetails(user));
  }

  return (
    <DefaultLayout>
      {loading || loadingDetails ? (
        <Loader />
      ) : (
        <div className="profile-wrapper">
          <BackIcon />
          <div className="profile-header">
            <h1>{user.name}</h1>
            <span>{user.tweets.length}</span>
          </div>
          <div className="profile-cover">
            <img src={userWallpaper} />
            <img src={user.avatarUrl} />
            <Button onClick={() => handleEdit}>Editar perfil</Button>
          </div>
          <div className="profile-details">
            <h2>{user.name}</h2>
            <span>{verifiedBlue} Obter verificação</span>
            <small>@{user.username}</small>
            <textarea>{user.bio}</textarea>
            <small>
              {callendar} Ingressou em {formatDate(user.createdAt, "long")}
            </small>
          </div>
          <div className="profile-follows">
            <p>
              <strong>{user.following.length}</strong> Seguindo{" "}
              {user.followers.length} Seguidores
            </p>
          </div>
          <div className="profile-tweets-section">
            <div className="profile-tweets-header">
              <Tabs
                tabs={["Posts", "Respostas", "Mídia", "Curtidas"]}
                activeTab={activeTab}
                onTabChange={() => setActiveTab}
              />
            </div>
            <div className="profile-tweets-content">
              {activeTab === "Posts" && (
                <div>
                  {user.tweets && user.tweets.length > 0 ? (
                    user.tweets.map((tweet) => (
                      <div key={tweet.id} className="post-tweet">
                        {tweet.retweets.length === 1 && (
                          <span>
                            <RetweetIcon /> 'Você repostou'
                          </span>
                        )}
                        <p>{tweet.content}</p>
                      </div>
                    ))
                  ) : (
                    <p>Este usuário ainda não tweetou.</p>
                  )}
                </div>
              )}
              {activeTab === "Respostas" && <TabReplies />}
              {activeTab === "Curtidas" && <TabLikes />}
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}
