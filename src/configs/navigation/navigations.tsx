import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const NavigationComponent = () => {
  const { username } = useAppSelector((state) => state.userDetail.user);

  const navigations = [
    { title: "Feed", to: "/" },
    { title: "Login", to: "/sign" },
    { title: "Explore", to: "/explore" },
  ];

  return (
    <div>
      {navigations.map((nav, index) => (
        <div key={index}>
          <a href={nav.to}>{nav.title}</a>
        </div>
      ))}

      {username && (
        <div>
          <Link to={`/${username}`}>Posts</Link>
          <ul>
            <li>
              <Link to={`/${username}/replies`}>Respostas</Link>
            </li>
            <li>
              <Link to={`/${username}/likes`}>Curtidas</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavigationComponent;
