import styled from "styled-components";

export const NavbarStyle = styled.div`
  flex: 0.5;
  min-width: 250px;
  margin-left: 1rem;
  padding: 8px;
  border-right: 1px solid #ececec;

  a {
    padding-top: 12px;
    text-decoration: none;
    color: inherit;
    div {
      padding: 12px;
      margin: 0;

      &:hover {
        background-color: #e7e7e8;
        border-radius: 9999px;
        transition: color 0.2s ease-out;
      }
    }
  }

  .icons {
    width: 1.7rem;
    height: auto;
    margin-right: 1rem;
  }

  .logo {
    margin-left: 10px;
    margin-bottom: 10px;
    width: 2.5rem;
  }

  div {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    cursor: pointer;

    h2 {
      font-size: 20px;
      margin-right: 20px;
    }
  }

  .navbar-tweet {
    margin-top: 1rem;

    &:hover {
      background-color: #1a8cd8;
      cursor: pointer;
    }
  }

  .account-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 300px;
    border-radius: 9999px;
    background-color: #fff;
    transition: background-color 0.3s, transform 0.3s;
    &:hover {
      background-color: #e7e7e8;
    }

    .account-button {
      display: flex;
      align-items: center;
      padding: 0 12px;
      width: 100%;
      height: 30px;

      .account-image img {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        padding: 0;
        margin-right: 12px;
      }

      .account-data {
        display: flex;
        flex-direction: column;
        text-overflow: unset;
        align-items: stretch;
        padding: 0;
        width: 100%;

        .account-name {
          font-size: 14px;
          color: #0f1419;
          padding: 0;
          font-weight: bold;
          white-space: nowrap;
          flex-shrink: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .account-username {
          color: #536471;
          padding: 0;
        }
      }

      .dots-image {
        width: 100%;
        display: flex;
        justify-content: end;
        img {
          height: 24px;
          max-width: 100%;
        }
      }
    }

    .navbar-menu {
      position: absolute;
      top: -40px;
      right: -50px;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      &:hover {
        background-color: #e7e7e8;
      }

      li {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 4px 8px;

        img {
          margin-right: 8px;
          height: 24px;
          max-width: 100%;
        }
      }
    }
  }
`;
