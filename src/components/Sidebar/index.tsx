import { Link } from "react-router-dom";
import { ExploreIcon } from "../../assets/icons";
import { SidebarStyle } from "./SidebarStyle";
import { Button } from "../Button";
import verifiedGold from "../../assets/verified-gold.svg";
import verifiedBlue from "../../assets/verified-blue.svg";

const trends = [
  {
    category: "Entretenimento · Assunto do Momento",
    topic: "#GoldenGlobes",
    posts: "310 mil posts",
  },
  {
    category: "Assunto do Momento em Brasil",
    topic: "Bridgerton",
    posts: "6.378 posts",
  },
  {
    category: "Minecraft · Assunto do Momento",
    topic: "Minecraft",
    posts: "56,6 mil posts",
  },
  {
    category: "Notícias · Assuntos do Momento",
    topic: "Racista",
    posts: "48 mil posts",
  },
];
const follow = [
  {
    name: "g1",
    user: "g1",
    verified: "gold",
  },
  {
    name: "Central Reality #BBB25",
    user: "centralreality",
    verified: "blue",
  },
  {
    name: "Dr Disrespect",
    user: "DrDisrespect",
    verified: "blue",
  },
];

export function Sidebar() {
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
                    {person.verified && (
                      <img
                        src={
                          person.verified === "gold"
                            ? verifiedGold
                            : verifiedBlue
                        }
                        alt="Verificado"
                      />
                    )}
                  </strong>
                  <p className="trend-user">@{person.user}</p>
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
