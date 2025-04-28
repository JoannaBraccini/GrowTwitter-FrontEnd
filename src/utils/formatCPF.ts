export const formatCPF = (cpf: string): string => {
  // Remove qualquer caractere que não seja número
  const cleanCPF = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cleanCPF.length !== 11) {
    return cpf; // Retorna o original se não for um CPF válido
  }

  // Formata corretamente
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};
