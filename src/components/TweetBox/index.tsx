import { Button } from "../Button";
import { TweetBoxStyle } from "./TweetBoxStyle";
import linkPhoto from "../../assets/link-photo.svg";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Tweet, UserBase } from "../../types";
import { UserCard } from "../UserCard";
import { Avatar } from "../Avatar";

export interface TweetBoxProps {
  tweetUser: UserBase;
  tweet: Tweet;
  mode: "create" | "edit" | "reply" | "retweet";
  onTweetSubmit: (
    content: string,
    imageUrl: string,
    parentId?: string,
    comment?: string
  ) => void;
}

export function TweetBox({
  tweetUser,
  tweet,
  mode,
  onTweetSubmit,
}: TweetBoxProps) {
  const [content, setContent] = useState(tweet.content || "");
  const [imageUrl, setImageUrl] = useState(tweet.imageUrl || "");
  const [comment, setComment] = useState<string>("");
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.userLogged);

  const openImageModal = (imageSrc: string) => {
    setExpandedImage(imageSrc);
  };

  const closeImageModal = () => {
    setExpandedImage(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onTweetSubmit(content, imageUrl, tweet.parentId, comment);
    setContent("");
    setImageUrl("");
    setComment("");
  };

  return (
    <TweetBoxStyle>
      <form onSubmit={handleSubmit}>
        {mode === "reply" && (
          <div className="reply-content">
            <UserCard user={tweetUser} tweet={tweet} />
            <span className="content">{content}</span>
          </div>
        )}

        {mode !== "retweet" && (
          <div className="tweetbox-content">
            <Avatar user={user} />
            <input
              placeholder={
                mode === "reply"
                  ? "Postar sua resposta"
                  : "O que está acontencendo?"
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
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
                maxLength={140}
                rows={3}
              />
            </div>
            <div className="retweet-content">
              <img src={tweetUser.avatarUrl} alt={tweetUser.name} />
              <span>{content}</span>
            </div>
            <div className="tweetbox-image-preview">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Pré-visualização da imagem"
                  onClick={() => openImageModal(imageUrl)} // Clique para ampliar
                />
              ) : (
                <span></span>
              )}
            </div>
          </>
        )}

        <div className="tweetbox-links">
          {mode !== "retweet" && mode !== "reply" && (
            <div className="image-link">
              <img src={linkPhoto} title="Mídia" />
              <input
                type="text"
                placeholder="Adicionar uma URL de imagem"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)} // Atualiza a URL da imagem
              />
            </div>
          )}
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
