import { FeedStyle } from "../components/Feed/FeedStyle";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";

export function Feed() {
  return (
    <DefaultLayout>
      <FeedStyle>
        <div className="feed-header">
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
      </FeedStyle>
    </DefaultLayout>
  );
}
