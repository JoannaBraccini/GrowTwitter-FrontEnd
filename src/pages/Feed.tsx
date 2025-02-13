import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { TweetBox } from "../components/TweetBox";
import { Post } from "../components/Feed/Post";
import { FeedStyle } from "../components/Feed/FeedStyle";
import { useCallback, useEffect, useState } from "react";
import { getUserLogged } from "../utils";
import { CreateTweetRequest, Toast, Tweet, User } from "../types";
import userPhoto from "../assets/user-photo.svg";
import {
  RetweetIcon,
  CommentIcon,
  LikeIcon,
  StatisticIcon,
  SaveIcon,
  ShareIcon,
} from "../assets/icons";
import { getTweets, postTweet } from "../configs/services/tweet.service";
import { Loader } from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showAlert } from "../store/modules/alert/alertSlice";

export function Feed() {
  const dispatch = useAppDispatch();
  const { token, user, loading } = useAppSelector((state) => state.userLogged);
  const [activeTab, setActiveTab] = useState<"home" | "following">("home");
  const [search, setSearch] = useState<string>("");

  // Buscar tweets
  useEffect(() => {
    if (user && token) {
      dispatch(getTweets());
    }
  }, []);

  const createTweet = async (tweet: string) => {
    if (!user) return;

    const newTweet: CreateTweetRequest = {
      userId: user.id,
      content: tweet,
      type: "TWEET",
    };

    try {
      setLoading(true);
      await postTweet(token, newTweet);
      showToast("success", "Tweet criado com sucesso!");
    } catch {
      showToast("error", "Erro ao criar tweet.");
    } finally {
      setLoading(false);
    }
  };

  // Buscar os usuários seguidos
  const fetchFollowing = useCallback(async () => {
    setLoading(true);
    const response = await getFollowing(token);
    setLoading(false);

    if (!response.ok) {
      alert(response.message);
      return;
    }
    setFollowing(response.data || []);
  }, [token]);

  const isImageUrl = (url: string) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  };

  // Filtrar tweets dependendo da aba
  const filteredTweets =
    activeTab === "home"
      ? tweets
      : tweets.filter((tweet) =>
          following.some((follow) => follow.id === tweet.userId)
        );

  return (
    <DefaultLayout>
      <FeedStyle>
        <Loader isLoading={loading} />
        {toastProps && (
          <ToastResponse
            type={toastProps.type}
            message={toastProps.message}
            onClose={handleCloseToast}
          />
        )}
        <div className="feed-header">
          <div className="tabs">
            <button
              className={activeTab === "home" ? "active" : ""}
              onClick={() => setActiveTab("home")}
            >
              Página Inicial
            </button>
            <button
              className={activeTab === "following" ? "active" : ""}
              onClick={() => setActiveTab("following")}
            >
              Seguindo
            </button>
          </div>
        </div>

        <TweetBox
          key="tweet-box"
          userPhoto={userPhoto}
          userName={user?.name}
          onTweetSubmit={createTweet}
        />

        {filteredTweets.map((tweet) => (
          <Post key={tweet.id}>
            <div className="post-avatar">
              <img src={userPhoto} alt={tweet.user?.name} />
            </div>

            <div className="post-body">
              <div className="post-header">
                {tweet.retweets && (
                  <span>
                    <RetweetIcon />
                    {tweet.retweets.length === 1
                      ? `${tweet.user?.name} repostou`
                      : `${tweet.retweetsCount} repostaram`}
                  </span>
                )}

                <div className="post-headerText">
                  <h3>
                    {tweet.user?.name}
                    <span className="post-headerSpecial">
                      <span className="icons post-badge"> verified </span>@
                      {tweet.user?.username}
                    </span>
                  </h3>
                </div>
                <div className="post-content">
                  {isImageUrl(tweet.content) ? (
                    <img src={tweet.content} alt="Tweet content" />
                  ) : (
                    <p>{tweet.content}</p>
                  )}
                </div>
              </div>
              <div className="post-footer">
                <div className="post-icons">
                  <span title="Responder">
                    <CommentIcon /> {tweet.repliesCount}
                  </span>
                  <span title="Repostar">
                    <RetweetIcon /> {tweet.retweetsCount}
                  </span>
                  <span title="Curtir">
                    <LikeIcon /> {tweet.likesCount}
                  </span>
                  <span title="Ver">
                    <StatisticIcon />
                    {/* {tweet.views && tweet.viewsCount} */}
                  </span>
                  <div className="post-actions">
                    <span title="Salvar Tweet">
                      <SaveIcon />
                    </span>
                    <span title="Compartilhar">
                      <ShareIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Post>
        ))}
      </FeedStyle>
    </DefaultLayout>
  );
}
