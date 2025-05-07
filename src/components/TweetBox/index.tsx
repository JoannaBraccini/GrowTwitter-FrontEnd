import { Tweet, UserBase } from "../../@types";
import { useEffect, useRef, useState } from "react";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { CloseIcon } from "../../assets/Icons";
import { TweetBoxStyle } from "./TweetBoxStyle";
import { UserCard } from "../UserCard";
import linkPhoto from "../../assets/link-photo.svg";
import { useAppSelector } from "../../store/hooks";
import { useProfileNavigation } from "../../hooks";

export interface TweetBoxProps {
  tweetUser: UserBase;
  tweet: Tweet;
  mode: "create" | "edit" | "reply" | "retweet";
  onTweetSubmit: (
    content?: string,
    imageUrl?: string,
    parentId?: string,
    comment?: string
  ) => void;
  initialContent?: string;
  initialImageUrl?: string;
}

export function TweetBox({
  tweetUser,
  tweet,
  mode,
  onTweetSubmit,
  initialContent = "",
  initialImageUrl = "",
}: TweetBoxProps) {
  const [content, setContent] = useState<string>(initialContent);
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [comment, setComment] = useState<string | undefined>("");
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.userLogged);
  const { handleProfileClick } = useProfileNavigation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (mode === "edit") {
      setContent(tweet.content || ""); // Preenche o conteúdo do tweet
      setImageUrl(tweet.imageUrl || ""); // Preenche a URL da imagem do tweet
    }
    if (textareaRef.current && mode !== "create") {
      textareaRef.current.style.height = "auto"; // Reseta a altura
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ajusta para o conteúdo inicial
    }
  }, [mode, tweet]); // Recalcula quando o modo ou o tweet mudar

  const openImageModal = (imageSrc: string) => {
    setExpandedImage(imageSrc);
  };

  const closeImageModal = () => {
    setExpandedImage(null);
  };

  const handleInput = (
    e: React.FormEvent<HTMLTextAreaElement>,
    dynamicResize: boolean
  ) => {
    if (dynamicResize) {
      const textarea = e.currentTarget;
      textarea.style.height = "auto"; // Reseta a altura
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta para o conteúdo
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onTweetSubmit(content, imageUrl, tweet.parentId, comment);
    setContent("");
    setImageUrl("");
    setComment("");
  };

  const handleRemoveImage = () => {
    setImageUrl(""); // Remove a imagem ao limpar o estado
  };

  return (
    <TweetBoxStyle>
      <form onSubmit={handleSubmit}>
        {mode === "reply" && (
          <div className="reply-content">
            <UserCard user={tweetUser} tweet={tweet} />
            <div className="content">
              <p>{tweet.content}</p>
              <p className="tweet-user">
                Respondendo a{" "}
                <a href="#" onClick={() => handleProfileClick(tweetUser.id)}>
                  @{tweetUser.username}
                </a>
              </p>
            </div>
          </div>
        )}

        {mode !== "retweet" && (
          <div className="tweetbox-content">
            <Avatar user={user} />
            <textarea
              ref={textareaRef}
              placeholder={
                mode === "reply"
                  ? "Postar sua resposta"
                  : mode === "edit"
                  ? ""
                  : "O que está acontencendo?"
              }
              value={content} // Preenche com o conteúdo original no modo "edit"
              onChange={(e) => setContent(e.target.value)}
              onInput={(e) => handleInput(e, mode !== "create")} // Ajusta dinamicamente apenas se não for "create"
              className={mode !== "create" ? "dynamic-resize" : ""} // Aplica classe apenas se não for "create"
            />
          </div>
        )}

        {imageUrl && (
          <div className="tweetbox-image-preview">
            <img src={imageUrl} alt="Preview" />
            {mode === "edit" && (
              <Button
                title="Remover mídia"
                type="button"
                className="remove-image-button"
                onClick={handleRemoveImage}
              >
                <span>
                  <CloseIcon />
                </span>
              </Button>
            )}
          </div>
        )}

        {mode === "retweet" && (
          <>
            <div className="tweetbox-retweet">
              <img src={user.avatarUrl} alt={user.name} />
              <textarea
                placeholder="Adicionar um comentário"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onInput={(e) => handleInput(e, true)} // Ajusta dinamicamente
                maxLength={140}
                rows={2} // Começa com uma linha
                className="dynamic-resize" // Aplica classe para ajuste dinâmico
              />
            </div>
            <div className="retweet-content">
              <img src={tweetUser.avatarUrl} alt={tweetUser.name} />
              <span>{tweet.content}</span>
            </div>
            <div className="tweetbox-image-preview">
              {tweet.imageUrl ? (
                <img
                  src={tweet.imageUrl}
                  alt="Pré-visualização da imagem"
                  onClick={() => openImageModal(tweet.imageUrl || "")} // Clique para ampliar
                />
              ) : (
                <span></span>
              )}
            </div>
          </>
        )}

        <div className="tweetbox-links">
          {mode === "create" ||
            (mode === "edit" && (
              <div className="image-link">
                <img src={linkPhoto} title="Mídia" />
                <input
                  type="text"
                  placeholder="Adicionar uma URL de imagem"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)} // Atualiza a URL da imagem
                />
              </div>
            ))}
          <div className="tweetbox-actions">
            <Button size="small" className="tweetbox-tweetButton" type="submit">
              {mode === "create" && "Postar"}
              {mode === "edit" && "Salvar"}
              {mode === "reply" && "Responder"}
              {mode === "retweet" && "Compartilhar"}
            </Button>
          </div>
        </div>
      </form>
      {expandedImage && (
        <div className="image-modal" onClick={closeImageModal}>
          <div className="image-modal-content">
            <img src={expandedImage} alt="Imagem ampliada" />
          </div>
        </div>
      )}
    </TweetBoxStyle>
  );
}
