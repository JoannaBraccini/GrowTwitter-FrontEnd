import styled from "styled-components";

export interface TabProps {
  paddingTop?: string;
}

export const TabsStyle = styled.div<TabProps>`
  display: flex;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none; /* Oculta a barra de rolagem */
  }

  justify-content: space-around;
  padding-top: ${({ paddingTop }) => paddingTop ?? 0};

  button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: ${({ theme }) => theme.textSecondary};
    padding-bottom: 15px;

    &:hover {
      color: ${({ theme }) => theme.accent};
    }

    &.active {
      color: ${({ theme }) => theme.textColor};
      font-weight: bold;
      position: relative; /* Necessário para o posicionamento do pseudo-elemento */

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: ${({ theme }) => theme.accent};
        border-radius: 50px; /* Borda arredondada */
      }
    }
  }

  /* Removido o comportamento de empilhamento vertical */
`;

TabsStyle.shouldForwardProp = (prop) => prop !== "paddingTop";
