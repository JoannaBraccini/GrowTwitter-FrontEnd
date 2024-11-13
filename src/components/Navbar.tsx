import { Link } from "react-router-dom";
import { Navigation } from "../configs/navigations/types";

interface NavBarProps {
  navigations: Navigation[];
}

export function NavBar({ navigations }: NavBarProps) {
  return (
    <header>
      <Link to="/">
        <img src="" alt="Logo" />
      </Link>
      <nav>
        {navigations.map((nav) => {
          return <Link to={nav.to}>{nav.title}</Link>;
        })}

        <button>Login</button>
      </nav>
    </header>
  );
}
