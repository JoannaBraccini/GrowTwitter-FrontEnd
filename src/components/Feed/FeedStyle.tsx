import styled from "styled-components";

export const FeedStyle = styled.div`
  display: flex;
  flex-direction: column;
  min-width: fit-content;
  overflow-y: scroll;
  flex: 1;

  .feed-header {
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid #e6ecf0;
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
`;
