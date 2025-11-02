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
  fetchTweetsAndFeed,
  likeTweet,
} from "../../store/modules/tweets/tweetsActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCreateTweet, useUpdateTweet } from "../../hooks";
import { useEffect, useRef, useState } from "react";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { DialogPopupContent } from "../Dialog/DialogStyle";
import { PostStyle } from "./PostStyle";
import { TweetBox } from "../TweetBox";
import { UserCard } from "../UserCard";
import { followUser } from "../../store/modules/users/usersActions";
import { formatDate } from "../../utils/formatDate";
import { showAlert } from "../../store/modules/alert/alertSlice";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useRetweetTweet } from "../../hooks/userActions/useRetweet";

interface PostProps {
  tweet: Tweet;
  tweetUser: User;
  isOwnTweet: boolean;
  userLogged: Partial<User>;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  className?: string;
}

export function Post({
  tweet,
  tweetUser,
  isOwnTweet,
  userLogged,
  openModal,
  closeModal,
  className,
}: PostProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tweets = useAppSelector((state) => state.tweetsList.tweets);
  const updatedTweet = tweets.find((t) => t.id === tweet.id) || tweet;
  const { handleLogout } = useLogout();
  const { handleCreateTweet } = useCreateTweet(closeModal);
  const { handleUpdateTweet } = useUpdateTweet(closeModal);
  const { handleRetweetTweet } = useRetweetTweet(closeModal);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [retweetPopupVisible, setRetweetPopupVisible] =
    useState<boolean>(false); // Controla a visibilidade do popup de retweet
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

  const handleRetweet = async (tweetId: string, comment: string = "") => {
    const success = await handleRetweetTweet(tweetId, comment);
    if (success) {
      dispatch(fetchTweetsAndFeed());
    }
    setRetweetPopupVisible(false);
  };

  const handleLike = async () => {
    if (!isOwnTweet) {
      try {
        await dispatch(likeTweet(tweet.id));
      } catch (error) {
        console.error("Erro ao curtir:", error);
      }
    } else {
      dispatch(
        showAlert({
          message: "Você não pode curtir seu próprio tweet",
          type: "warning",
        })
      );
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
      handleUpdateTweet(tweet.id, content, imageUrl);
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
      if (tweet.tweetType === "REPLY" || tweet.tweetType === "TWEET") {
        dispatch(deleteTweet(tweet.id)).then(() => {
          dispatch({ type: "tweetsList/fetchTweets" }); // Recarrega a lista de tweets
        });
      } else if (tweet.tweetType === "RETWEET") {
        handleRetweet(tweet.id); // Reutiliza o método unificado
      }
    } else {
      logoutUnauthorized();
    }
    setMenuVisible(false);
  };

  function handleTweetClick(id: string, username: string): void {
    navigate(`/${username}/status/${id}`);
  }

  const renderRetweetDialog = () => (
    <Dialog
      isOpen={retweetPopupVisible}
      onClose={() => setRetweetPopupVisible(false)}
      usePortal={true}
      showHeader={false}
    >
      <DialogPopupContent>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            handleRetweet(tweet.id); // Retweet direto com comentário vazio
          }}
        >
          {Array.isArray(tweet.retweets) &&
          tweet.retweets.some((retweet) => retweet.userId === userLogged.id)
            ? "Desfazer repost"
            : "Repostar"}
        </Button>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            openTweetBoxModal(tweet, "retweet", (comment) => {
              handleRetweet(tweet.id, comment ?? ""); // Retweet comentado
            });
            setRetweetPopupVisible(false);
          }}
        >
          Comentar
        </Button>
      </DialogPopupContent>
    </Dialog>
  );

  return (
    <PostStyle className={className}>
      <div className="avatar-column">
        <Avatar user={tweetUser} />
      </div>
      <div className="content-column">
        <div className="header">
          <UserCard user={tweetUser} tweet={tweet} hideAvatar={true}>
            <span className="date">
              &middot;{" "}
              {window.innerWidth <= 768
                ? formatDate(
                    tweet.updatedAt ?? tweet.createdAt,
                    "shortRelative"
                  )
                : formatDate(tweet.updatedAt ?? tweet.createdAt, "long")}
            </span>
          </UserCard>
          <span
            className="dots"
            onClick={() => setMenuVisible((prev) => !prev)}
          >
            <DotsIcon />
          </span>
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
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteTweet(tweet);
                    }}
                  >
                    Excluir
                  </button>
                </div>
              ) : (
                <div className="menu-options">
                  <button onClick={handleFollow}>
                    {Array.isArray(tweetUser.followers) &&
                    tweetUser.followers?.some(
                      (user) => user.followerId === userLogged.id
                    )
                      ? "Deixar de seguir"
                      : "Seguir"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div
          className="tweet-content"
          onClick={() => handleTweetClick(tweet.id, tweetUser.username)}
        >
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
              key={`reply-${tweet.id}-${tweet.replies?.length}`} // Adiciona o ID do tweet para garantir unicidade
              className={`icon ${
                Array.isArray(tweet.replies) &&
                tweet.replies?.some((reply) => reply.userId === userLogged.id)
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
              <span className="counter">{tweet.replies?.length || null}</span>
            </span>
            <span
              key={`retweet-${tweet.id}-${tweet.retweets?.length}`} // Adiciona o ID do tweet para garantir unicidade
              className={`icon green ${
                Array.isArray(tweet.retweets) &&
                tweet.retweets?.some(
                  (retweet) => retweet.userId === userLogged.id
                )
                  ? "retweeted"
                  : ""
              }`}
              title="Repostar"
              onClick={() => setRetweetPopupVisible(true)}
            >
              <RetweetIcon />
              <span className="counter">{tweet.retweets?.length || null}</span>
            </span>
            {retweetPopupVisible && renderRetweetDialog()}
            <span
              key={`like-${tweet.id}-${updatedTweet.likes?.length}`} // Adiciona o ID do tweet para garantir unicidade
              className={`icon red like-button ${
                updatedTweet.likes?.some(
                  (like) => like.userId === userLogged.id
                )
                  ? "liked"
                  : ""
              }`}
              onClick={handleLike}
              title="Curtir"
            >
              <LikeIcon />
              <span className="counter">
                {updatedTweet.likes?.length || null}
              </span>
            </span>
            <span
              className="icon"
              title="Ver"
              onClick={() =>
                navigate(`/${tweetUser.username}/status/${tweet.id}`)
              }
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
      </div>
    </PostStyle>
  );
}
