import styled from "styled-components";

export const NavbarStyle = styled.div`
  position: sticky;
  top: 0;
  flex: 0.5;
  min-width: 260px;
  margin-left: 1rem;
  padding: 8px;
  border-right: 1px solid ${({ theme }) => theme.highlight};

  a {
    padding-top: 12px;
    text-decoration: none;
    color: inherit;
    div {
      padding: 7px 12px;
      margin: 5px 0;

      &:hover {
        background-color: ${({ theme }) => theme.highlight};
        border-radius: 9999px;
        transition: color 0.2s ease-out;
      }
    }
  }

  .icons {
    align-self: center;
    height: auto;
    margin-right: 1rem;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: bottom;
    gap: 6rem;
    margin-bottom: 1rem;
  }

  .logo {
    margin-bottom: 10px;
    width: 3rem;
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

  .post-tweet {
    margin-top: 2rem;
    max-width: 220px;
  }

  .account-container {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 240px;
    border-radius: 9999px;
    background-color: ${({ theme }) => theme.backgroundColor};
    transition: background-color 0.3s, transform 0.3s;
    &:hover {
      background-color: ${({ theme }) => theme.highlight};
    }

    .account-button {
      display: flex;
      align-items: center;
      padding: 10px;
      width: 100%;
      height: 25px;
      gap: 5px;
      img {
        width: 40px;
        height: 40px;
      }

      .account-data {
        display: flex;
        flex-direction: column;
        text-overflow: unset;
        align-items: stretch;

        margin-left: 5px;
        width: 100%;

        .account-name {
          font-size: 15px;
          color: ${({ theme }) => theme.textSecondary};
          padding: 0;
          font-weight: bold;
          white-space: nowrap;
          flex-shrink: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .account-username {
          color: ${({ theme }) => theme.textExtra};
          padding: 0;
          font-size: 14px;
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
      background-color: ${({ theme }) => theme.backgroundColor};
      border: 1px solid ${({ theme }) => theme.highlight};
      border-radius: 4px;
      padding: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      &:hover {
        background-color: ${({ theme }) => theme.highlight};
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
