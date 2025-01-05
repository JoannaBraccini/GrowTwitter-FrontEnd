import { Button } from "../Button";
import { NavbarStyle } from "./NavbarStyle";
import logoBlack from "/icons/logo-black.svg";
import homeWhite from "/icons/home-white.svg";
import homeBlack from "/icons/home-black.svg";
import exploreWhite from "/icons/explore-white.svg";
import exploreBlack from "/icons/explore-black.svg";
import notificationWhite from "/icons/notification-white.svg";
import notificationBlack from "/icons/notification-black.svg";
import profileWhite from "/icons/profile-white.svg";
import profileBlack from "/icons/profile-black.svg";
import userPhoto from "/icons/user-photo.svg";
import dotsIcon from "/icons/dots.svg";
import logoutIcon from "/icons/logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { LoginResponse } from "../../types";
import { getUser } from "../../utils";
import { ToggleButton } from "../ToggleButton";

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
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleMenuToggle = () => setIsMenuOpen((open) => !open);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/sign");
  }

  return (
    <NavbarStyle>
      <img
        className="logo"
        src={logoBlack}
        alt="Logo"
        onClick={() => (user ? navigate("/feed") : navigate("/"))}
      />
      <ToggleButton
        isActive={isActive}
        onClick={() => setIsActive((prev) => !prev)}
      >
        <button></button>
        <span></span>
      </ToggleButton>
      {navItems.map(({ icon, iconActive, label, alt, to }) => (
        <Link key={label} to={to}>
          <div className={location.pathname === to ? "active" : ""}>
            <img
              className="icons"
              src={location.pathname === to ? iconActive : icon}
              alt={alt}
              aria-label={`Navegar para ${label}`}
            />
            <h2
              style={{ fontWeight: location.pathname === to ? "700" : "400" }}
            >
              {label}
            </h2>
          </div>
        </Link>
      ))}
      <Button fullWidth shadow size="large" className="navbar-tweet">
        Postar
      </Button>

      {user && ( //mostra somente se retornado o user
        <div className="account-container" ref={menuRef}>
          <div
            className="account-button"
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-label="Abrir menu da conta"
          >
            <div className="account-image">
              <img src={userPhoto} alt={user.name} />
            </div>
            <div className="account-data">
              <span className="account-name">{user.name}</span>
              <span className="account-username">@{user.username}</span>
            </div>
            <div className="dots-image">
              <img src={dotsIcon} alt="Mais" />
            </div>
          </div>
          {isMenuOpen && ( //mostra somente se menu aberto
            <ul className="navbar-menu">
              <li onClick={logout}>
                <img src={logoutIcon} alt="Logout" />
                Logout
              </li>
            </ul>
          )}
        </div>
      )}
    </NavbarStyle>
  );
}
