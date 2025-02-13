export const formatDate = (
  date: string | Date,
  formatType: "long" | "short" | "relative" = "short"
): string => {
  const dateObj = new Date(date);

  // Função para formatar a data como "9 de fev"
  const formatToShortMonth = (dateObj: Date): string => {
    const months = [
      "jan",
      "fev",
      "mar",
      "abr",
      "mai",
      "jun",
      "jul",
      "ago",
      "set",
      "out",
      "nov",
      "dez",
    ];
    return `${dateObj.getDate()} de ${months[dateObj.getMonth()]}`;
  };

  // Função para calcular o tempo relativo (até 31 dias)
  const formatRelativeTime = (date: string | Date): string => {
    const now = new Date();
    const dateObj = new Date(date);
    const diffInMs = now.getTime() - dateObj.getTime();
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 31) {
      return formatToShortMonth(dateObj); // Se for mais que 31 dias, retorna a data no formato "9 de fev"
    } else if (days > 0) {
      return `há ${days} dia${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `há ${hours} hora${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `há ${minutes} minuto${minutes > 1 ? "s" : ""}`;
    } else {
      return `há ${seconds} segundo${seconds > 1 ? "s" : ""}`;
    }
  };

  // Formato dd/mm/yyyy
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Meses começam de 0
  const year = dateObj.getFullYear();

  if (formatType === "short") {
    return `${day}/${month}/${year}`;
  } else if (formatType === "long") {
    // Formato "Mês de yyyy"
    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];
    const monthName = months[dateObj.getMonth()];

    return `${monthName} de ${year}`;
  } else if (formatType === "relative") {
    return formatRelativeTime(date); // Chama a função que calcula o tempo relativo
  }

  return ""; // Caso nenhum tipo de formato seja fornecido
};
