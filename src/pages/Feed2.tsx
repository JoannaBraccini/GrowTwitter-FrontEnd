import { DefaultLayout } from "../configs/layouts/DefaultLayout";
import { TweetBox } from "../components/TweetBox";
import { PostStyle } from "../components/Post/PostStyle";
import { FeedStyle } from "../components/Feed/FeedStyle";
import { useEffect, useState } from "react";
import { CreateTweetRequest, Tweet, User } from "../types";
import {
  RetweetIcon,
  CommentIcon,
  LikeIcon,
  StatisticIcon,
  SaveIcon,
  ShareIcon,
  DotsIcon,
} from "../assets/icons";
import verifiedBlue from "../assets/verified-blue.svg";
import { Loader } from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showAlert } from "../store/modules/alert/alertSlice";
import {
  createTweet,
  deleteTweet,
  getTweetDetails,
  getTweets,
  likeTweet,
  updateTweet,
} from "../store/modules/tweets/tweetsActions";
import {
  followUser,
  getUserDetails,
} from "../store/modules/users/usersActions";
import { formatDate } from "../utils";
import { Modal } from "../components/Modal";
import { Tabs } from "../components/Tabs";
import { logout } from "../store/modules/auth/loginSlice";
import { useNavigate } from "react-router-dom";
import { useCreateTweet } from "../hooks/useCreateTweet";

export function Feed2() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    token,
    user: userLogged,
    loading,
  } = useAppSelector((state) => state.userLogged);
  const { user } = useAppSelector((state) => state.userDetail);
  const { tweets, loading: loadingTweets } = useAppSelector(
    (state) => state.tweetsList
  );
  const { users } = useAppSelector((state) => state.usersList);
  const [activeTab, setActiveTab] = useState<"Para você" | "Seguindo">(
    "Para você"
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const [menuVisible, setMenuVisible] = useState<string | null>(null);

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const logoutUnauthorized = () => {
    dispatch(showAlert({ message: "Usuário não autorizado", type: "error" }));
    dispatch(logout());
    navigate("/sign");
  };

  // Buscar tweets
  useEffect(() => {
    if (userLogged && token) {
      //dispatch(getFeed)
      if (!user || user.id !== userLogged.id) {
        dispatch(getUserDetails(userLogged.id));
      }
    } else dispatch(getTweets({ page: 1, take: 20 }));
  }, [dispatch, token, user, userLogged]);

  const openTweetBoxModal = (
    title: string,
    initialContent: string,
    initialImageUrl: string,
    onTweetSubmit: (content: string, imageUrl: string) => void
  ) => {
    openModal(
      title,
      <TweetBox
        userPhoto={user.avatarUrl}
        userName={user.name}
        initialContent={initialContent}
        initialImageUrl={initialImageUrl}
        onTweetSubmit={onTweetSubmit}
      />
    );
  };

  const validateId = (tweet: Tweet): boolean => {
    const validId = tweet.userId === userLogged.id;
    return validId;
  };

  const handleReply = (id: string, content?: string, imageUrl?: string) => {
    const reply: CreateTweetRequest = {
      parentId: id,
      userId: user.id,
      content,
      imageUrl,
      tweetType: "REPLY",
    };
    dispatch(createTweet(reply));
  };

  const handleEditTweet = (
    tweet: Tweet,
    content?: string,
    imageUrl?: string
  ) => {
    if (validateId(tweet)) {
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

  const handleDeleteTweet = (tweet: Tweet) => {
    if (validateId(tweet)) {
      dispatch(deleteTweet(tweet.id));
    } else logoutUnauthorized();
    setMenuVisible(null); // Fechar o menu após a exclusão
  };

  const handleUserDetail = (user: User) => {
    if (userLogged) {
      dispatch(getUserDetails(user.id));
      navigate(`/${user.username}`);
    }
  };
  const handleTweetDetail = (id: string) => {
    dispatch(getTweetDetails(id));
  };
  const handleLike = (tweet: Tweet) => {
    if (!validateId(tweet)) {
      dispatch(likeTweet(tweet.id));
    }
  };
  const handleFollow = (id: string) => {
    if (userLogged.id === id) {
      throw new Error("User cannot follow themselves");
    } else dispatch(followUser(id));
  };

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

  // Filtrar tweets dependendo da aba
  const filteredTweets =
    activeTab === "Para você"
      ? tweets
      : tweets.filter((tweet) =>
          user?.following?.some(
            (follow) =>
              follow.id === tweet.userId || tweet.userId === userLogged.id
          )
        );

  return (
    <DefaultLayout>
      <FeedStyle>
        <div className="feed-header">
          <Tabs
            tabs={["Para Você", "Seguindo"]}
            activeTab={activeTab}
            onTabChange={() => setActiveTab}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <TweetBox
            key="tweet-box"
            userPhoto={user.avatarUrl}
            userName={user.name}
            initialContent=""
            onTweetSubmit={useCreateTweet}
          />
        )}
        {loadingTweets ? (
          <Loader />
        ) : (
          <>
            {filteredTweets.map((tweet) => {
              const tweetUser = users.find((user) => user.id === tweet.userId);
              const isOwnTweet = tweet.userId === userLogged.id;

              return (
                <PostStyle key={tweet.id}>
                  <div className="post-avatar">
                    <img
                      src={tweetUser?.avatarUrl}
                      alt={tweetUser?.name}
                      onClick={() =>
                        handleUserDetail(tweetUser ?? ({} as User))
                      }
                    />
                  </div>
                  <div className="post-body">
                    <div className="post-header">
                      <div className="post-headerText">
                        <h3>
                          {tweetUser?.name}
                          <span className="post-headerSpecial">
                            {/* user.verified && */}
                            <span className="icons post-badge">
                              {" "}
                              {verifiedBlue}{" "}
                            </span>
                            @{tweetUser?.username} &middot;{" "}
                            {formatDate(
                              tweet.updatedAt ?? tweet.createdAt,
                              "relative"
                            )}
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
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            } // Esconde a imagem se houver erro
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
                    {/* Menu Flutuante */}
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
                                  (content, imageUrl) =>
                                    handleEditTweet(tweet, content, imageUrl)
                                )
                              }
                            >
                              Editar
                            </button>

                            <button onClick={() => handleDeleteTweet(tweet)}>
                              Excluir
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleFollow(tweetUser?.id ?? "")}
                          >
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
                        <span
                          title="Responder"
                          onClick={() =>
                            openTweetBoxModal(
                              "Responder Tweet",
                              "", // Conteúdo inicial
                              "", // URL da imagem inicial
                              (content, imageUrl) =>
                                handleReply(tweet.id, content, imageUrl)
                            )
                          }
                        >
                          <CommentIcon /> {tweet.replyCount}
                        </span>

                        <span
                          title="Repostar"
                          onClick={() =>
                            openModal(
                              "Compartilhar Tweet",
                              <p>Compartilhe este tweet: {tweet.content}</p>
                            )
                          }
                        >
                          <RetweetIcon /> {tweet.retweetCount}
                        </span>
                        <span title="Curtir" onClick={() => handleLike(tweet)}>
                          <LikeIcon /> {tweet.likeCount}
                        </span>
                        <span
                          title="Ver"
                          onClick={() => handleTweetDetail(tweet.id)}
                        >
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
                </PostStyle>
              );
            })}
          </>
        )}
      </FeedStyle>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </DefaultLayout>
  );
}
