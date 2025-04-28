import { useState, useEffect } from "react";

export function useLoading(initialMessage = "Aguarde...") {
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading,
  };
}
