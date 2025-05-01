import { LoaderStyle } from "./LoaderStyle";
import { useLoading } from "../../hooks";

export interface LoaderProps {
  isLoading: boolean;
  message?: string;
}

export function Loader() {
  const { loading, loaderMessage } = useLoading();

  // Evita renderizações desnecessárias
  if (!loading) return null;

  return (
    <LoaderStyle>
      <span />
      <p>{loaderMessage}</p>
    </LoaderStyle>
  );
}
