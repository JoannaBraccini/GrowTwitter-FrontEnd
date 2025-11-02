import { Tweet, UserBase } from "../../@types";

import { Avatar } from "../Avatar";
import React from "react";
import { UserCardStyle } from "./UserCardStyle";
import { useVerificationIcon } from "../../hooks";

interface UserCardProps {
  user: UserBase;
  tweet?: Tweet;
  children?: React.ReactNode;
  className?: string;
  hideAvatar?: boolean;
}

export function UserCard({
  user,
  children,
  className,
  hideAvatar = false,
}: UserCardProps) {
  const { icon, label } = useVerificationIcon(user);

  return (
    <UserCardStyle className={className}>
      {!hideAvatar && (
        <div className="avatar">
          <Avatar user={user} />
        </div>
      )}
      <h3>{user.name}</h3>
      <span className="verified">
        <img src={icon} alt={label} />
      </span>
      <small>
        <span className="username">@{user.username}</span>
      </small>
      {children}
    </UserCardStyle>
  );
}
