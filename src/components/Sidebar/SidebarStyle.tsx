import styled from "styled-components";

export const SidebarStyle = styled.div`
  flex: 0.3;

  .sidebar-input {
    display: flex;
    align-items: center;
    background-color: #e6ecf0;
    padding: 10px;
    border-radius: 20px;
    margin-top: 10px;
    margin-left: 20px;
  }

  .sidebar-input input {
    border: none;
    background-color: #e6ecf0;
  }

  .sidebar-searchIcon {
    color: gray;
  }

  .sidebar-widgetContainer {
    margin-top: 15px;
    margin-left: 20px;
    padding: 20px;
    background-color: #f5f8fa;
    border-radius: 20px;
  }

  .sidebar-widgetContainer h2 {
    font-size: 18px;
    font-weight: 800;
  }
`;
