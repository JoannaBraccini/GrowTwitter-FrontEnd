export const formatDate = (
  date: string | Date,
  formatType: "long" | "short" | "relative" = "short"
): string => {
  const dateObj = new Date(date);

  // Função para calcular o tempo relativo
  const formatRelativeTime = (date: string | Date): string => {
    const now = new Date();
    const dateObj = new Date(date);
    const diffInMs = now.getTime() - dateObj.getTime();

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Aproximadamente 30 dias por mês
    const years = Math.floor(months / 12); // Aproximadamente 12 meses por ano

    if (years > 0) {
      return `há ${years} ano${years > 1 ? "s" : ""}`;
    } else if (months > 0) {
      return `há ${months} mês${months > 1 ? "es" : ""}`;
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
    // Formato Mês por Extenso de yyyy
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
