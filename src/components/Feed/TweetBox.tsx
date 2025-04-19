import styled from "styled-components";

export const TweetBox = styled.div`
  padding-bottom: 10px;
  border-bottom: 8px solid #e6ecf0;
  padding-right: 10px;

  form {
    display: flex;
    flex-direction: column;
  }

  .tweetbox-input img {
    border-radius: 50%;
    height: 40px;
  }

  .tweetbox-input {
    display: flex;
    padding: 20px;
  }

  .tweetbox-input input {
    flex: 1;
    margin-left: 20px;
    font-size: 20px;
    border: none;
    outline: none;
  }

  .tweetBox-tweetButton {
    background-color: #50b7f5;
    border: none;
    color: white;
    font-weight: 900;

    border-radius: 30px;
    width: 80px;
    height: 40px;
    margin-top: 20px;
    margin-left: auto;
  }
`;
