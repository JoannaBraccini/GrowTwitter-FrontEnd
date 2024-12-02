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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { QueryFilter } from "../../types/user.type";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<QueryFilter>();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  function logout() {
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/sign");
  }

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
      <div className="account-button" onClick={toggleMenu}>
        <div className="account-image">
          <img src={userPhoto} alt={user?.name} />
        </div>
        <div className="account-data">
          {user ? (
            <>
              <span className="account-name">{user.name}</span>
              <span className="account-username">@{user.username}</span>
            </>
          ) : (
            //<span>Carregando...</span> // Caso o usuário ainda não tenha sido carregado
            <span className="account-name">{user}</span>
          )}
        </div>
        <div className="dots-image">
          <img src={dotsIcon} alt="Mais" />
          {isMenuOpen && (
            <div className="logout-menu">
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </NavbarStyle>
  );
}
