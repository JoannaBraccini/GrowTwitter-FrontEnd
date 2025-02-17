import styled from "styled-components";

export const PostStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};
  flex: 1;

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
    padding: 0;
    margin: 0;

    .user {
      display: flex;
      align-items: flex-start;
      width: 100%;
      gap: 5px;
      h3 {
        font-weight: bold;
        line-height: 16px;
      }
      .verified {
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
    small {
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
    }
    .dots {
      margin-left: auto;
    }
  }

  .tweet-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 15px;
    img {
      object-fit: contain;
      border: 1px solid ${({ theme }) => theme.highlight};
      border-radius: 20px;
      width: 100%;
      height: auto;
    }

    .menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: ${({ theme }) => theme.background};
      border: 1px solid ${({ theme }) => theme.highlight};
      border-radius: 5px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      width: 150px; /* Ajuste o tamanho conforme necessário */
      display: none; /* Inicialmente invisível */
      flex-direction: column;
      padding: 5px 0;

      /* Estilos para os botões */
      button {
        padding: 8px 12px;
        border: none;
        background: none;
        text-align: left;
        cursor: pointer;
        font-size: 14px;
        color: ${({ theme }) => theme.textColor};

        &:hover {
          background-color: ${({ theme }) => theme.highlight};
        }
      }
    }

    .tweet-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .icons {
      display: flex;
      flex-direction: row;
      width: 40px;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      img {
        font-size: 14px;
        color: ${({ theme }) => theme.accent};
        margin-right: 5px;
        width: 100%;
      }
      .actions {
        display: flex;
        width: 60px;
        justify-content: space-between;
        align-items: end;
        padding-bottom: 6px;
      }
    }
  }
`;
