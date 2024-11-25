import styled from "styled-components";

export const NavbarStyle = styled.div`
  border-right: 1px solid #e6ecf0;
  flex: 0.2;

  min-width: 250px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;

  div {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 20px;

    span,
    .logo-black {
      width: 1.75rem;
      height: 1.75rem;
      vertical-align: text-bottom;
      padding: 20px;
    }

    h2 {
      font-weight: 800;
      font-size: 20px;
      margin-right: 20px;
    }

    &:hover {
      background-color: #e6ecf0;
      border-radius: 30px;
      color: #50b7f5;
      transition: color 100ms ease-out;
    }
  }

  .active {
    color: #50b7f5;
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
