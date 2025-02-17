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
    background: ${({ theme }) => theme.background};
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
      h2 {
        font-size: 18px;
        font-weight: bold;
      }
      span {
        font-size: 14px;
        color: ${({ theme }) => theme.textSecondary};
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
        object-position: right;
      }
    }

    .avatar {
      position: absolute;
      top: 50%;
      margin-left: 20px;
      border: 1px solid ${({ theme }) => theme.backgroundColor};
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
    padding: 50px 20px 10px;

    .user {
      display: flex;
      gap: 10px;
      h2 {
        font-size: 20px;
        font-weight: bold;
      }
      .verified {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        border-radius: 9999px;
        padding: 0 10px;
        border: 1px solid ${({ theme }) => theme.highlight};
        color: ${({ theme }) => theme.primary};
        font-weight: bold;
        cursor: pointer;
      }
    }
    small {
      color: ${({ theme }) => theme.textSecondary};
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
    border-bottom: 1px solid ${({ theme }) => theme.highlight};
    .tabs {
      display: flex;
      justify-content: space-around;
      padding-top: 8px;

      button {
        background: none;
        border: none;
        font-size: 16px;
        font-weight: bold;
        padding: 10px;
        cursor: pointer;
        color: ${({ theme }) => theme.textSecondary};

        &:hover {
          color: ${({ theme }) => theme.primary};
        }

        &.active {
          color: ${({ theme }) => theme.textColor};
          border-bottom: 2px solid ${({ theme }) => theme.accent};
        }
      }
    }
    .tweets-content {
      border-top: 1px solid ${({ theme }) => theme.highlight};
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
