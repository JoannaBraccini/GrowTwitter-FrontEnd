import { useState, useEffect } from "react";
import { useAppSelector } from "../store/hooks";

export function useLoading(initialMessage = "Aguarde...") {
  const loginLoad = useAppSelector((state) => state.userLogged.loading);
  const signupLoad = useAppSelector((state) => state.userSignup.loading);
  const userLoad = useAppSelector((state) => state.userDetail.loading);
  const userListLoad = useAppSelector((state) => state.usersList.loading);
  const tweetLoad = useAppSelector((state) => state.tweetDetail.loading);
  const tweetListLoad = useAppSelector((state) => state.tweetsList.loading);

  const loading =
    loginLoad ||
    signupLoad ||
    userLoad ||
    userListLoad ||
    tweetLoad ||
    tweetListLoad;
  const [loaderMessage, setLoaderMessage] = useState<string>(initialMessage);

  useEffect(() => {
    if (loading) {
      const messages = [
        "Aguarde...",
        "Só mais um momento...",
        "Estamos quase lá!",
      ];
      let index = 0;

      const interval = setInterval(() => {
        index = (index + 1) % messages.length;
        setLoaderMessage(messages[index]);
      }, 7000); // Altera a mensagem a cada 7 segundos

      return () => clearInterval(interval); // Limpa o intervalo
    } else {
      setLoaderMessage(initialMessage); // Reseta a mensagem ao terminar
    }
  }, [loading, initialMessage]);

  return {
    loading,
    loaderMessage,
  };
}
