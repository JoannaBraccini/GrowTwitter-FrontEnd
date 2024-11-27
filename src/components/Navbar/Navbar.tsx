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
import userPhoto from "../../assets/docs/Icons/dark_color/MARCAÇAO_FOTO_PERFIL.svg";
import { useState } from "react";

const navItems = [
  {
    icon: homeWhite,
    iconActive: homeBlack,
    label: "Página Inicial",
    alt: "Página Inicial",
  },
  {
    icon: exploreWhite,
    iconActive: exploreBlack,
    label: "Explorar",
    alt: "Explorar",
  },
  {
    icon: notificationWhite,
    iconActive: notificationBlack,
    label: "Notificações",
    alt: "Notificações",
  },
  {
    icon: profileWhite,
    iconActive: profileBlack,
    label: "Perfil",
    alt: "Perfil",
  },
];

export function Navbar() {
  const [activeItem, setActiveItem] = useState(-1);

  return (
    <NavbarStyle>
      <img className="logo" src={logoBlack} alt="Logo"></img>
      {navItems.map(({ icon, iconActive, label, alt }, index) => (
        <div key={label} onClick={() => setActiveItem(index)}>
          <span>
            <img
              className="icons"
              src={activeItem === index ? iconActive : icon}
              alt={alt}
            />
          </span>
          <h2>{label}</h2>
        </div>
      ))}
      <Button className="navbar-tweet">Postar</Button>
      <div className="account-button">
        <div className="account-image">
          <img src={userPhoto} alt="Foto do Usuário" />
        </div>
        <div className="account-user">
          <span className="account-name">Usuário</span>
          <span className="account-email">email</span>
        </div>
      </div>
    </NavbarStyle>
  );
}
