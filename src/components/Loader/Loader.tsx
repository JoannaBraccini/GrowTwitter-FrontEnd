import { LoaderStyle } from "./LoaderStyle";

export interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) return null;

  return (
    <LoaderStyle>
      <span />
    </LoaderStyle>
  );
}
