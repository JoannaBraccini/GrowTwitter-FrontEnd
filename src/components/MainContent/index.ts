// MainContent styled component
import styled from "styled-components";

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 44vw;
  overflow: hidden;

  .content-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 20px;
    min-width: 37.5vw;
  }
`;
