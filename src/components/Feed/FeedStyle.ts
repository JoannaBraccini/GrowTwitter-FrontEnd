import styled from "styled-components";

export const FeedStyle = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  flex: 1;

  .feed-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: ${({ theme }) => theme.backgroundColor};
  }

  .feed-header h2 {
    display: none; /* Oculto no desktop e tablet */
    font-size: 20px;
    font-weight: 800;

    @media (max-width: 600px) {
      display: block;
      padding: 12px 16px 28px;
    }
  }

  -webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
