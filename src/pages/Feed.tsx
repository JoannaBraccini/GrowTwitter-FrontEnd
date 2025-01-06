import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { TweetBox } from "../components/Feed/TweetBox";
import { Post } from "../components/Feed/Post";
import { FeedStyle } from "../components/Feed/FeedStyle";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { getUser } from "../utils";
import { LoginResponse, Tweet } from "../types";
import userPhoto from "../assets/user-photo.svg";
import linkPhoto from "../assets/link-photo.svg";
import { RetweetIcon } from "../assets/icons/RetweetIcon";
import { LikeIcon } from "../assets/icons/LikeIcon";
import { CommentIcon } from "../assets/icons/CommentIcon";

export function Feed() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <DefaultLayout>
      <FeedStyle>
        <div className="feed-header">
          <h2>Página Inicial</h2>
        </div>

        <TweetBox>
          <form>
            <div className="tweetbox-input">
              <img src={userPhoto} alt={user?.name} />
              <input type="text" placeholder="O que está acontecendo?" />
            </div>
            <div className="tweetbox-links">
              <img src={linkPhoto} />

              <Button size="small" className="tweetbox-tweetButton">
                Postar
              </Button>
            </div>
          </form>
        </TweetBox>

        {tweets.map((tweet) => (
          <Post key={tweet.id}>
            <div className="post-avatar">
              <img src={userPhoto} alt={user?.name} />
            </div>

            <div className="post-body">
              <div className="post-header">
                {tweet.retweets && tweet.retweets.length > 0 && (
                  <span>
                    <RetweetIcon />
                    {tweet.retweets.length === 1
                      ? `${user?.name} repostou`
                      : `${user?.name} e mais ${
                          tweet.retweets.length - 1
                        } repostaram`}
                  </span>
                )}

                <div className="post-headerText">
                  <h3>
                    Somanath Goudar
                    <span className="post-headerSpecial">
                      <span className="icons post-badge"> verified </span>
                      @somanathg
                    </span>
                  </h3>
                </div>
                <div className="post-headerDescription">
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
              <img src="" alt="" />
              <div className="post-footer">
                <div className="post-icons">
                  <RetweetIcon />
                  <LikeIcon />
                  <CommentIcon />
                </div>
              </div>
            </div>
          </Post>
        ))}
      </FeedStyle>
    </DefaultLayout>
  );
}
