import { Button } from "../Button";
import { NavbarStyle } from "./NavbarStyle";
import logoBlack from "../../assets/icons/logo-black.svg";
import homeWhite from "../../assets/icons/home-white.svg";
import homeBlack from "../../assets/icons/home-black.svg";
import exploreWhite from "../../assets/icons/explore-white.svg";
import exploreBlack from "../../assets/icons/explore-black.svg";
import notificationWhite from "../../assets/icons/notification-white.svg";
import notificationBlack from "../../assets/icons/notification-black.svg";
import profileWhite from "../../assets/icons/profile-white.svg";
import profileBlack from "../../assets/icons/profile-black.svg";
import userPhoto from "../../assets/Icons/user-photo.svg";
import dotsIcon from "../../assets/Icons/dots.svg";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    icon: homeWhite,
    iconActive: homeBlack,
    label: "Página Inicial",
    alt: "Página Inicial",
    to: "/",
  },
  {
    icon: exploreWhite,
    iconActive: exploreBlack,
    label: "Explorar",
    alt: "Explorar",
    to: "/explore",
  },
  {
    icon: notificationWhite,
    iconActive: notificationBlack,
    label: "Notificações",
    alt: "Notificações",
    to: "/notifications",
  },
  {
    icon: profileWhite,
    iconActive: profileBlack,
    label: "Perfil",
    alt: "Perfil",
    to: "/profile",
  },
];

export function Navbar() {
  const location = useLocation();

  return (
    <NavbarStyle>
      <img className="logo" src={logoBlack} alt="Logo" />
      {navItems.map(({ icon, iconActive, label, alt, to }) => (
        <Link key={label} to={to}>
          <div className={location.pathname === to ? "active" : ""}>
            <span>
              <img
                className="icons"
                src={location.pathname === to ? iconActive : icon}
                alt={alt}
              />
            </span>
            <h2
              style={{ fontWeight: location.pathname === to ? "700" : "400" }}
            >
              {label}
            </h2>
          </div>
        </Link>
      ))}
      <Button className="navbar-tweet">Postar</Button>
      <div className="account-button">
        <div className="account-image">
          <img src={userPhoto} alt="Foto do Usuário" />
        </div>
        <div className="account-data">
          <span className="account-name">User Name</span>
          <span className="account-username">@username</span>
        </div>
        <div className="dots-image">
          <img src={dotsIcon} alt="Mais" />
        </div>
      </div>
    </NavbarStyle>
  );
}
