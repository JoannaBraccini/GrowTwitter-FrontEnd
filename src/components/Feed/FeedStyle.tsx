import styled from "styled-components";

export const FeedStyle = styled.div`
  flex: 0.5;
  border-right: 1px solid #e6ecf0;
  min-width: fit-content;
  overflow-y: scroll;

  .feed-header {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;
    border: 1px solid #e6ecf0;
    padding: 15px 20px;
  }

  .feed-header h2 {
    font-size: 20px;
    font-weight: 800;
  }

  -webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  /* tweet box */
  .tweetbox-input img {
    border-radius: 50%;
    height: 40px;
  }

  .tweetBox {
    padding-bottom: 10px;
    border-bottom: 8px solid #e6ecf0;
    padding-right: 10px;
  }

  .tweetBox form {
    display: flex;
    flex-direction: column;
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

  /* post */
  .post-avatar img {
    border-radius: 50%;
    height: 40px;
  }

  .post {
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid #e6ecf0;
    padding-bottom: 10px;
  }

  .post-body img {
    width: 450px;
    object-fit: contain;
    border-radius: 20px;
  }

  .post-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .post-badge {
    font-size: 14px !important;
    color: #50b7f5;
    margin-right: 5px;
  }

  .post-headerSpecial {
    font-weight: 600;
    font-size: 12px;
    color: gray;
  }

  .post-headerText h3 {
    font-size: 15px;
    margin-bottom: 5px;
  }

  .post-headerDescription {
    margin-bottom: 10px;
    font-size: 15px;
  }

  .post-body {
    flex: 1;
    padding: 10px;
  }

  .post-avatar {
    padding: 20px;
  }
`;
