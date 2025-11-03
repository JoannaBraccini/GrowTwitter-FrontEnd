import styled from "styled-components";

export const PostStyle = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr; /* Avatar fixo de 40px + conteúdo flexível */
  gap: 12px; /* Espaço entre avatar e conteúdo */
  padding: 15px;
  padding-left: 12px;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};

  &.parent-tweet {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 8px;
  }

  .avatar-column {
    grid-row: 1 / -1; /* Avatar ocupa todas as linhas do post */
    width: 40px;
    height: 40px;
  }

  .content-column {
    display: flex;
    flex-direction: column;
    min-width: 0; /* Permite que o conteúdo encolha */
    border: none;
  }

  .header {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 4px;
    padding: 0;
    margin: 0;
    border: none;

    @media (max-width: 600px) {
      min-width: 0;
      gap: 2px;
    }

    .dots {
      margin-left: auto;
      flex-shrink: 0;
      cursor: pointer;
    }
    .menu {
      position: absolute;
      background-color: ${({ theme }) => theme.backgroundColor};
      top: 0;
      right: 0;

      .menu-options {
        padding: 5px 0;
        display: flex;
        flex-direction: column;
        gap: 5px;
        background-color: ${({ theme }) => theme.backgroundColor};
        border-radius: 5px;
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

  .tweet-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 17px;
    padding-right: 5px;

    @media (max-width: 768px) {
      font-size: 15px;
    }
    img {
      object-fit: contain;
      border: 1px solid ${({ theme }) => theme.highlight};
      border-radius: 20px;
      width: 100%;
      height: auto;
    }
  }
  .tweet-footer {
    padding: 10px 10px 0 0;

    .icons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;

      span.icon {
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

        &.like-button:hover {
          color: rgb(249, 24, 128); /* Cor rosa/vermelha no hover do like */
        }

        &.liked {
          color: rgb(249, 24, 128); /* Cor rosa/vermelha quando curtido */
        }

        &.retweeted {
          color: rgb(0, 255, 0); /* Cor verde quando retweetado */
        }

        &.replied {
          color: rgb(83, 200, 255); /* Cor azul quando respondido */
        }
      }

      .counter {
        font-size: 0.8rem;
        color: inherit; /* Herda a cor do pai no hover */
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
`;
