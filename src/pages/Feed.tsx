import { FeedStyle } from "../components/Feed/FeedStyle";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { FeedStyle } from "../components/Feed/FeedStyle";
import { TweetBox } from "../components/Feed/TweetBox";
import { Post } from "../components/Feed/Post";

export function Feed() {
  return (
    <DefaultLayout>
      <FeedStyle>
        <div className="feed-header">
<<<<<<< HEAD
          <h2>Home</h2>
        </div>

        <div className="tweetBox">
          <form>
            <div className="tweetbox-input">
              <img src="" alt="" />
              <input type="text" placeholder="What's happening?" />
            </div>
            <button className="tweetBox-tweetButton">Tweet</button>
          </form>
        </div>

        <div className="post">
=======
          <h2>Página Inicial</h2>
        </div>

        <TweetBox>
          <form>
            <div className="tweetbox-input">
              <img src="" alt="" />
              <input type="text" placeholder="O que está acontecendo?" />
            </div>
            <button className="tweetBox-tweetButton">Postar</button>
          </form>
        </TweetBox>

        <Post>
>>>>>>> af620ec312842019eb655cf31455e3355ba4db7a
          <div className="post-avatar">
            <img src="" alt="" />
          </div>

          <div className="post-body">
            <div className="post-header">
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
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <img src="" alt="" />
            <div className="post-footer">
              <span className="icons"> repeat </span>
              <span className="icons"> favorite_border </span>
              <span className="icons"> publish </span>
            </div>
          </div>
<<<<<<< HEAD
        </div>

        <div className="post">
          <div className="post-avatar">
            <img src="" alt="" />
          </div>

          <div className="post-body">
            <div className="post-header">
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
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
            <img src="" alt="" />
            <div className="post-footer">
              <span className="icons"> repeat </span>
              <span className="icons"> favorite_border </span>
              <span className="icons"> publish </span>
            </div>
          </div>
        </div>
=======
        </Post>
>>>>>>> af620ec312842019eb655cf31455e3355ba4db7a
      </FeedStyle>
    </DefaultLayout>
  );
}
