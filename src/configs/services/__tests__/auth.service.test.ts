import { describe, it, expect, vi, beforeEach } from "vitest";
import { signupService, loginService } from "../auth.service";

// Mock do api.service - usando factory function para evitar hoisting issues
vi.mock("../api.service", () => ({
  api: {
    post: vi.fn(),
  },
}));

// Importar o mock após definir o mock
import { api } from "../api.service";
const mockPost = vi.mocked(api.post);

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("signupService", () => {
    const mockUser = {
      name: "Test User",
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    };

    it("should return success response on successful signup", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Usuário criado com sucesso",
          data: {
            id: "1",
            name: "Test User",
            username: "testuser",
            email: "test@example.com",
          },
        },
      };

      mockPost.mockResolvedValue(mockResponse);

      const result = await signupService(mockUser);

      expect(mockPost).toHaveBeenCalledWith("/signup", mockUser);
      expect(result).toEqual({
        ok: true,
        message: "Usuário criado com sucesso",
        data: {
          id: "1",
          name: "Test User",
          username: "testuser",
          email: "test@example.com",
        },
      });
    });

    it("should return error response on failed signup", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Email já existe",
          },
        },
      };

      mockPost.mockRejectedValue(mockError);

      const result = await signupService(mockUser);

      expect(result).toEqual({
        ok: false,
        message: "Erro ao criar conta",
      });
    });
  });

  describe("loginService", () => {
    const mockLoginData = {
      email: "test@example.com",
      password: "password123",
    };

    it("should return success response on successful login", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Login realizado com sucesso",
          data: {
            user: {
              id: "1",
              name: "Test User",
              email: "test@example.com",
            },
            token: "jwt.token.here",
          },
        },
      };

      mockPost.mockResolvedValue(mockResponse);

      const result = await loginService(mockLoginData);

      expect(mockPost).toHaveBeenCalledWith("/login", mockLoginData);
      expect(result).toEqual({
        ok: true,
        message: "Login realizado com sucesso",
        data: {
          user: {
            id: "1",
            name: "Test User",
            email: "test@example.com",
          },
          token: "jwt.token.here",
        },
      });
    });

    it("should return error response on failed login", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Credenciais inválidas",
          },
        },
      };

      mockPost.mockRejectedValue(mockError);

      const result = await loginService(mockLoginData);

      expect(result).toEqual({
        ok: false,
        message: "Erro ao fazer login",
      });
    });
  });
});
