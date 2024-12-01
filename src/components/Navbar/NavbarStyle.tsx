import styled from "styled-components";

export const NavbarStyle = styled.div`
  border-right: 2px solid #e6ecf0;
  flex: 0.2;
  min-width: 250px;
  padding: 20px;

  a {
    text-decoration: none;
    color: inherit;
  }

  .icons {
    width: 1.6rem;
    height: auto;
    margin-right: 1rem;
  }

  .logo {
    width: 2.5rem;
  }

  .account-button {
    font-family: var(--Montserrat);
    letter-spacing: 1px;
    position: fixed;
    bottom: 0;
    padding: 12px;
    border-radius: 9999px;
    cursor: pointer;
    background-color: green;
    flex-direction: row;
    align-items: center;

    img {
      align-items: flex-end;
      height: 1.25em;
      max-width: 100%;
    }

    .account-image {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      padding: 0;
    }

    div {
      flex-direction: column;
      text-overflow: unset;
      align-items: start;
      padding: 0;
    }

    .account-name {
      color: #0f1419;
      padding: 0;
    }
    .account-email {
      color: #536471;
      padding: 0;
    }

    &:hover {
      background-color: #e7e7e8;
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
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.3s;

    &:hover {
      background-color: #1a8cd8;
      cursor: pointer;
    }
  }
`;
