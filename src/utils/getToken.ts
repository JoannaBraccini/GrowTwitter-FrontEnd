export function getToken(): string | null {
  try {
    const sessionToken = sessionStorage.getItem("token");
    const localToken = localStorage.getItem("token");

    return sessionToken || localToken || null;
  } catch (error) {
    console.error("Erro ao buscar token no storage:", error);
    return null;
  }
}
