import styled from "styled-components";

export const TweetBoxStyle = styled.div`
  padding: 13px 10px 5px 15px;
  background-color: ${({ theme }) => theme.backgroundColor};
  form {
    display: flex;
    flex-direction: column;
  }

  .tweetbox-comment {
    display: flex;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 1px inset ${({ theme }) => theme.highlight};
    max-width: 500px;
    img {
      border-radius: 50%;
      height: 50px;
    }
    textarea {
      font-size: 16px;
      width: 100%;
      overflow: auto;
    }
  }

  .tweetbox-content,
  .tweetbox-reply {
    display: flex;
    align-items: start;
    padding-top: 10px;
    gap: 12px;
    background-color: ${({ theme }) => theme.backgroundColor};

    img {
      border-radius: 50%;
      height: 38px;
    }

    input,
    textarea {
      margin-left: 15px;
      font-size: 18px;
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

  .tweetbox-reply span {
    max-width: 450px;
    max-height: 450px;
  }

  .tweetbox-image-preview {
    display: flex;
    margin-top: 15px;
    margin-left: 48px;
    align-items: center;
    img {
      border: 2px outset ${({ theme }) => theme.highlight};
      max-width: 450px;
      max-height: 450px;
      object-fit: cover;
      border-radius: 16px;
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
    justify-content: end;
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
