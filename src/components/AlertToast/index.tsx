import { useEffect, useState } from "react";
import { ToastStyle } from "./ToastStyle";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { hideAlert } from "../../store/modules/alert/alertSlice";

export const AlertToast = () => {
  const dispatch = useAppDispatch();
  const { open, message, type } = useAppSelector((state) => state.alert);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.max(prev - 100 / (3000 / 100), 0));
    }, 100);

    const timeout = setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [open, dispatch]);

  if (!open) return null;

  return (
    <ToastStyle type={type}>
      <div className="toast-message">{message}</div>
      <div className="progress" style={{ width: `${progress}%` }} />
    </ToastStyle>
  );
};
