import styled from "styled-components";

export const FeedStyle = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex: 1;

  .divider {
    border-bottom: 8px inset ${({ theme }) => theme.highlight};
  }

  .feed-header {
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 1px solid ${({ theme }) => theme.highlight};
    padding: 15px 20px 0 20px;
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
