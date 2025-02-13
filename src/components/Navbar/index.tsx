import { Button } from "../Button";
import { NavbarStyle } from "./NavbarStyle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ToggleButton } from "../ToggleButton";
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
} from "../../assets/icons";
import { Modal } from "../Modal";
import { TweetBox } from "../TweetBox";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useTheme } from "../../configs/providers/useTheme";
const navItems = [
  {
    icon: <HomeIcon />,
    iconActive: <HomeFill />,
    label: "Página Inicial",
    alt: "Página Inicial",
    to: "/feed",
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
    to: "/profile",
  },
];

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userLogged);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { theme, toggleTheme } = useTheme();

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

  function logout() {
    dispatch(logout);
    navigate("/sign");
  }

  function createTweet(): void {
    throw new Error("Function not implemented yet.");
  }

  return (
    <NavbarStyle>
      <div className="topWrapper">
        <div
          className="logo"
          onClick={() => (user ? navigate("/feed") : navigate("/"))}
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
          <div className={location.pathname === to ? "active" : ""}>
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
        fullWidth
        shadow
        size="large"
        className="navbar-tweet"
        onClick={handleModal}
      >
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
              <img src={user.avatarUrl} alt={user.name} />
            </div>
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
              <li onClick={logout}>
                <LogoutIcon />
                Logout
              </li>
            </ul>
          )}
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Postar"
      >
        <TweetBox
          key="tweet-box"
          userPhoto={user.avatarUrl}
          userName={user.name}
          onTweetSubmit={createTweet}
        />
      </Modal>
    </NavbarStyle>
  );
}
