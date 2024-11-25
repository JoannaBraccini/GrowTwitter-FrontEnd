import { SidebarStyle } from "./SidebarStyle";

export function Sidebar() {
  return (
    <SidebarStyle>
      <div className="sidebar-input">
        <span className="icons sidebar-searchIcon"> search </span>
        <input type="text" placeholder="Search Twitter" />
      </div>

      <div className="sidebar-widgetContainer">
        <h2>What's happening?</h2>
        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            Sunset
            <a href="">@user</a>.<a href="">#nature</a>
            <a href="">#sunset</a>
            <a href="">pic</a>
          </p>
          &mdash; news (@user)
          <a href="">May 5, 2014</a>
        </blockquote>
      </div>
    </SidebarStyle>
  );
}
