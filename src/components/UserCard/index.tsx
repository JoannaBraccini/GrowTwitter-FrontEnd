import React from "react";
import { useVerificationIcon } from "../../hooks";
import { Tweet, UserBase } from "../../types";
import { formatDate } from "../../utils";
import { UserCardStyle } from "./UserCardStyle";
import { Avatar } from "../Avatar";

interface UserCardProps {
  user: UserBase;
  tweet: Tweet;
  children?: React.ReactNode;
}

export function UserCard({ user, tweet, children }: UserCardProps) {
  const { icon, label } = useVerificationIcon(user);

  return (
    <UserCardStyle>
      <Avatar user={user} />
      <h3>{user.name}</h3>
      <span className="verified">
        <img src={icon} alt={label} />
      </span>
      <small>
        @{user.username} &middot;{" "}
        {formatDate(tweet.updatedAt ?? tweet.createdAt, "relative")}
      </small>
      {children}
    </UserCardStyle>
  );
}
