import {
  DotsIcon,
  ExploreFill,
  ExploreIcon,
  HomeFill,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  NotificationFill,
  NotificationIcon,
  ProfileFill,
  ProfileIcon,
} from "../../assets/Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";

import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { NavbarStyle } from "./NavbarStyle";
import { ToggleButton } from "../ToggleButton";
import { Tweet } from "../../@types";
import { TweetBox } from "../TweetBox";
import { showAlert } from "../../store/modules/alert/alertSlice";
import tweetIcon from "../../assets/post-mobile.svg";
import { useCreateTweet } from "../../hooks/useCreateTweet";
import { useLogout } from "../../hooks/useLogout";
import { useTheme } from "../../configs/providers/useTheme";
import { validateToken } from "../../store/modules/auth/validateTokenSlice";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { handleLogout } = useLogout();
  const { handleCreateTweet } = useCreateTweet(() => setIsModalOpen(false));
  const { user, token } = useAppSelector((state) => state.userLogged);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    {
      icon: <HomeIcon />,
      iconActive: <HomeFill />,
      label: "Página Inicial",
      alt: "Página Inicial",
      to: "/home",
    },
    {
      icon: <ExploreIcon />,
      iconActive: <ExploreFill />,
      label: "Explorar",
      alt: "Explorar",
      to: "/explore",
    },
    {
      icon: <NotificationIcon />,
      iconActive: <NotificationFill />,
      label: "Notificações",
      alt: "Notificações",
      to: "/notifications",
    },
    {
      icon: <ProfileIcon />,
      iconActive: <ProfileFill />,
      label: "Perfil",
      alt: "Perfil",
      to: `/${user.username}`,
    },
  ];

  const getIcon = (
    pathname: string,
    to: string,
    icon: JSX.Element,
    iconActive: JSX.Element
  ) => {
    return pathname === to ? iconActive : icon;
  };

  const handleMenuToggle = () => setIsMenuOpen((open) => !open);
  const handleModal = () => setIsModalOpen((open) => !open);

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

  useEffect(() => {
    const validateUserToken = async () => {
      try {
        const isValid = await dispatch(validateToken(token)).unwrap();
        if (!isValid) {
          dispatch(
            showAlert({
              message: "Token inválido ou expirado. Faça login novamente.",
              type: "error",
            })
          );
          handleLogout();
        }
      } catch {
        dispatch(
          showAlert({
            message: "Erro ao validar o token. Faça login novamente.",
            type: "error",
          })
        );
        handleLogout();
      }
    };

    if (token) {
      validateUserToken();
    }
  }, [dispatch, handleLogout, token]);

  return (
    <NavbarStyle>
      <div className="header navbar-item">
        <div
          className="logo"
          onClick={() => (user ? navigate("/home") : navigate("/sign"))}
        >
          <LogoIcon />
        </div>
        <ToggleButton onClick={toggleTheme} isActive={theme === "dark"}>
          <button></button>
          <span></span>
        </ToggleButton>
      </div>
      {navItems.map(({ icon, iconActive, label, to }) => (
        <Link key={label} to={to}>
          <div
            className={`navbar-item ${
              location.pathname === to ? "active" : ""
            }`}
          >
            <div className="icons">
              {getIcon(location.pathname, to, icon, iconActive)}
            </div>
            <h2
              style={{ fontWeight: location.pathname === to ? "700" : "400" }}
            >
              {label}
            </h2>
          </div>
        </Link>
      ))}
      <Button
        fullwidth
        shadow
        size="large"
        className="post-tweet"
        onClick={handleModal}
      >
        <img src={tweetIcon} alt="Postar" /> {/* Ícone exibido no mobile */}
        Postar {/* Texto exibido em telas maiores */}
      </Button>
      {user && ( //mostra somente se retornado o user
        <div className="account-container" ref={menuRef}>
          <div
            className="account-button"
            onClick={handleMenuToggle}
            aria-expanded={isMenuOpen}
            aria-label="Abrir menu da conta"
          >
            <Avatar user={user} />
            <div className="account-data">
              <span className="account-name">{user.name}</span>
              <span className="account-username">@{user.username}</span>
            </div>
            <div className="dots-image">
              <DotsIcon />
            </div>
          </div>
          {isMenuOpen && ( //mostra somente se menu aberto
            <ul className="navbar-menu">
              <li onClick={handleLogout}>
                <LogoutIcon />
                Logout
              </li>
            </ul>
          )}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TweetBox
          key="tweet-box"
          tweetUser={user}
          tweet={{} as Tweet}
          onTweetSubmit={handleCreateTweet}
          mode="create"
        />
      </Modal>
    </NavbarStyle>
  );
}
