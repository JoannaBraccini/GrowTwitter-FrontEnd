import styled from "styled-components";

export const DialogStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const DialogPopupContent = styled.div`
  display: flex;
  width: auto;
  margin: 0 auto; // Centraliza o popup na tela
  padding: 12px;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px; // Reduz o espaçamento entre os botões no mobile
  }
`;

export const DialogContent = styled.div`
  background: ${({ theme }) =>
    theme.backgroundColor}; // Usa a cor de fundo do tema
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 500px;
`;

export const DialogHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 6px;
  span {
    cursor: pointer;
  }
`;

export const DialogBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
