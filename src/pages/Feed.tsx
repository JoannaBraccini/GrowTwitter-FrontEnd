import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { TweetBox } from "../components/TweetBox";
import { Post } from "../components/Feed/Post";
import { FeedStyle } from "../components/Feed/FeedStyle";
import { useCallback, useEffect, useState } from "react";
import { getToken, getUser } from "../utils";
import { CreateTweetRequest, LoginResponse, Tweet, User } from "../types";
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

export function Feed() {
  const token = getToken();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"home" | "following">("home");

  function showToast(type: "success" | "error", message: string) {
    setToastProps({ type, message, duration: 3000 });
  }

  const handleCloseToast = () => {
    setToastProps(undefined);
  };

  const createTweet = async (tweet: string) => {
    if (!user) return;

    const newTweet: CreateTweetRequest = {
      userId: user.userId,
      content: tweet,
      type: "TWEET",
    };

    setLoading(true);
    const response = await postTweet(token, newTweet);
    setLoading(false);

    showToast(response.ok ? "success" : "error", response.message);
    if (response.ok)
      setTimeout(() => {
        e.currentTarget.reset();
        toggle(true);
      }, 500);
  };

  // Buscar tweets
  const fetchTweets = useCallback(async () => {
    setLoading(true);
    const response = await getTweets(token);
    setLoading(false);

    if (!response.ok) {
      alert(response.message);
      return;
    }
    setTweets(response.data || []);
  }, [token]);

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

  // Atualizar o feed
  useEffect(() => {
    setUser(getUser());
    fetchTweets();
    fetchFollowing();
  }, [fetchTweets, fetchFollowing]);

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
              <img src={userPhoto} alt={tweet.userId} />
            </div>

            <div className="post-body">
              <div className="post-header">
                {tweet.retweets && (
                  <span>
                    <RetweetIcon />
                    {tweet.retweets.length === 1
                      ? `${tweet.userId} repostou`
                      : `${tweet.userId} e mais ${
                          tweet.retweets.length - 1
                        } repostaram`}
                  </span>
                )}

                <div className="post-headerText">
                  <h3>
                    {tweet.userId}
                    <span className="post-headerSpecial">
                      <span className="icons post-badge"> verified </span>@
                      {tweet.userId}
                    </span>
                  </h3>
                </div>
                <div className="post-content">
                  <p>{tweet.content}</p>
                  {/* {tweet.content.image && <img src="" alt="" />} */}
                </div>
              </div>
              <div className="post-footer">
                <div className="post-icons">
                  <span title="Responder">
                    <CommentIcon /> {tweet.replies && tweet.replies?.length}
                  </span>
                  <span title="Repostar">
                    <RetweetIcon /> {tweet.retweets && tweet.retweets?.length}
                  </span>
                  <span title="Curtir">
                    <LikeIcon /> {tweet.likes && tweet.likes?.length}
                  </span>
                  <span title="Ver">
                    <StatisticIcon />
                    {/* {tweet.views && tweet.views?.length} */}
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
      <Loader isLoading={loading} />
    </DefaultLayout>
  );
}
