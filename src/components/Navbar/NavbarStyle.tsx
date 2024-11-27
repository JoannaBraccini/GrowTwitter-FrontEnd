import styled from "styled-components";

export const NavbarStyle = styled.div`
  border-right: 2px solid #e6ecf0;
  flex: 0.2;

  min-width: 250px;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 20px;

  .icons,
  .logo {
    width: 2rem;
    height: auto;
    margin-right: 1rem;
  }

  .logo {
    margin: auto;
    width: 2.5rem;
  }

  .account-button {
    padding: 0;
    border-radius: 9999px;
    outline: 1px dotted red;
    margin: 1rem auto;
    cursor: crosshair;

    .account-image {
      img {
        border-radius: 100%;
        width: 40px;
        height: 40px;
      }
    }

    .account-user {
      padding: 0;
      display: flex;
      flex-direction: column;
      text-overflow: unset;

      .account-name {
        color: #0f1419;
      }

      .account-email {
        color: #536471;
      }
    }

    &:hover {
      color: #e7e7e8;
    }
  }

  div {
    display: flex;
    align-items: center;
    padding: 12px;
    margin: 1rem 0;
    cursor: pointer;

    h2 {
      font-weight: 400;
      font-size: 20px;
      margin-right: 20px;
    }

    &:hover {
      background-color: #e7e7e8;
      border-radius: 9999px;
      transition: color 0.2s ease-out;
    }
  }

  .active {
    font-weight: 800;
  }

  .navbar-tweet {
    width: 100%;
    background-color: #1d9bf0;
    border: none;
    color: white;
    font-weight: 900;
    border-radius: 30px;
    height: 50px;
    margin-top: 1rem;

    &:hover {
      background-color: #1a8cd8;
      cursor: pointer;
    }
  }
`;
