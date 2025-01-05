import styled from "styled-components";

export const ToggleButton = styled.div<{ isActive: boolean }>`
  position: relative;
  width: 64px;
  margin: 4px auto;

  button {
    width: 32px;
    height: 32px;
    background: white ${({ theme }) => theme.toggle} no-repeat center;
    border: 0;
    border-radius: 50%;

    position: absolute;
    z-index: 1;
    left: 0;
    transform: translateY(-50%);
    top: 50%;

    animation: ${({ isActive }) =>
      isActive ? `slide-in 0.2s forwards` : `slide-back 0.2s`};

    &:hover {
      outline: 8px solid ${({ theme }) => theme.accent};
    }
  }

  span {
    display: block;
    width: 64px;
    height: 24px;
    background: ${({ theme }) => theme.backgroundColor};
    border: 1px solid ${({ theme }) => theme.accent};
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 9999px;
  }
`;
