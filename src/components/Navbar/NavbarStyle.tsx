import styled from "styled-components";

export const NavbarStyle = styled.div`
  border-right: 1px solid #e6ecf0;
  flex: 0.35;
  min-width: 250px;
  padding: 10px 20px;

  a {
    text-decoration: none;
    color: inherit;
    div {
      padding: 0 10px;
    }
  }

  .icons {
    width: 1.7rem;
    height: auto;
    margin-right: 1rem;
  }

  .logo {
    margin-left: 10px;
    width: 2.5rem;
  }

  .account-button {
    position: fixed;
    bottom: 0;
    padding: 0 12px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 250px;
    transition: background-color 0.3s, transform 0.3s;

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
        height: 1.5em;
        max-width: 100%;
      }
    }

    &:hover {
      background-color: #e7e7e8;
    }
  }

  div {
    display: flex;
    align-items: center;
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

  .navbar-tweet {
    width: 100%;
    background-color: #1d9bf0;
    border: none;
    color: white;
    font-weight: 800;
    font-size: 15px;
    border-radius: 30px;
    height: 50px;
    margin-top: 1rem;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #1a8cd8;
      cursor: pointer;
    }

    .dots-image .menu {
      position: absolute;
      bottom: 0;
      right: -5px;
      padding: 5px 0;
      background: white;
      border-radius: 4px;
      transform: scale(0);
      transform-origin: bottom right;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
      transition: transform 0.2s ease;
      z-index: 1;
    }

    .dots-image:hover .menu {
      transform: scale(1);
    }

    .dots-image .menu li {
      height: 25px;
      font-size: 16px;
      margin-bottom: 2px;
      padding: 17px 15px;
      cursor: pointer;
      box-shadow: none;
      border-radius: 0;
      justify-content: flex-start;
    }

    .menu li:last-child {
      margin-bottom: 0;
    }

    .menu li:hover {
      background: var(--highlight-color);
    }

    .menu li i {
      padding-right: 8px;
    }
  }
`;
