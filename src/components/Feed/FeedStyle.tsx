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
`;
