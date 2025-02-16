import { formatDate } from "../../utils";
import {
  RetweetIcon,
  CommentIcon,
  LikeIcon,
  StatisticIcon,
  SaveIcon,
  ShareIcon,
  DotsIcon,
} from "../../assets/icons";
import verifiedBlue from "../../assets/verified-blue.svg";
import { CreateTweetRequest, Tweet, User } from "../../types";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import {
  createTweet,
  deleteTweet,
  likeTweet,
  updateTweet,
} from "../../store/modules/tweets/tweetsActions";
import { useNavigate } from "react-router-dom";
import { followUser } from "../../store/modules/users/usersActions";
import { showAlert } from "../../store/modules/alert/alertSlice";
import { logout } from "../../store/modules/auth/loginSlice";
import { TweetBox } from "../TweetBox";

interface PostProps {
  tweet: Tweet;
  tweetUser: User;
  isOwnTweet: boolean;
  userLogged: Partial<User>;
  openModal: (title: string, content: React.ReactNode) => void;
}

export function Post({
  tweet,
  tweetUser,
  isOwnTweet,
  userLogged,
  openModal,
}: PostProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState<string | null>(null);

  const isImageUrl = (url: string) =>
    /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(url);
  const isLinkUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const openTweetBoxModal = (
    title: string,
    initialContent: string,
    initialImageUrl: string,
    onTweetSubmit: (content: string, imageUrl: string) => void
  ) => {
    openModal(
      title,
      <TweetBox
        userPhoto={userLogged.avatarUrl}
        userName={userLogged.name}
        initialContent={initialContent}
        initialImageUrl={initialImageUrl}
        onTweetSubmit={onTweetSubmit}
      />
    );
  };

  const handleLike = () => {
    if (!isOwnTweet) {
      dispatch(likeTweet(tweet.id));
    }
  };

  const handleFollow = () => {
    if (tweetUser && tweetUser?.id !== userLogged.id) {
      dispatch(followUser(tweetUser?.id));
    }
  };

  const handleEditTweet = (
    tweet: Tweet,
    content?: string,
    imageUrl?: string
  ) => {
    if (isOwnTweet) {
      const updatedTweet: Tweet = {
        ...tweet,
        content: content ?? tweet.content,
        imageUrl: imageUrl ?? tweet.imageUrl,
      };
      dispatch(updateTweet(updatedTweet));
    } else {
      logoutUnauthorized();
    }
    setMenuVisible(null);
  };

  const logoutUnauthorized = () => {
    dispatch(showAlert({ message: "Usuário não autorizado", type: "error" }));
    dispatch(logout());
    navigate("/sign");
  };

  const handleReply = () => {
    const { id } = userLogged;
    openTweetBoxModal("Responder Tweet", "", "", (content, imageUrl) => {
      if (!id) {
        dispatch(
          showAlert({
            message: "Faça login para acessar esta funcção",
            type: "warning",
          })
        );
        return;
      }
      const reply: CreateTweetRequest = {
        parentId: tweet.id,
        userId: id,
        content,
        imageUrl,
        tweetType: "REPLY",
      };
      dispatch(createTweet(reply));
    });
  };

  const handleDeleteTweet = (tweet: Tweet) => {
    if (isOwnTweet) {
      dispatch(deleteTweet(tweet.id));
    } else logoutUnauthorized();
    setMenuVisible(null);
  };

  return (
    <div className="post">
      <div className="post-avatar">
        <img
          src={tweetUser?.avatarUrl}
          alt={tweetUser?.name}
          onClick={() => navigate(`/${tweetUser?.username}`)}
        />
      </div>
      <div className="post-body">
        <div className="post-header">
          <div className="post-headerText">
            <h3>
              {tweetUser?.name}
              <span className="post-headerSpecial">
                <span className="icons post-badge">
                  <img src={verifiedBlue} />
                </span>
                @{tweetUser?.username} &middot;{" "}
                {formatDate(tweet.updatedAt ?? tweet.createdAt, "relative")}
              </span>
              <div
                className="dots-container"
                onClick={() => setMenuVisible(tweet.id)}
              >
                <DotsIcon />
              </div>
            </h3>
          </div>
          <div className="post-content">
            {tweet.imageUrl && isImageUrl(tweet.imageUrl) && (
              <img
                src={tweet.imageUrl}
                alt="Tweet content"
                className="tweet-image"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
            {tweet.content &&
              (isLinkUrl(tweet.content) ? (
                <a
                  href={tweet.content}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tweet.content}
                </a>
              ) : (
                <p>{tweet.content}</p>
              ))}
          </div>
        </div>

        {menuVisible === tweet.id && (
          <div className="tweet-menu">
            {isOwnTweet ? (
              <>
                <button
                  onClick={() =>
                    openTweetBoxModal(
                      "Editar Tweet",
                      tweet.content ?? "",
                      tweet.imageUrl ?? "",
                      (content, imageUrl) => {
                        handleEditTweet(tweet, content, imageUrl);
                      }
                    )
                  }
                >
                  Editar
                </button>
                <button onClick={() => handleDeleteTweet}>Excluir</button>
              </>
            ) : (
              <button onClick={handleFollow}>
                {tweetUser?.followers.find(
                  (user) => user.followerId === userLogged.id
                )
                  ? "Deixar de seguir"
                  : "Seguir"}
              </button>
            )}
          </div>
        )}

        <div className="post-footer">
          <div className="post-icons">
            <span title="Responder" onClick={handleReply}>
              <CommentIcon /> {tweet.replyCount}
            </span>
            <span
              title="Repostar"
              onClick={() =>
                openModal(
                  "Compartilhar Tweet",
                  <p>
                    Compartilhe este tweet: {tweet.content ?? tweet.imageUrl}
                  </p>
                )
              }
            >
              <RetweetIcon /> {tweet.retweetCount}
            </span>
            <span title="Curtir" onClick={handleLike}>
              <LikeIcon /> {tweet.likeCount}
            </span>
            <span title="Ver" onClick={() => navigate(`/tweets/${tweet.id}`)}>
              <StatisticIcon />
            </span>
            <div className="post-actions">
              <span title="Salvar Tweet">
                {/* dispatch(addSaved(tweet)) */}
                <SaveIcon />
              </span>
              <span title="Compartilhar">
                {/* handleExternalShare(tweet)) */}
                <ShareIcon />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
