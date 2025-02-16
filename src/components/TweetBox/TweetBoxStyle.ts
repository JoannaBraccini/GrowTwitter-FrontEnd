import styled from "styled-components";

export const TweetBoxStyle = styled.div`
  padding-bottom: 10px;
  padding-right: 10px;
  border-bottom: 8px inset ${({ theme }) => theme.highlight};

  form {
    display: flex;
    flex-direction: column;
  }

  .tweetbox-input {
    display: flex;
    padding: 20px;
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  .tweetbox-input img {
    border-radius: 50%;
    height: 38px;
  }

  .tweetbox-input input {
    flex: 1;
    margin-left: 20px;
    font-size: 18px;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.backgroundColor};
    &:focus {
      color: ${({ theme }) => theme.textColor};
    }
  }

  .tweetbox-links {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      margin-left: 70px;
      cursor: pointer;
    }
  }

  .tweetbox-tweetButton {
    margin: 5px 0;
    background-color: ${({ theme }) => theme.backgroundColor};
    &:hover {
      background-color: ${({ theme }) => theme.accent};
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
