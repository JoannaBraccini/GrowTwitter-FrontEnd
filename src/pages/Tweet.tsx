import {
  createTweet,
  getTweetDetails,
} from "../store/modules/tweets/tweetsActions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate, useParams } from "react-router-dom";

import { Avatar } from "../components/Avatar";
import { BackIcon } from "../assets/Icons";
import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { Dialog } from "../components/Dialog";
import { Post } from "../components/Post";
import { TweetBox } from "../components/TweetBox";
import { TweetPageStyle } from "../components/TweetPage";
import { User } from "../@types";
import { useEffect, useState } from "react";
import { useModal } from "../hooks";

export const TweetPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tweet } = useAppSelector((state) => state.tweetDetail);
  const { users } = useAppSelector((state) => state.usersList);
  const { user } = useAppSelector((state) => state.userLogged);
  const { modalOpen, modalContent, openModal, closeModal } = useModal();
  const [showReplyBox, setShowReplyBox] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getTweetDetails(id));
    }
  }, [dispatch, id]);

  const tweetUser =
    users.find((user) => user.id === tweet.userId) || ({} as User);

  const handleBack = () => {
    navigate(-1);
  };

  const handleReply = (content: string) => {
    if (content.trim() !== "") {
      dispatch(
        createTweet({
          content,
          parentId: tweet.id,
          tweetType: "REPLY",
          userId: user.id,
        })
      );
      setShowReplyBox(false);
      return;
    }
  };

  const handleReplyBoxClick = () => {
    setShowReplyBox(true);
  };

  return (
    <DefaultLayout>
      <TweetPageStyle>
        <div className="page-header">
          <button onClick={handleBack}>
            <BackIcon />
          </button>
          <h2 className="title">Post</h2>
        </div>
        <div className="content">
          <Post
            key={tweet.id}
            isOwnTweet={tweet.userId === user.id}
            openModal={openModal}
            tweet={tweet}
            tweetUser={tweetUser || ({} as User)}
            userLogged={user}
            closeModal={closeModal}
            className="parent-tweet"
          />
          {!showReplyBox ? (
            <div className="reply-input-box" onClick={handleReplyBoxClick}>
              <div className="avatar-column">
                <Avatar user={user as User} />
              </div>
              <div className="input-placeholder">Postar sua resposta</div>
            </div>
          ) : (
            <TweetBox
              mode="reply"
              tweet={tweet}
              tweetUser={tweetUser}
              initialContent=""
              onTweetSubmit={(content) => content && handleReply(content)}
              hideParent={true}
            />
          )}
          {tweet.replies &&
            tweet.replies.length > 0 &&
            tweet.replies.map((reply) => {
              const replyUser = users.find((user) => user.id === reply.userId);
              return (
                <Post
                  key={reply.id}
                  isOwnTweet={reply.userId === user.id}
                  openModal={openModal}
                  tweet={reply}
                  tweetUser={replyUser || ({} as User)}
                  userLogged={user}
                  closeModal={closeModal}
                />
              );
            })}
        </div>
      </TweetPageStyle>
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
};
