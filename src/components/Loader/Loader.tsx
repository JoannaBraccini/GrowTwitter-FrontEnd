import { LoaderStyle } from "./LoaderStyle";

export interface LoaderProps {
  isLoading: boolean;
  message?: string;
}

export function Loader({ isLoading, message }: LoaderProps) {
  if (!isLoading) return null;

  return (
    <LoaderStyle>
      <span />
      <p>{message}</p>
    </LoaderStyle>
  );
}
