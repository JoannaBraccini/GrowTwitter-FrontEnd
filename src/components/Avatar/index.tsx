import { useProfileNavigation } from "../../hooks";
import { UserBase } from "../../@types";
import { AvatarStyle } from "./AvatarStyle";

interface AvatarProps {
  user: UserBase;
}
export function Avatar({ user }: AvatarProps) {
  const { handleProfileClick } = useProfileNavigation();

  return (
    <AvatarStyle>
      <img
        src={user.avatarUrl}
        alt={user.name}
        onClick={() => handleProfileClick(user.id)}
      />
    </AvatarStyle>
  );
}
