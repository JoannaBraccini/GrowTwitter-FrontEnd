import styled from "styled-components";

export const ToggleButton = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 64px;
  margin: 4px auto;

  button {
    width: 32px;
    height: 32px;
    background: #e4e4e4 ${({ theme }) => theme.toggle} no-repeat center;
    border: 0;
    border-radius: 50%;
    cursor: pointer;

    position: absolute;
    z-index: 1;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.2s ease-in-out;

    /* Controlando a animação do botão */
    ${({ isActive }) =>
      isActive
        ? `transform: translateX(32px) translateY(-50%);` /* Move para a direita */
        : `transform: translateX(0) translateY(-50%);`} /* Posição inicial */

    &:hover {
      outline: 2px solid ${({ theme }) => theme.accent};
    }
  }

  span {
    display: block;
    width: 64px;
    height: 24px;
    background: ${({ theme }) => theme.backgroundColor};
    border: 2px solid ${({ theme }) => theme.accent};
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 9999px;
  }
`;
