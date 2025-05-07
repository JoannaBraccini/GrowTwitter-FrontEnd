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
} from "../../store/modules/tweets/tweetsActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";

import { Button } from "../Button";
import { Dialog } from "../Dialog";
import { DialogPopupContent } from "../Dialog/DialogStyle";
import { PostStyle } from "./PostStyle";
import { TweetBox } from "../TweetBox";
import { UserCard } from "../UserCard";
import { followUser } from "../../store/modules/users/usersActions";
import { showAlert } from "../../store/modules/alert/alertSlice";
import { useCreateTweet } from "../../hooks";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useUpdateTweet } from "../../hooks/useEditTweet";

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
  const tweets = useAppSelector((state) => state.tweetsList.tweets);
  const updatedTweet = tweets.find((t) => t.id === tweet.id) || tweet;
  const { handleLogout } = useLogout();
  const { handleCreateTweet } = useCreateTweet(closeModal);
  const { handleUpdateTweet } = useUpdateTweet(closeModal);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [retweetPopupVisible, setRetweetPopupVisible] =
    useState<boolean>(false); // Controla a visibilidade do popup de retweet
  const [isVisible, setIsVisible] = useState<boolean>(true); // Controla a atualização do componente
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
    dispatch(retweetTweet({ tweetId, comment })).then((response) => {
      const payload = response.payload as { message: string };
      if (payload.message === "Retweet removed successfully") {
        setIsVisible(false); // Oculta o componente se o retweet for removido
      }
    });
    setRetweetPopupVisible(false);
  };

  const handleDirectRetweet = (tweetId: string) => {
    dispatch(retweetTweet({ tweetId, comment: "" })).then((response) => {
      const payload = response.payload as { message: string };
      if (payload.message === "Retweet removed successfully") {
        setIsVisible(false); // Oculta o componente se o retweet for removido
      }
    });
    setRetweetPopupVisible(false);
  };

  const handleLike = async () => {
    if (!isOwnTweet) {
      const result = await dispatch(likeTweet(tweet.id)).unwrap();
      if (!result.ok) {
        dispatch(
          showAlert({
            message: result.message,
            type: "error",
          })
        );
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
          setIsVisible(false); // Oculta o componente após a exclusão
        });
      } else if (tweet.tweetType === "RETWEET") {
        // Apenas chama o retweet para remover o retweet existente
        dispatch(retweetTweet({ tweetId: tweet.id, comment: "" })).then(() => {
          setIsVisible(false); // Oculta o componente após a exclusão do retweet
        });
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
            handleDirectRetweet(tweet.id);
          }}
        >
          Repostar
        </Button>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            openTweetBoxModal(tweet, "retweet", (comment) => {
              handleRetweet(tweet.id, comment ?? "");
            });
            setRetweetPopupVisible(false);
          }}
        >
          Comentar
        </Button>
      </DialogPopupContent>
    </Dialog>
  );

  if (!isVisible) return null; // Não renderiza o componente se ele não estiver visível

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
                (retweet) => retweet.user?.username === userLogged.username
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
              updatedTweet.likes?.some((like) => like.userId === userLogged.id)
                ? "liked"
                : ""
            }`}
            onClick={handleLike}
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
    </PostStyle>
  );
}
