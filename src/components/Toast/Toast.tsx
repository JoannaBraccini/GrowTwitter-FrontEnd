import { useEffect, useState } from "react";
import { ToastService } from "./ToastStyle";

interface ToastProps {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
}

export const ToastResponse = ({
  message,
  type,
  duration,
  onClose,
}: ToastProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 100 / (duration! / 100), 0));
    }, 100);

    const timeout = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  return (
    <ToastService type={type!}>
      <div className="toast-message">{message}</div>
      <div className="progress" style={{ width: `${progress}%` }} />
    </ToastService>
  );
};
