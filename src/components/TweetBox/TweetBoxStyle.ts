import styled from "styled-components";

export const TweetBoxStyle = styled.div`
  padding: 13px 10px 5px 5px;
  background-color: ${({ theme }) => theme.backgroundColor};
  form {
    display: flex;
    flex-direction: column;
  }

  .reply-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    width: 100%;
    max-width: 452px;

    .content {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: -16px;
      font-size: small;
      border-left: 2px solid ${({ theme }) => theme.highlight};
      padding-left: 24px;
      margin-left: 20px;

      .tweet-user {
        color: ${({ theme }) => theme.textSecondary};
      }
      span {
        color: ${({ theme }) => theme.accent};
      }
    }
  }

  .tweetbox-content {
    display: flex;
    align-items: start;
    padding: 10px;
    gap: 12px;
    background-color: ${({ theme }) => theme.backgroundColor};

    textarea {
      width: 100%;
      margin-left: 15px;
      font-size: 16px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.accent};
        border-radius: 4px;
      }
      &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.backgroundColor};
      }
    }
  }

  .tweetbox-retweet {
    display: flex;
    gap: 10px;
    max-width: 450px;
    img {
      border-radius: 50%;
      height: 50px;
      width: 50px;
      flex: none;
    }
    textarea {
      font-size: 18px;
      width: 100%;
      padding: 10px;
      overflow: auto;
    }
  }

  .retweet-content {
    display: flex;
    align-items: start;
    margin-left: 48px;
    gap: 12px;
    padding: 10px;
    width: fit-content;
    max-width: 452px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    border-top: 1px solid ${({ theme }) => theme.highlight};
    border-left: 1px solid ${({ theme }) => theme.highlight};
    border-right: 1px solid ${({ theme }) => theme.highlight};
    img {
      border-radius: 50%;
      height: 28px;
      flex: none;
    }
  }

  .tweetbox-image-preview {
    display: flex;
    margin-left: 48px;
    align-items: end;
    justify-content: center;
    width: fit-content;
    padding-top: 10px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.highlight};
    border-left: 1px solid ${({ theme }) => theme.highlight};
    border-right: 1px solid ${({ theme }) => theme.highlight};

    img {
      width: 100%;
      height: 100%;
      max-width: 450px;
      max-height: 450px;
      object-fit: contain;
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
    }
    span {
      width: 450px;
      height: 20px;
    }
  }

  .tweetbox-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    width: 100%;

    .image-link {
      margin-left: 50px;
      display: flex;
      gap: 5px;
      input {
        padding: 0 5px;
        width: 250px;
      }
    }
  }
  .tweetbox-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    width: 100%;
    .tweetbox-tweetButton {
      margin-top: 15px;
      background-color: ${({ theme }) => theme.backgroundColor};
      &:hover {
        background-color: ${({ theme }) => theme.accent};
      }
    }
  }

  @media (max-width: 768px) {
    .image-link {
      input {
        display: none; /* Esconde apenas o input no mobile */
      }
    }

    .tweetbox-actions {
      margin-right: 0; /* Remove margens extras */
      width: 100%; /* Garante que o botão respeite a largura disponível */
    }
  }

  .image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .image-modal-content img {
    max-width: 90%;
    max-height: 90vh;
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }
`;
