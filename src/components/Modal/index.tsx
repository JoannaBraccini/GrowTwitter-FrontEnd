import { ModalContent, ModalHeader, ModalStyle } from "./ModalStyle";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, children, title, onClose }: ModalProps) {
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
              <h2>{title}</h2>
            </ModalHeader>

            <div>{children}</div>
          </ModalContent>
        </ModalStyle>
      ) : null}
    </>
  );
}
