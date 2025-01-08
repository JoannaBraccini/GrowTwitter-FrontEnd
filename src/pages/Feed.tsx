import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { TweetBox } from "../components/Feed/TweetBox";
import { Post } from "../components/Feed/Post";
import { FeedStyle } from "../components/Feed/FeedStyle";
import { Button } from "../components/Button";
import { useCallback, useEffect, useState } from "react";
import { getToken, getUser } from "../utils";
import { LoginResponse, Tweet, User } from "../types";
import userPhoto from "../assets/user-photo.svg";
import linkPhoto from "../assets/link-photo.svg";
import {
  RetweetIcon,
  CommentIcon,
  LikeIcon,
  StatisticIcon,
  SaveIcon,
  ShareIcon,
} from "../assets/icons";
import { getTweets } from "../configs/services/tweet.service";
import { Loader } from "../components/Loader";

export function Feed() {
  const token = getToken();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"home" | "following">("home");

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

        <TweetBox>
          <form>
            <div className="tweetbox-input">
              <img src={userPhoto} alt={user?.name} />
              <input type="text" placeholder="O que está acontecendo?" />
            </div>
            <div className="tweetbox-links">
              <img src={linkPhoto} title="Mídia" />

              <Button size="small" className="tweetbox-tweetButton">
                Postar
              </Button>
            </div>
          </form>
        </TweetBox>

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
