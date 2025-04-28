import { Tweet, UserBase } from "../../@types";

import { Avatar } from "../Avatar";
import React from "react";
import { UserCardStyle } from "./UserCardStyle";
import { formatDate } from "../../utils";
import { useVerificationIcon } from "../../hooks";

interface UserCardProps {
  user: UserBase;
  tweet: Tweet;
  children?: React.ReactNode;
  className?: string;
}

export function UserCard({ user, tweet, children, className }: UserCardProps) {
  const { icon, label } = useVerificationIcon(user);

  return (
    <UserCardStyle className={className}>
      <div className="avatar">
        <Avatar user={user} />
      </div>
      <h3>{user.name}</h3>
      <span className="verified">
        <img src={icon} alt={label} />
      </span>
      <small>
        <span className="username">@{user.username}</span> &middot;{" "}
        {window.innerWidth <= 768
          ? formatDate(tweet.updatedAt ?? tweet.createdAt, "shortRelative")
          : formatDate(tweet.updatedAt ?? tweet.createdAt, "long")}
      </small>
      {children}
    </UserCardStyle>
  );
}
