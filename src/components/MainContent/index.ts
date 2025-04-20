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

  @media (max-width: 768px) {
    margin-left: 76px; /* Ajusta para a largura menor da Navbar em telas pequenas */
    margin-right: 0; /* Remove o espaço da Sidebar em telas pequenas */
    max-width: 78vw; /* Garante que o MainContent não ultrapasse a largura da viewport */
  }

  .content-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 20px;
    min-width: 50vw;
  }
`;
