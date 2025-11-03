import { useProfileNavigation } from "../../hooks";
import { UserBase } from "../../@types";
import { AvatarStyle } from "./AvatarStyle";

interface AvatarProps {
  user: UserBase;
  onClick?: () => void;
  disableClick?: boolean;
}
export function Avatar({ user, onClick, disableClick = false }: AvatarProps) {
  const { handleProfileClick } = useProfileNavigation();

  const handleClick = () => {
    if (disableClick) return;
    if (onClick) {
      onClick();
    } else {
      handleProfileClick(user.id);
    }
  };

  return (
    <AvatarStyle>
      <img
        src={user.avatarUrl}
        alt={user.name}
        onClick={handleClick}
        style={{ cursor: disableClick ? "default" : "pointer" }}
      />
    </AvatarStyle>
  );
}
