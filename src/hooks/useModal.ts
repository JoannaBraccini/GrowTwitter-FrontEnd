import { useState } from "react";

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalOpen(false);
  };

  return {
    modalOpen,
    modalContent,
    openModal,
    closeModal,
  };
};
