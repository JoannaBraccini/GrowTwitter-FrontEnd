import { SidebarStyle } from "./SidebarStyle";

export function Sidebar() {
  return (
    <SidebarStyle>
      <div className="sidebar-input">
        <span className="icons sidebar-searchIcon"> Buscar </span>
        <input type="text" placeholder="Buscar" />
      </div>

      <div className="sidebar-widgetContainer">
        <h2>O que está acontencendo?</h2>
        <blockquote className="twitter-tweet">
          <p lang="pt-br" dir="ltr">
            Ao vivo no X<a href="">@user</a>.<a href="">#live</a>
            <a href="">#sunset</a>
            <a href="">pic</a>
          </p>
          &mdash; notícias (@user)
          <a href="">20 de Novembro de 2024</a>
        </blockquote>
      </div>
    </SidebarStyle>
  );
}
