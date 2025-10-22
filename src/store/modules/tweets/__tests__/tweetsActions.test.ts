import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { createTweet, likeTweet, getTweets } from "../tweetsActions";

// Mock dos services
vi.mock("../../../../configs/services/tweet.service", () => ({
  postTweetService: vi.fn(),
  likeTweetService: vi.fn(),
  getTweetsService: vi.fn(),
}));

// Mock das utilities - versão simplificada
vi.mock("../../utils/errorHandlers", () => ({
  handle403: vi.fn().mockResolvedValue(false),
}));

vi.mock("../../utils/authUtils", () => ({
  validateTokenOrThrow: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("../../alert/alertSlice", () => ({
  showAlert: vi.fn().mockReturnValue({ type: "alert/showAlert" }),
}));

// Importar os mocks após definir os mocks
import {
  postTweetService,
  likeTweetService,
  getTweetsService,
} from "../../../../configs/services/tweet.service";

const mockPostTweetService = vi.mocked(postTweetService);
const mockLikeTweetService = vi.mocked(likeTweetService);
const mockGetTweetsService = vi.mocked(getTweetsService);

// Mock do store
const createMockStore = () => {
  return configureStore({
    reducer: {
      userLogged: () => ({
        token: "mock-token",
        user: { id: "user1", username: "testuser" },
      }),
    },
  });
};

describe("TweetsActions", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = createMockStore();
  });
  describe("createTweet", () => {
    const mockTweetData = {
      content: "Test tweet",
      tweetType: "TWEET" as const,
      userId: "user1",
    };

    it("should create tweet successfully", async () => {
      const mockResponse = {
        ok: true,
        message: "Tweet criado com sucesso",
        data: { id: "tweet1", content: "Test tweet" },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockPostTweetService.mockResolvedValue(mockResponse as any);

      const result = await store.dispatch(createTweet(mockTweetData));

      expect(mockPostTweetService).toHaveBeenCalledWith(
        "mock-token",
        mockTweetData
      );
      expect(result.type).toBe("tweets/create/fulfilled");
      expect(result.payload).toEqual(mockResponse);
    });

    it("should handle create tweet error", async () => {
      const mockResponse = {
        ok: false,
        message: "Erro ao criar tweet",
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockPostTweetService.mockResolvedValue(mockResponse as any);

      const result = await store.dispatch(createTweet(mockTweetData));

      expect(result.type).toBe("tweets/create/fulfilled");
      expect(result.payload).toEqual(mockResponse);
    });
  });

  describe("likeTweet", () => {
    it("should like tweet successfully", async () => {
      const mockResponse = {
        ok: true,
        message: "Tweet curtido com sucesso",
        data: { id: "like1", tweetId: "tweet1", userId: "user1" },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockLikeTweetService.mockResolvedValue(mockResponse as any);

      const result = await store.dispatch(likeTweet("tweet1"));

      expect(mockLikeTweetService).toHaveBeenCalledWith("tweet1", "mock-token");
      expect(result.type).toBe("tweets/like/fulfilled");
      expect(result.payload).toEqual(mockResponse);
    });

    it("should handle like tweet error", async () => {
      const mockResponse = {
        ok: false,
        message: "Erro ao curtir tweet",
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockLikeTweetService.mockResolvedValue(mockResponse as any);

      const result = await store.dispatch(likeTweet("tweet1"));

      expect(result.type).toBe("tweets/like/fulfilled");
      expect(result.payload).toEqual(mockResponse);
    });
  });

  describe("getTweets", () => {
    it("should get tweets successfully", async () => {
      const mockQuery = { page: 1, take: 10 };
      const mockResponse = {
        ok: true,
        message: "Tweets encontrados",
        data: [
          { id: "tweet1", content: "Tweet 1" },
          { id: "tweet2", content: "Tweet 2" },
        ],
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockGetTweetsService.mockResolvedValue(mockResponse as any);

      const result = await store.dispatch(getTweets(mockQuery));

      expect(mockGetTweetsService).toHaveBeenCalledWith(
        mockQuery,
        "mock-token"
      );
      expect(result.type).toBe("tweets/findAll/fulfilled");
      expect(result.payload).toEqual(mockResponse);
    });

    it("should handle get tweets error", async () => {
      const mockQuery = { page: 1, take: 10 };
      const mockResponse = {
        ok: false,
        message: "Erro ao buscar tweets",
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockGetTweetsService.mockResolvedValue(mockResponse as any);

      const result = await store.dispatch(getTweets(mockQuery));

      expect(result.type).toBe("tweets/findAll/fulfilled");
      expect(result.payload).toEqual(mockResponse);
    });
  });
});
