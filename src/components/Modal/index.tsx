import { ModalBody, ModalContent, ModalHeader, ModalStyle } from "./ModalStyle";

import { CloseIcon } from "../../assets/Icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, children, onClose }: ModalProps) {
  return (
    <>
      {isOpen ? (
        <ModalStyle onClick={onClose}>
          <ModalContent
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ModalHeader>
              <span onClick={onClose}>
                <CloseIcon />
              </span>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalContent>
        </ModalStyle>
      ) : null}
    </>
  );
}
