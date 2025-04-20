import styled from "styled-components";

export const ModalStyle = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: auto; /* Permite rolagem vertical se o conteúdo exceder a altura */
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 40%;
  max-height: 90%; /* Permite que o conteúdo ocupe até 90% da altura da tela */
  overflow-y: auto; /* Adiciona rolagem interna se o conteúdo exceder o limite */
  flex-grow: 1; /* Permite que o conteúdo cresça dentro do modal */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0; /* Garante que o modal não tenha margens externas */

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  span {
    transform: scale(1.4);
    cursor: pointer;
    margin-top: 10px;

    @media (max-width: 768px) {
      justify-self: flex-start;
      align-self: flex-start;
      margin-left: 10px;
    }
  }
`;

export const ModalBody = styled.div`
  width: 100%;
`;
