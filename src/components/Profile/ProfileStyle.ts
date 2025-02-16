import styled from "styled-components";

export const ProfileStyle = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex: 1;
  /* padding-right: 10px; */
  overflow-y: auto;

  .header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: ${({ theme }) => theme.background};
    border-bottom: 1px solid ${({ theme }) => theme.highlight};
    padding: 15px 20px;
    display: flex;
    align-items: center;
    gap: 15px;

    h2 {
      font-size: 18px;
      font-weight: bold;
    }
    span {
      font-size: 14px;
      color: ${({ theme }) => theme.textSecondary};
    }
  }

  .banner {
    position: relative;
    width: 100%;
    .cover {
      width: 100%;
      height: 200px;
      background-color: ${({ theme }) => theme.highlight};
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .details {
    padding: 50px 20px 10px;
    h2 {
      font-size: 20px;
      font-weight: bold;
    }
    .verified {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 14px;
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
    }
    small {
      color: ${({ theme }) => theme.textSecondary};
    }
    textarea {
      background: none;
      border: none;
      resize: none;
      width: 100%;
      font-size: 16px;
      color: ${({ theme }) => theme.text};
      margin-top: 5px;
      padding: 5px 0;
    }
    p {
      display: flex;
      align-items: center;
      gap: 5px;
      color: ${({ theme }) => theme.textSecondary};
      font-size: 14px;
    }
  }

  .follows {
    padding: 0 20px;
    display: flex;
    gap: 20px;
    font-size: 14px;

    p {
      color: ${({ theme }) => theme.textSecondary};

      strong {
        color: ${({ theme }) => theme.text};
      }
    }
  }

  .tweets-section {
    margin-top: 10px;
    border-top: 1px solid ${({ theme }) => theme.highlight};
    .tabs {
      display: flex;
      justify-content: space-around;
      padding: 10px 0;
      border-bottom: 1px solid ${({ theme }) => theme.highlight};

      button {
        background: none;
        border: none;
        font-size: 14px;
        padding: 10px;
        cursor: pointer;
        color: ${({ theme }) => theme.textSecondary};
        border-bottom: none;

        &:hover {
          color: ${({ theme }) => theme.primary};
        }

        &.active {
          color: ${({ theme }) => theme.primary};
          border-bottom: 2px solid ${({ theme }) => theme.primary};
        }
      }
    }
    .tweets-content {
      padding: 10px 20px;
      .tweet {
        .tweet {
          padding: 10px 0;
          border-bottom: 1px solid ${({ theme }) => theme.highlight};

          .retweet {
            font-size: 12px;
            color: ${({ theme }) => theme.textSecondary};
            display: flex;
            align-items: center;
            gap: 5px;
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
