import styled from "styled-components";

export const TweetPageStyle = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex: 1;

  .page-header {
    display: flex;
    align-items: center;
    gap: 10px;
    position: sticky;
    top: 0;
    z-index: 100;
    padding-top: 15px;

    button {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 20px;
      width: 40px;
    }
  }

  .title {
    font-size: 20px;
    font-weight: 800;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  -webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
