import { Follow, Tweet, User } from "../../@types";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserDetails,
  getUsers,
} from "../../store/modules/users/usersActions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";

import { Button } from "../Button";
import { ExploreIcon } from "../../assets/Icons";
import { SidebarStyle } from "./SidebarStyle";
import { Trend } from "../../@types/trends.type";
import { getTweets } from "../../store/modules/tweets/tweetsActions";
import { setTrends } from "../../store/modules/trends/trendsSlice";
import { showAlert } from "../../store/modules/alert/alertSlice";
import { useVerificationIcon } from "../../hooks";

export function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userLogged);
  const { users } = useAppSelector((state) => state.usersList);
  const { tweets } = useAppSelector((state) => state.tweetsList);
  const { trends } = useAppSelector((state) => state.trends);
  const [follow, setFollow] = useState<User[]>([]);
  const { icon, label } = useVerificationIcon(user);
  const [userDetails, setUserDetails] = useState<User>();

  // Dispara a ação getUsers e getTweets ao carregar o componente
  useEffect(() => {
    dispatch(getUsers({}));
    dispatch(getTweets({ page: 1, take: 100 }));
  }, [dispatch]);

  useEffect(() => {
    if (user.id && !userDetails) {
      // Verifica se o userDetails já foi carregado
      const fetchUserDetails = async () => {
        try {
          const data = await dispatch(getUserDetails(user.id)).unwrap();
          setUserDetails(data.data);
        } catch {
          dispatch(
            showAlert({
              message: "Erro ao carregar os detalhes do usuário:",
              type: "error",
            })
          );
        }
      };
      fetchUserDetails();
    }
  }, [dispatch, user.id, userDetails]); // Adicionando dependência de user.id

  // Filtrar os usuários que não estão sendo seguidos
  useEffect(() => {
    if (userDetails) {
      const followList = users.filter((userItem) => {
        return !userDetails.following.some(
          (follow: Follow) => follow.id === userItem.id
        );
      });
      setFollow(followList);
    }
  }, [userDetails, users]); // Depende apenas de userDetails e users

  // Calcular tendências com base nos tweets
  useEffect(() => {
    if (tweets.length > 0) {
      const trendMap: {
        [key: string]: Trend;
      } = {};

      tweets.forEach((tweet: Tweet) => {
        const hashtags = tweet.content?.match(/#[^\s#]+/gi) || [];
        hashtags.forEach((hashtag) => {
          const topic = formatTopic(hashtag.toLowerCase());
          if (trendMap[topic]) {
            trendMap[topic].posts.push(tweet);
          } else {
            trendMap[topic] = {
              category: "Assuntos do Momento",
              topic,
              posts: [tweet],
            };
          }
        });
      });

      const trendList = Object.values(trendMap).sort(
        (a, b) => b.posts.length - a.posts.length
      );
      dispatch(setTrends(trendList));
    }
  }, [tweets, dispatch]);

  function formatTopic(topic: string): string {
    const formattedTopic = topic.replace(/^#/, ""); // Remove o #
    return formattedTopic.charAt(0).toUpperCase() + formattedTopic.slice(1); // Capitaliza a primeira letra
  }

  function handleTrendClick(trend: Trend) {
    navigate(`/explore/${trend.topic.toLowerCase()}`);
  }

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
          {trends.slice(0, 4).map((trend, index) => (
            <li key={index} onClick={() => handleTrendClick(trend)}>
              <p className="trend-category">{trend.category}</p>
              <strong className="trend-topic">{trend.topic}</strong>
              <p className="trend-posts">
                {trend.posts.length} {trend.posts.length > 1 ? "posts" : "post"}
              </p>
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
                    {label !== "Obter verificação" && (
                      <span className="verified">
                        <img src={icon} alt={label} />
                      </span>
                    )}
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
