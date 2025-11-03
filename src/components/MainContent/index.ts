// MainContent styled component

import styled from "styled-components";

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  min-width: 45vw;
  overflow-y: auto;
  margin-left: 210px; /* Adiciona espaço para a largura da Navbar */
  margin-right: 27vw; /* Adiciona espaço para a largura da Sidebar */
  border-left: 1px solid ${({ theme }) => theme.highlight};
  border-right: 1px solid ${({ theme }) => theme.highlight};

  @media (max-width: 1024px) {
    margin-left: 60px;
    margin-right: 0;
    min-width: auto;
    max-width: calc(100vw - 60px);
    width: calc(100vw - 60px);
    border-right: none;
    flex: 1;
  }

  .content-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 20px;
    min-width: 50vw;

    @media (max-width: 768px) {
      min-width: auto;
      padding: 0;
    }
  }
`;
