import { Button } from "../Button";
import { NavbarStyle } from "./NavbarStyle";
import HomeIcon from "../../assets/icons/homeIcon.svg";
import ExploreIcon from "../../assets/icons/exploreIcon.svg";
import NotificationIcon from "../../assets/icons/notificationIcon.svg";
import ProfileIcon from "../../assets/icons/profileIcon.svg";
import MoreIcon from "../../assets/icons/moreIcon.svg";

export function Navbar() {
  return (
    <NavbarStyle>
      <img className="logo-black"></img>
      <div className="active">
        <span>
          <HomeIcon />{" "}
        </span>
        <h2>Página Inicial</h2>
      </div>

      <div>
        <span>
          <ExploreIcon />{" "}
        </span>
        <h2>Explorar</h2>
      </div>

      <div>
        <span>
          <NotificationIcon />{" "}
        </span>
        <h2>Notificações</h2>
      </div>

      <div>
        <span>
          <ProfileIcon />{" "}
        </span>
        <h2>Perfil</h2>
      </div>

      <div>
        <span>
          <MoreIcon />{" "}
        </span>
        <h2>Mais</h2>
      </div>
      <Button>Postar</Button>

      <div></div>
    </NavbarStyle>
  );
}
