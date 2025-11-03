import styled from "styled-components";

export const ProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  .header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: ${({ theme }) => theme.backgroundColor};
    border-bottom: 1px solid ${({ theme }) => theme.highlight};
    padding: 5px 10px;
    display: flex;
    align-items: baseline;
    gap: 15px;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: auto;
      margin-bottom: auto;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;

      &:hover {
        border: 1px solid ${({ theme }) => theme.highlight};
      }
    }
    .data {
      flex: 1;
      h2 {
        font-size: 18px;
        font-weight: bold;
      }
      span {
        font-size: 14px;
        color: ${({ theme }) => theme.textSecondary};
      }
    }
    .search-icon {
      display: none;

      @media (max-width: 920px) {
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        margin-left: auto;

        svg {
          width: 20px;
          height: 20px;
        }

        &:hover {
          background-color: ${({ theme }) => theme.highlight};
        }
      }
    }
  }

  .banner {
    width: 100%;
    position: relative;
    .cover {
      width: 100%;
      height: 200px;
      background-color: ${({ theme }) => theme.highlight};
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    .avatar {
      position: absolute;
      top: 62%;
      margin-left: 18px;
      border: 3px outset ${({ theme }) => theme.backgroundColor};
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.highlight};
      img {
        width: 100%;
        height: 100%;

        border-radius: 50%;
        object-fit: cover;
        object-position: center;
      }
    }
    @media (max-width: 1024px) {
      .cover {
        height: 130px;
      }
      .avatar {
        top: 68%;
        width: 100px;
        height: 100px;
        margin-left: 10px;
      }
    }
    button {
      position: absolute;
      right: 0;
      margin: 10px;
      padding: 10px;
      border: 1px solid ${({ theme }) => theme.highlight};

      &:hover {
        background-color: ${({ theme }) => theme.highlight};
      }
    }
  }

  .details {
    padding: 75px 20px 10px;

    .user {
      display: flex;
      align-items: baseline;
      gap: 10px;
      flex-wrap: wrap; // Permite quebra de linha para elementos filhos
      h2 {
        font-size: 20px;
        font-weight: bold;
        white-space: nowrap;
      }

      .verified {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        border-radius: 9999px;
        height: 25px;
        padding: 0 10px;
        border: 1px solid ${({ theme }) => theme.highlight};
        color: ${({ theme }) => theme.accent};
        font-weight: bold;
        cursor: pointer;
        white-space: nowrap;

        @media (max-width: 1024px) {
          font-size: 12px;
          padding: 0 5px;
          margin-top: -5px;
        }

        &.hidden {
          border: none;
          cursor: default;
          padding: 0;
          img {
            width: 16px;
          }
        }
      }
    }
    small {
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
    }
    .bio {
      background: none;
      border: none;
      resize: none;
      width: 100%;
      font-size: 16px;
      color: ${({ theme }) => theme.textColor};
      padding: 10px 0;
      cursor: default;
    }
    .callendar {
      gap: 5px;
      display: flex;
      align-items: center;
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
    }
  }

  .follows {
    padding: 0 20px;
    display: flex;
    gap: 20px;
    font-size: 14px;

    span {
      color: ${({ theme }) => theme.textSecondary};

      strong {
        padding: 0 1px;
        color: ${({ theme }) => theme.textColor};
      }
    }
  }

  .tweets-section {
    margin-top: 10px;

    .tweets-content {
      .tweet {
        .retweet {
          font-size: 12px;
          color: ${({ theme }) => theme.textSecondary};
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* Estilo para respostas com tweet original */
        &.reply-thread {
          position: relative;

          .parent-tweet {
            position: relative;

            /* Linha vertical conectando os tweets */
            &::after {
              content: "";
              position: absolute;
              left: 32px; /* Centralizado no avatar */
              top: 50px; /* Começa mais cedo, logo abaixo do avatar */
              bottom: -25px; /* Estende bem mais para baixo para conectar ao próximo avatar */
              width: 2px;
              background-color: ${({ theme }) => theme.highlight};
            }

            @media (max-width: 1024px) {
              &::after {
                top: 48px;
                left: 36px;
                bottom: -25px;
              }
            }
          }

          .reply-indicator {
            display: none;
          }
        }
      }
      .empty-message {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: ${({ theme }) => theme.textSecondary};
      }
    }
  }

  /* Esconde a scrollbar para um design mais limpo */
  ::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
