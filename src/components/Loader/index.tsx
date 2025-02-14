import { useLoading } from "../../hooks";
import { LoaderStyle } from "./LoaderStyle";

export interface LoaderProps {
  isLoading: boolean;
  message?: string;
}

export function Loader() {
  const { loading, loaderMessage } = useLoading();

  if (!loading) return null;

  return (
    <LoaderStyle>
      <span />
      <p>{loaderMessage}</p>
    </LoaderStyle>
  );
}
