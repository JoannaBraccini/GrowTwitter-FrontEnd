import styled from "styled-components";

export const SidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right: 1rem;
  padding: 0 8px;
  min-width: 250px;
  flex: 0.5;
  border-left: 1px solid #ececec;

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
