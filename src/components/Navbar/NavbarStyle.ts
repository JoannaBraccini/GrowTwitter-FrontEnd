import styled from "styled-components";

export const NavbarStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  flex: 0.5;
  min-width: 260px;
  height: 100dvh;
  padding: 8px;
  gap: 8px;
  background-color: ${({ theme }) => theme.backgroundColor};
  z-index: 500;

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
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: bottom;
    gap: 5rem;
    margin-bottom: 1rem;
  }

  .logo {
    margin-bottom: 10px;
    margin-left: 1rem;
    width: 3rem;
  }

  .navbar-item {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 1rem 0;
    cursor: pointer;

    h2 {
      font-size: 20px;
      margin-right: 20px;
    }
  }

  .post-tweet {
    margin: 2rem 12px;
    max-width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: none; /* Esconde o ícone por padrão */
    }

    @media (max-width: 768px) {
      font-size: 0; /* Esconde o texto no mobile */
      justify-content: center; /* Centraliza o conteúdo */
      align-items: center;
      img {
        display: block; /* Garante que o ícone seja exibido no mobile */
        width: 50%; /* Ajusta o tamanho do ícone */
        height: 50%; /* Ajusta o tamanho do ícone */
      }
    }
  }

  .account-container {
    position: fixed;
    bottom: 5px;
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

  /* Adicionando estilos para dispositivos móveis */
  @media (max-width: 768px) {
    min-width: 60px;
    max-width: 60px;
    padding: 20px 0; /* Padding vertical para não cortar o logo */

    a {
      div {
        justify-content: center;
        padding: 12px 0;
        margin: 12px 0; /* Aumenta espaçamento vertical entre itens */

        &:hover {
          background-color: ${({ theme }) => theme.highlight};
        }
      }
    }

    .header {
      gap: 0rem;
      margin-bottom: 4rem; /* Aumenta espaço abaixo do header */
      flex-direction: column;
      align-items: center;
      padding: 0 5px 1rem 5px; /* Adiciona padding inferior */
    }

    .logo {
      width: 2rem;
      margin-left: 0;
    }

    .navbar-item {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin: 8px 0;
    }

    .icons {
      margin: 0;
      padding: 0;
      height: 28px;
      width: 28px;
    }

    div {
      flex-direction: column;
      align-items: center;

      h2 {
        display: none; /* Esconde os textos */
      }
    }

    .post-tweet {
      margin-top: 1rem;
      margin-left: 0;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        display: block;
        width: 20px;
        height: 20px;
        margin-left: 10px;
        margin-bottom: 2px;
      }
    }

    .account-container {
      width: 60px;
      .account-button {
        .account-data,
        .dots-image {
          display: none; /* Esconde os dados da conta */
        }
      }
    }
  }
`;
