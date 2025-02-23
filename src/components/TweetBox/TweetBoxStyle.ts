import styled from "styled-components";

export const TweetBoxStyle = styled.div`
  padding: 13px 10px 5px 15px;
  background-color: ${({ theme }) => theme.backgroundColor};

  form {
    display: flex;
    flex-direction: column;
  }

  .tweetbox-comment {
    padding-bottom: 10px;
    max-width: 500px;
    textarea {
      font-size: 14px;
      width: 100%;
    }
  }

  .tweetbox-content {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: ${({ theme }) => theme.backgroundColor};

    img {
      border-radius: 50%;
      height: 38px;
    }

    input {
      flex: 1;
      margin-left: 15px;
      min-height: 50px;
      max-height: 300px;
      font-size: 18px;
    }
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
