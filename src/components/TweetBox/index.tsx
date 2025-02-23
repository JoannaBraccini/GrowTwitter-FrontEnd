import { Button } from "../Button";
import { TweetBoxStyle } from "./TweetBoxStyle";
import linkPhoto from "../../assets/link-photo.svg";
import { useState } from "react";

export interface TweetBoxProps {
  userPhoto: string;
  userName: string;
  parentId?: string;
  initialContent?: string;
  initialImageUrl?: string;
  mode: "create" | "edit" | "reply" | "retweet";
  onTweetSubmit: (
    content: string,
    imageUrl: string,
    parentId?: string,
    comment?: string
  ) => void;
}

export function TweetBox({
  userPhoto,
  userName,
  parentId,
  initialContent = "",
  initialImageUrl = "",
  mode,
  onTweetSubmit,
}: TweetBoxProps) {
  const [content, setContent] = useState(initialContent);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [comment, setComment] = useState<string | undefined>(undefined);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const openImageModal = (imageSrc: string) => {
    setExpandedImage(imageSrc);
  };

  const closeImageModal = () => {
    setExpandedImage(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onTweetSubmit(content, imageUrl, parentId, comment);
    setContent("");
    setImageUrl("");
    setComment(undefined);
  };

  return (
    <TweetBoxStyle>
      <form onSubmit={handleSubmit}>
        {mode === "retweet" && (
          <div className="tweetbox-comment">
            <textarea
              placeholder="Adicionar um comentário"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
          </div>
        )}
        <div className="tweetbox-content">
          <img src={userPhoto} alt={userName} />
          {mode !== "retweet" ? (
            <input
              placeholder={
                mode === "reply"
                  ? "Postar sua resposta"
                  : "O que está acontencendo?"
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <span>{content}</span>
          )}
        </div>
        {imageUrl && (
          <div className="tweetbox-image-preview">
            <img
              src={imageUrl}
              alt="Pré-visualização da imagem"
              onClick={() => openImageModal(imageUrl)} // Clique para ampliar
            />
          </div>
        )}

        <div className="tweetbox-links">
          {mode !== "retweet" && (
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
