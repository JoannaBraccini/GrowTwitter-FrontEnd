import { Button } from "../Button";
import { TweetBoxStyle } from "./TweetBoxStyle";
import linkPhoto from "../../assets/link-photo.svg";
import { useState } from "react";

export interface TweetBoxProps {
  userPhoto: string | undefined;
  userName: string | undefined;
  initialContent: string;
  onTweetSubmit: (tweet: string) => void;
}

export function TweetBox({
  userPhoto,
  userName,
  initialContent = "",
  onTweetSubmit,
}: TweetBoxProps) {
  const [tweetContent, setTweetContent] = useState(initialContent);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onTweetSubmit(tweetContent);
    setTweetContent("");
  };

  return (
    <TweetBoxStyle>
      <form onSubmit={handleSubmit}>
        <div className="tweetbox-input">
          <img src={userPhoto} alt={userName} />
          <textarea
            placeholder="O que está acontecendo?"
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
          />
        </div>
        <div className="tweetbox-links">
          <img src={linkPhoto} title="Mídia" />

          <Button size="small" className="tweetbox-tweetButton" type="submit">
            Postar
          </Button>
        </div>
      </form>
    </TweetBoxStyle>
  );
}
