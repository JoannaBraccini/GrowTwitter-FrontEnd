import { Button } from "../Button";
import { TweetBoxStyle } from "./TweetBoxStyle";
import linkPhoto from "../../assets/link-photo.svg";
import { useState } from "react";

export interface TweetBoxProps {
  userPhoto: string | undefined;
  userName: string | undefined;
  initialContent?: string;
  initialImageUrl?: string;
  onTweetSubmit: (content: string, imageUrl: string) => void;
}

export function TweetBox({
  userPhoto,
  userName,
  initialContent = "",
  initialImageUrl = "",
  onTweetSubmit,
}: TweetBoxProps) {
  const [content, setContent] = useState(initialContent);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onTweetSubmit(content, imageUrl);
    setContent("");
    setImageUrl("");
  };

  return (
    <TweetBoxStyle>
      <form onSubmit={handleSubmit}>
        <div className="tweetbox-input">
          <img src={userPhoto} alt={userName} />
          <textarea
            placeholder="O que está acontecendo?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {imageUrl && (
          <div className="tweetbox-image-preview">
            <img
              src={imageUrl}
              alt="Pré-visualização da imagem"
              className="tweetbox-image"
            />
          </div>
        )}

        <div className="tweetbox-links">
          <img src={linkPhoto} title="Mídia" />
          <input
            type="text"
            placeholder="Adicionar uma URL de imagem"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} // Atualiza a URL da imagem
          />

          <Button size="small" className="tweetbox-tweetButton" type="submit">
            Postar
          </Button>
        </div>
      </form>
    </TweetBoxStyle>
  );
}
