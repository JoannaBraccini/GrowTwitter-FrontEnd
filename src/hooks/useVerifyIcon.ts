import { useMemo } from "react";
import verifiedGold from "../assets/verified-gold.svg";
import verifiedBlue from "../assets/verified-blue.svg";
import { Verified } from "../@types";

// Tipagem para o usuário, você pode ajustar conforme necessário
interface User {
  name: string;
  verified?: Verified;
}

export const useVerificationIcon = (user: User) => {
  return useMemo(() => {
    if (user.verified === "GOLD") {
      return { icon: verifiedGold, label: "Verificado Gold" };
    }
    if (user.verified === "BLUE") {
      return { icon: verifiedBlue, label: "Verificado Blue" };
    }
    return { icon: verifiedBlue, label: "Obter verificação" };
  }, [user]);
};
