export interface Notification {
  id: string;
  userId: string; // ID do usuário relacionado à notificação
  message: string; // Descrição da notificação (ex: "Fulana seguiu você")
  timestamp: string; // Data/hora da notificação
}
