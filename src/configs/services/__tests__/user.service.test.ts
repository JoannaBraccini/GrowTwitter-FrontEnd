import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  followUserService,
  getUsersService,
  getUserDetailsService,
  updateUserService,
  deleteUserService,
} from "../user.service";

// Mock do api.service
vi.mock("../api.service", () => ({
  api: {
    patch: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

// Importar o mock após definir o mock
import { api } from "../api.service";
const mockPatch = vi.mocked(api.patch);
const mockGet = vi.mocked(api.get);
const mockPut = vi.mocked(api.put);
const mockDelete = vi.mocked(api.delete);

describe("UserService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("followUserService", () => {
    it("should follow user successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Usuário seguido com sucesso",
          data: { id: "follow1", followerId: "user1", followingId: "user2" },
        },
      };

      mockPatch.mockResolvedValue(mockResponse);

      const result = await followUserService("user2", "test-token");

      expect(mockPatch).toHaveBeenCalledWith(
        "/users/follow/user2",
        {},
        { headers: { Authorization: "Bearer test-token" } }
      );
      expect(result.ok).toBe(true);
      expect(result.message).toBe("Usuário seguido com sucesso");
    });

    it("should handle follow error", async () => {
      const mockError = {
        response: {
          data: {
            message: "Usuário não encontrado",
          },
        },
      };

      mockPatch.mockRejectedValue(mockError);

      const result = await followUserService("user2", "test-token");

      expect(result.ok).toBe(false);
      expect(result.message).toBe("Usuário não encontrado");
    });
  });

  describe("getUsersService", () => {
    it("should get users successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Usuários encontrados",
          data: [
            { id: "1", name: "User 1", username: "user1" },
            { id: "2", name: "User 2", username: "user2" },
          ],
        },
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await getUsersService({ name: "User" }, "test-token");

      expect(mockGet).toHaveBeenCalledWith("/users", {
        headers: { Authorization: "Bearer test-token" },
        params: { name: "User", username: undefined, email: undefined },
      });
      expect(result.ok).toBe(true);
      expect(result.data).toHaveLength(2);
    });

    it("should handle get users error", async () => {
      const mockError = {
        response: {
          data: {
            message: "Erro ao buscar usuários",
          },
        },
      };

      mockGet.mockRejectedValue(mockError);

      const result = await getUsersService({}, "test-token");

      expect(result.ok).toBe(false);
      expect(result.message).toBe("Erro ao buscar usuários");
    });
  });

  describe("getUserDetailsService", () => {
    it("should get user details successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Detalhes do usuário encontrados",
          data: { id: "user1", name: "Test User", username: "testuser" },
        },
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await getUserDetailsService("user1", "test-token");

      expect(mockGet).toHaveBeenCalledWith("/users/user1", {
        headers: { Authorization: "Bearer test-token" },
      });
      expect(result.ok).toBe(true);
      expect(result.data?.id).toBe("user1");
    });

    it("should handle get user details error", async () => {
      const mockError = {
        response: {
          data: {
            message: "Usuário não encontrado",
          },
        },
      };

      mockGet.mockRejectedValue(mockError);

      const result = await getUserDetailsService("user1", "test-token");

      expect(result.ok).toBe(false);
      expect(result.message).toBe("Usuário não encontrado");
    });
  });

  describe("updateUserService", () => {
    it("should update user successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Usuário atualizado com sucesso",
          data: { id: "user1", name: "Updated Name", username: "testuser" },
        },
      };

      mockPut.mockResolvedValue(mockResponse);

      const result = await updateUserService("test-token", {
        id: "user1",
        name: "Updated Name",
      });

      expect(mockPut).toHaveBeenCalledWith(
        "/users/user1",
        { name: "Updated Name" },
        { headers: { Authorization: "Bearer test-token" } }
      );
      expect(result.ok).toBe(true);
      expect(result.message).toBe("Usuário atualizado com sucesso");
    });

    it("should handle update user error", async () => {
      const mockError = {
        response: {
          data: {
            message: "Erro ao atualizar usuário",
          },
        },
      };

      mockPut.mockRejectedValue(mockError);

      const result = await updateUserService("test-token", {
        id: "user1",
        name: "Updated Name",
      });

      expect(result.ok).toBe(false);
      expect(result.message).toBe("Erro ao atualizar usuário");
    });
  });

  describe("deleteUserService", () => {
    it("should delete user successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Conta deletada com sucesso",
          data: null,
        },
      };

      mockDelete.mockResolvedValue(mockResponse);

      const result = await deleteUserService("test-token", "user1");

      expect(mockDelete).toHaveBeenCalledWith("/users/user1", {
        headers: { Authorization: "Bearer test-token" },
      });
      expect(result.ok).toBe(true);
      expect(result.message).toBe("Conta deletada com sucesso");
    });

    it("should handle delete user error", async () => {
      const mockError = {
        response: {
          data: {
            message: "Usuário não encontrado",
          },
        },
      };

      mockDelete.mockRejectedValue(mockError);

      const result = await deleteUserService("test-token", "user1");

      expect(result.ok).toBe(false);
      expect(result.message).toBe("Usuário não encontrado");
    });
  });
});
