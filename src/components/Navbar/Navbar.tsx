import { Button } from "../Button";
import { NavbarStyle } from "./NavbarStyle";
import logoBlack from "../../assets/icons/logo_black.svg";
import homeIcon from "../../assets/icons/homeIcon.svg";
import exploreIcon from "../../assets/icons/exploreIcon.svg";
import notificationIcon from "../../assets/icons/notificationIcon.svg";
import profileIcon from "../../assets/icons/profileIcon.svg";
import moreIcon from "../../assets/icons/moreIcon.svg";

const navItems = [
  { icon: homeIcon, label: "Página Inicial", alt: "Página Inicial" },
  { icon: exploreIcon, label: "Explorar", alt: "Explorar" },
  { icon: notificationIcon, label: "Notificações", alt: "Notificações" },
  { icon: profileIcon, label: "Perfil", alt: "Perfil" },
  { icon: moreIcon, label: "Mais", alt: "Mais" },
];

export function Navbar() {
  return (
    <NavbarStyle>
      <img className="logo" src={logoBlack} alt="Logo"></img>
      {navItems.map(({ icon, label, alt }) => (
        <div key={label}>
          <span>
            <img className="icons" src={icon} alt={alt} />
          </span>
          <h2>{label}</h2>
        </div>
      ))}
      <Button>Postar</Button>

      <div></div>
    </NavbarStyle>
  );
}
