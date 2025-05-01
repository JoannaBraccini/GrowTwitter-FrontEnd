import {
  CommentIcon,
  DotsIcon,
  LikeIcon,
  RetweetIcon,
  SaveIcon,
  ShareIcon,
  StatisticIcon,
} from "../../assets/Icons";
import { Tweet, User } from "../../@types";
import {
  deleteTweet,
  likeTweet,
  retweetTweet,
  updateTweet,
} from "../../store/modules/tweets/tweetsActions";
import { useEffect, useRef, useState } from "react";

import { PostStyle } from "./PostStyle";
import { TweetBox } from "../TweetBox";
import { UserCard } from "../UserCard";
import { followUser } from "../../store/modules/users/usersActions";
import { showAlert } from "../../store/modules/alert/alertSlice";
import { useAppDispatch } from "../../store/hooks";
import { useCreateTweet } from "../../hooks";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

interface PostProps {
  tweet: Tweet;
  tweetUser: User;
  isOwnTweet: boolean;
  userLogged: Partial<User>;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export function Post({
  tweet,
  tweetUser,
  isOwnTweet,
  userLogged,
  openModal,
  closeModal,
}: PostProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { handleLogout } = useLogout();
  const { handleCreateTweet } = useCreateTweet(closeModal);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  const isLinkUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const openTweetBoxModal = (
    tweet: Tweet,
    mode: "create" | "edit" | "reply" | "retweet",
    onTweetSubmit: (
      content?: string,
      imageUrl?: string,
      parentI?: string,
      comment?: string
    ) => void
  ) => {
    if (!userLogged.avatarUrl || !userLogged.name || !userLogged.id) {
      dispatch(
        showAlert({
          message: "Informações do usuário ausentes. Faça login novamente.",
          type: "error",
        })
      );
      return;
    }
    openModal(
      <TweetBox
        tweetUser={tweetUser}
        tweet={tweet}
        mode={mode}
        onTweetSubmit={onTweetSubmit}
      />
    );
  };

  const handleRetweet = (tweetId: string, comment: string) => {
    dispatch(retweetTweet({ tweetId, comment }));
  };

  const handleLike = () => {
    if (!isOwnTweet) {
      dispatch(likeTweet(tweet.id));
    }
  };

  const handleReply = (content: string, imageUrl?: string) => {
    handleCreateTweet(content, imageUrl, tweet.id);
  };

  const handleFollow = () => {
    if (tweetUser) {
      dispatch(followUser(tweetUser.id));
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
    setMenuVisible(false);
  };

  const logoutUnauthorized = () => {
    dispatch(showAlert({ message: "Usuário não autorizado", type: "error" }));
    handleLogout();
  };

  const handleDeleteTweet = (tweet: Tweet) => {
    if (isOwnTweet) {
      dispatch(deleteTweet(tweet.id));
    } else logoutUnauthorized();
    setMenuVisible(false);
  };

  function handleTweetClick(id: string, username: string): void {
    navigate(`/${username}/status/${id}`);
  }

  return (
    <PostStyle>
      <div className="header">
        <UserCard user={tweetUser} tweet={tweet}>
          <span
            className="dots"
            onClick={() => setMenuVisible((prev) => !prev)}
          >
            <DotsIcon />
          </span>
        </UserCard>
      </div>
      <div
        className="tweet-content"
        onClick={() => handleTweetClick(tweet.id, tweetUser.username)}
      >
        {menuVisible && tweet.id && (
          <div className="menu" ref={menuRef}>
            {isOwnTweet ? (
              <div className="menu-options">
                <button
                  onClick={() =>
                    openTweetBoxModal(tweet, "edit", (content, imageUrl) => {
                      handleEditTweet(tweet, content, imageUrl);
                    })
                  }
                >
                  Editar
                </button>
                <button onClick={() => handleDeleteTweet(tweet)}>
                  Excluir
                </button>
              </div>
            ) : (
              <div className="menu-options">
                <button onClick={handleFollow}>
                  {Array.isArray(tweetUser.followers) &&
                  tweetUser.followers.some(
                    (user) => user.followerId === userLogged.id
                  )
                    ? "Deixar de seguir"
                    : "Seguir"}
                </button>
              </div>
            )}
          </div>
        )}
        {/* Verifica se há um link e renderiza */}
        {tweet.content && isLinkUrl(tweet.content) ? (
          <a href={tweet.content} target="_blank" rel="noopener noreferrer">
            {tweet.content}
          </a>
        ) : (
          tweet.content && <p>{tweet.content}</p>
        )}
        {/* Renderiza a imagem se houver */}
        {tweet.imageUrl && (
          <img
            src={tweet.imageUrl}
            alt="Imagem"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}
      </div>

      <div className="tweet-footer">
        <div className="icons">
          <span
            className={`icon ${
              Array.isArray(tweet.replies) &&
              tweet.replies.some((reply) => reply.userId === userLogged.id)
                ? "replied"
                : ""
            }`}
            title="Responder"
            onClick={() =>
              openTweetBoxModal(tweet, "reply", (content, imageUrl) => {
                handleReply(content ?? "", imageUrl);
              })
            }
          >
            <CommentIcon />
            <span className="counter">{tweet.replies.length || null}</span>
          </span>
          <span
            className={`icon green ${
              Array.isArray(tweet.retweets) &&
              tweet.retweets.some((retweet) => retweet.userId === userLogged.id)
                ? "retweeted"
                : ""
            }`}
            title="Repostar"
            onClick={() =>
              openTweetBoxModal(tweet, "retweet", (comment) => {
                handleRetweet(tweet.id, comment ?? "");
              })
            }
          >
            <RetweetIcon />
            <span className="counter">{tweet.retweets.length || null}</span>
          </span>
          <span
            className={`icon red ${
              Array.isArray(tweet.likes) &&
              tweet.likes.some((like) => like.userId === userLogged.id)
                ? "liked"
                : ""
            }`}
            title="Curtir"
            onClick={handleLike}
          >
            <LikeIcon />
            <span className="counter">{tweet.likes.length || null}</span>
          </span>
          <span
            className="icon"
            title="Ver"
            onClick={() => navigate(`/tweet/${tweet.id}`)}
          >
            <StatisticIcon />
          </span>
          <div className="actions">
            <span className="icon" title="Salvar Tweet">
              <SaveIcon />
            </span>
            <span className="icon" title="Compartilhar">
              <ShareIcon />
            </span>
          </div>
        </div>
      </div>
    </PostStyle>
  );
}
