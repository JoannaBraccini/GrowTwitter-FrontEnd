import { HeaderStyle } from "./HeaderStyle";

export function Header() {
  return (
    <HeaderStyle>
      <div className="logo-item">
        <i className="bx bx-menu" id="sidebarOpen"></i>
        <img src="images/logo.png" alt="" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="header-content">
        <i className="bi bi-grid"></i>
        <i className="bx bx-sun" id="darkLight"></i>
        <i className="bx bx-bell"></i>
        <img src="images/profile.jpg" alt="" className="profile" />
      </div>
    </HeaderStyle>
  );
}
