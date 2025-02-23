import styled from "styled-components";

export const PostStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};
  flex: 1;
  padding: 15px;

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
        font-size: 16px;
      }
      .verified {
        img {
          width: 12px;
          height: 12px;
        }
      }
    }
    small {
      color: ${({ theme }) => theme.textSecondary};
      line-height: 22px;
    }
    .dots {
      margin-left: auto;
      cursor: pointer;
    }
  }

  .tweet-content {
    position: relative;
    display: flex;
    flex-direction: column;
    padding-left: 48px;
    padding-right: 5px;
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
      background-color: ${({ theme }) => theme.backgroundColor};
      border: 1px solid ${({ theme }) => theme.highlight};
      border-radius: 5px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      width: 150px;
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
  }
  .tweet-footer {
    padding: 10px 10px 0 48px;

    .icons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      cursor: pointer;

      span {
        width: 20px;
        height: 20px;
      }

      /* img {
        font-size: 14px;
        color: ${({ theme }) => theme.accent};
        margin-right: 5px;
        width: 100%;
      } */
      .actions {
        display: flex;
        align-items: baseline;
        justify-content: end;
        gap: 15px;
        width: 20px;
        height: 20px;
        margin-bottom: 10px;
      }
    }
  }
`;
