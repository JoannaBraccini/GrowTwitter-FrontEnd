import styled from "styled-components";

export const PostStyle = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};
  flex: 1;
  padding: 15px;
  padding-left: 8px;
  position: relative;

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
    padding: 0;
    margin: 0;
    border: none;

    .dots {
      margin-left: auto;
      cursor: pointer;
    }
  }

  .tweet-content {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: -15px;
    padding-left: 46px;
    padding-right: 5px;
    gap: 10px;
    z-index: 10;
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
      top: 0;
      right: 0;

      .menu-options {
        padding: 5px 0;
        display: flex;
        flex-direction: column;
        gap: 5px;
        background-color: ${({ theme }) => theme.backgroundColor};
        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.highlight};
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      }
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

      span {
        color: #626161;
        height: 20px;
        width: auto;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px; /* Espaço entre o ícone e o contador */

        &:hover {
          color: rgb(83, 200, 255); /* Cor padrão no hover */
        }

        &.green:hover {
          color: rgb(0, 255, 0); /* Cor verde no hover */
        }

        &.red:hover {
          color: rgb(255, 0, 0); /* Cor vermelha no hover */
        }
      }

      span.liked {
        color: rgb(255, 0, 0); /* Cor vermelha quando curtido */
      }

      span.retweeted {
        color: rgb(0, 255, 0); /* Cor verde quando retweetado */
      }

      span.replied {
        color: rgb(83, 200, 255); /* Cor azul quando respondido */
      }

      .counter {
        font-size: 0.8rem;
        color: inherit; /* Herda a cor do pai no hover */
        margin-top: 5px;
      }

      .actions {
        display: flex;
        align-items: baseline;
        justify-content: end;
        gap: 15px;
        width: 20px;
        height: 20px;
        margin-bottom: 10px;

        @media (max-width: 768px) {
          margin-left: 10px;
          gap: 5px;
        }
      }
    }
  }

  .like-button.liked {
    color: red;
  }

  .icon.like-button {
    display: flex;
    align-items: center;
    gap: 4px; /* Ajuste para garantir espaçamento consistente entre o ícone e o contador */
  }
`;
