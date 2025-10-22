import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  postTweetService,
  likeTweetService,
  retweetService,
  getTweetsService,
  getFeedService,
  getTweetDetailsService,
  updateTweetService,
  deleteTweetService,
} from "../tweet.service";

// Mock do api.service
vi.mock("../api.service", () => ({
  api: {
    post: vi.fn(),
    patch: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

// Importar o mock após definir o mock
import { api } from "../api.service";
const mockPost = vi.mocked(api.post);
const mockPatch = vi.mocked(api.patch);
const mockGet = vi.mocked(api.get);
const mockPut = vi.mocked(api.put);
const mockDelete = vi.mocked(api.delete);

describe("TweetService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("postTweetService", () => {
    const mockTweetData = {
      content: "Test tweet content",
      tweetType: "TWEET" as const,
      userId: "user1",
    };

    it("should post tweet successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Tweet criado com sucesso",
          data: {
            id: "tweet1",
            content: "Test tweet content",
            tweetType: "TWEET",
            userId: "user1",
          },
        },
      };

      mockPost.mockResolvedValue(mockResponse);

      const result = await postTweetService("test-token", mockTweetData);

      expect(mockPost).toHaveBeenCalledWith("/tweets", mockTweetData, {
        headers: { Authorization: "Bearer test-token" },
      });
      expect(result).toEqual({
        ok: true,
        message: "Tweet criado com sucesso",
        data: {
          id: "tweet1",
          content: "Test tweet content",
          tweetType: "TWEET",
          userId: "user1",
        },
      });
    });

    it("should handle post tweet error", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Erro ao criar tweet",
          },
        },
      };

      mockPost.mockRejectedValue(mockError);

      const result = await postTweetService("test-token", mockTweetData);

      expect(result).toEqual({
        ok: false,
        message: "Erro ao criar tweet",
      });
    });
  });

  describe("likeTweetService", () => {
    it("should like tweet successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Tweet curtido com sucesso",
          data: {
            id: "like1",
            tweetId: "tweet1",
            userId: "user1",
          },
        },
      };

      mockPatch.mockResolvedValue(mockResponse);

      const result = await likeTweetService("tweet1", "test-token");

      expect(mockPatch).toHaveBeenCalledWith(
        "/tweets/like/tweet1",
        {},
        {
          headers: { Authorization: "Bearer test-token" },
        }
      );
      expect(result).toEqual({
        ok: true,
        message: "Tweet curtido com sucesso",
        data: {
          id: "like1",
          tweetId: "tweet1",
          userId: "user1",
        },
      });
    });

    it("should handle like tweet error", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Tweet não encontrado",
          },
        },
      };

      mockPatch.mockRejectedValue(mockError);

      const result = await likeTweetService("tweet1", "test-token");

      expect(result).toEqual({
        ok: false,
        message: "Tweet não encontrado",
      });
    });
  });

  describe("retweetService", () => {
    const mockRetweetData = {
      tweetId: "tweet1",
      comment: "Great tweet!",
    };

    it("should retweet successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Retweet realizado com sucesso",
          data: {
            id: "retweet1",
            tweetId: "tweet1",
            userId: "user1",
            comment: "Great tweet!",
          },
        },
      };

      mockPatch.mockResolvedValue(mockResponse);

      const result = await retweetService(mockRetweetData, "test-token");

      expect(mockPatch).toHaveBeenCalledWith(
        "/tweets/retweet/tweet1",
        { comment: "Great tweet!" },
        {
          headers: { Authorization: "Bearer test-token" },
        }
      );
      expect(result).toEqual({
        ok: true,
        message: "Retweet realizado com sucesso",
        data: {
          id: "retweet1",
          tweetId: "tweet1",
          userId: "user1",
          comment: "Great tweet!",
        },
      });
    });

    it("should handle retweet error", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Erro ao retweetar",
          },
        },
      };

      mockPatch.mockRejectedValue(mockError);

      const result = await retweetService(mockRetweetData, "test-token");

      expect(result).toEqual({
        ok: false,
        message: "Erro ao retweetar",
      });
    });
  });

  describe("getTweetsService", () => {
    it("should get tweets successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Tweets encontrados",
          data: [
            {
              id: "tweet1",
              content: "Tweet content 1",
              userId: "user1",
            },
            {
              id: "tweet2",
              content: "Tweet content 2",
              userId: "user2",
            },
          ],
        },
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await getTweetsService(
        { page: 1, take: 10, search: "test" },
        "test-token"
      );

      expect(mockGet).toHaveBeenCalledWith("/tweets", {
        headers: { Authorization: "Bearer test-token" },
        params: {
          page: 1,
          take: 10,
          search: "test",
        },
      });
      expect(result).toEqual({
        ok: true,
        message: "Tweets encontrados",
        data: [
          {
            id: "tweet1",
            content: "Tweet content 1",
            userId: "user1",
          },
          {
            id: "tweet2",
            content: "Tweet content 2",
            userId: "user2",
          },
        ],
      });
    });

    it("should get tweets successfully without token", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Tweets encontrados",
          data: [
            {
              id: "tweet1",
              content: "Tweet content 1",
              userId: "user1",
            },
          ],
        },
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await getTweetsService({ page: 1, take: 10 });

      expect(mockGet).toHaveBeenCalledWith("/tweets", {
        headers: undefined,
        params: {
          page: 1,
          take: 10,
          search: undefined,
        },
      });
      expect(result).toEqual({
        ok: true,
        message: "Tweets encontrados",
        data: [
          {
            id: "tweet1",
            content: "Tweet content 1",
            userId: "user1",
          },
        ],
      });
    });

    it("should handle get tweets error", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Erro ao buscar tweets",
          },
        },
      };

      mockGet.mockRejectedValue(mockError);

      const result = await getTweetsService({ page: 1 }, "test-token");

      expect(result).toEqual({
        ok: false,
        message: "Erro ao buscar tweets",
      });
    });
  });

  describe("getFeedService", () => {
    it("should get feed successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Feed carregado com sucesso",
          data: [
            {
              id: "tweet1",
              content: "Feed tweet 1",
              userId: "user1",
            },
          ],
        },
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await getFeedService({ page: 1, take: 10 }, "test-token");

      expect(mockGet).toHaveBeenCalledWith("/tweets/feed", {
        headers: { Authorization: "Bearer test-token" },
        params: {
          page: 1,
          take: 10,
          search: undefined,
        },
      });
      expect(result).toEqual({
        ok: true,
        message: "Feed carregado com sucesso",
        data: [
          {
            id: "tweet1",
            content: "Feed tweet 1",
            userId: "user1",
          },
        ],
      });
    });

    it("should handle get feed error", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Erro ao carregar feed",
          },
        },
      };

      mockGet.mockRejectedValue(mockError);

      const result = await getFeedService({ page: 1 }, "test-token");

      expect(result).toEqual({
        ok: false,
        message: "Erro ao carregar feed",
      });
    });
  });

  describe("getTweetDetailsService", () => {
    it("should get tweet details successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Tweet encontrado",
          data: {
            id: "tweet1",
            content: "Detailed tweet content",
            userId: "user1",
          },
        },
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await getTweetDetailsService({
        id: "tweet1",
        token: "test-token",
      });

      expect(mockGet).toHaveBeenCalledWith("/tweets/tweet1", {
        headers: { Authorization: "Bearer test-token" },
      });
      expect(result).toEqual({
        ok: true,
        message: "Tweet encontrado",
        data: {
          id: "tweet1",
          content: "Detailed tweet content",
          userId: "user1",
        },
      });
    });

    it("should handle get tweet details error", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Tweet não encontrado",
          },
        },
      };

      mockGet.mockRejectedValue(mockError);

      const result = await getTweetDetailsService({
        id: "tweet1",
        token: "test-token",
      });

      expect(result).toEqual({
        ok: false,
        message: "Tweet não encontrado",
      });
    });
  });

  describe("updateTweetService", () => {
    const mockUpdateData = {
      id: "tweet1",
      content: "Updated tweet content",
    };

    it("should update tweet successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Tweet atualizado com sucesso",
          data: {
            id: "tweet1",
            content: "Updated tweet content",
            userId: "user1",
          },
        },
      };

      mockPut.mockResolvedValue(mockResponse);

      const result = await updateTweetService("test-token", mockUpdateData);

      expect(mockPut).toHaveBeenCalledWith(
        "/tweets/tweet1",
        { content: "Updated tweet content" },
        {
          headers: { Authorization: "Bearer test-token" },
        }
      );
      expect(result).toEqual({
        ok: true,
        message: "Tweet atualizado com sucesso",
        data: {
          id: "tweet1",
          content: "Updated tweet content",
          userId: "user1",
        },
      });
    });

    it("should handle update tweet error", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Erro ao atualizar tweet",
          },
        },
      };

      mockPut.mockRejectedValue(mockError);

      const result = await updateTweetService("test-token", mockUpdateData);

      expect(result).toEqual({
        ok: false,
        message: "Erro ao atualizar tweet",
      });
    });
  });

  describe("deleteTweetService", () => {
    it("should delete tweet successfully", async () => {
      const mockResponse = {
        data: {
          ok: true,
          message: "Tweet deletado com sucesso",
          data: {
            id: "tweet1",
            content: "Deleted tweet content",
            userId: "user1",
          },
        },
      };

      mockDelete.mockResolvedValue(mockResponse);

      const result = await deleteTweetService("test-token", "tweet1");

      expect(mockDelete).toHaveBeenCalledWith("/tweets/tweet1", {
        headers: { Authorization: "Bearer test-token" },
      });
      expect(result).toEqual({
        ok: true,
        message: "Tweet deletado com sucesso",
        data: {
          id: "tweet1",
          content: "Deleted tweet content",
          userId: "user1",
        },
      });
    });

    it("should handle delete tweet error", async () => {
      const mockError = {
        response: {
          data: {
            ok: false,
            message: "Tweet não encontrado",
          },
        },
      };

      mockDelete.mockRejectedValue(mockError);

      const result = await deleteTweetService("test-token", "tweet1");

      expect(result).toEqual({
        ok: false,
        message: "Tweet não encontrado",
      });
    });
  });
});
