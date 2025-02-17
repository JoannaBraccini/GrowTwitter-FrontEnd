import { Link } from "react-router-dom";
import { ExploreIcon } from "../../assets/icons";
import { SidebarStyle } from "./SidebarStyle";
import { Button } from "../Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { fetchTrends } from "../../store/modules/trends/trendsSlice";
import { getUsers } from "../../store/modules/users/usersActions";
import { User } from "../../types";
import { useVerificationIcon } from "../../hooks";

export function Sidebar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userLogged);
  const { trends } = useAppSelector((state) => state.trends);
  const { users } = useAppSelector((state) => state.usersList);
  const [follow, setFollow] = useState<User[]>([]);
  const { icon, label } = useVerificationIcon(user);

  // Dispara a ação fetchTrends ao carregar o componente
  useEffect(() => {
    dispatch(fetchTrends());
    dispatch(getUsers({}));
    const followList = users.filter((flwrs) =>
      flwrs.followers.find((usr) => usr.followerId !== user.id)
    );
    setFollow(followList);
  }, [dispatch, user.id, users]);

  return (
    <SidebarStyle>
      {/* Busca */}
      <div className="sidebar-input">
        <ExploreIcon />
        <input type="text" placeholder="Buscar" />
      </div>
      {/* Assuntos do momento */}
      <div className="sidebar-trends">
        <h2>O que está acontecendo?</h2>
        <ul>
          {trends.map((trend, index) => (
            <li key={index}>
              <p className="trend-category">{trend.category}</p>
              <strong className="trend-topic">{trend.topic}</strong>
              <p className="trend-posts">{trend.posts}</p>
            </li>
          ))}
        </ul>
        <Link to="/explore">Mostrar mais</Link>
      </div>
      {/* Quem seguir */}
      <div className="sidebar-trends">
        <h2>Quem seguir</h2>
        <ul>
          {follow.map((person, index) => (
            <li key={index}>
              <div className="trend-category">
                <div>
                  <strong className="trend-topic">
                    {person.name}
                    <span className="verified">
                      <img src={icon} alt={label} />
                      {label === "Obter verificação" && label}
                    </span>
                  </strong>
                  <p className="trend-user">@{person.username}</p>
                </div>
                <Button className="trend-button" size="small">
                  Seguir
                </Button>
              </div>
            </li>
          ))}
        </ul>
        <Link to="/explore">Mostrar mais</Link>
      </div>
    </SidebarStyle>
  );
}
