import { CloseIcon } from "../../assets/icons";
import { ModalContent, ModalHeader, ModalStyle } from "./ModalStyle";

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
            <div>{children}</div>
          </ModalContent>
        </ModalStyle>
      ) : null}
    </>
  );
}
