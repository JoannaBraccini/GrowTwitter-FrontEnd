import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogStyle,
} from "./DialogStyle";

import { CloseIcon } from "../../assets/Icons";
import { createPortal } from "react-dom";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  usePortal?: boolean; // Define se o componente deve usar createPortal
  showHeader?: boolean; // Define se o cabeçalho com botão de fechar deve ser exibido
}

export function Dialog({
  isOpen,
  onClose,
  children,
  usePortal = true,
  showHeader = true,
}: DialogProps) {
  if (!isOpen) return null;

  const dialogContent = (
    <DialogStyle onClick={onClose}>
      <DialogContent
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
        }}
      >
        {showHeader && (
          <DialogHeader>
            <span onClick={onClose}>
              <CloseIcon />
            </span>
          </DialogHeader>
        )}
        <DialogBody>{children}</DialogBody>
      </DialogContent>
    </DialogStyle>
  );

  return usePortal ? createPortal(dialogContent, document.body) : dialogContent;
}
