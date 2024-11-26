import styled from "styled-components";

export const NavbarStyle = styled.div`
  border-right: 2px solid #e6ecf0;
  flex: 0.2;

  min-width: 250px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;

  .icons,
  .logo {
    width: 2rem;
    height: auto;
    margin-right: 1rem;
    vertical-align: text-bottom;
  }

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 15px;

    h2 {
      font-weight: 400;
      font-size: 20px;
      margin-right: 20px;
    }

    &:hover {
      background-color: #e7e7e8;
      border-radius: 30px;
      transition: color 0.2s ease-out;
    }
  }

  .active {
    font-weight: 800;
  }

  .navbar-tweet {
    width: 100%;
    background-color: #50b7f5;
    border: none;
    color: white;
    font-weight: 900;
    border-radius: 30px;
    height: 50px;
    margin-top: 20px;
  }

  .logo-black {
    color: #50b7f5;
    font-size: 30px;
  }
`;
