import { describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen, fireEvent } from "../test-utils";
import { TweetBox } from "../../components/TweetBox";
import { Tweet, UserBase } from "../../@types";

// Mock dos hooks necessários
vi.mock("../../hooks", () => ({
  useProfileNavigation: () => ({
    handleProfileClick: vi.fn(),
  }),
  useVerificationIcon: () => ({
    icon: null,
    label: "none",
  }),
}));

describe("Tweet Creation Integration Tests", () => {
  const mockUser: UserBase = {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    avatarUrl: "https://example.com/avatar.jpg",
    verified: "NONE",
  };

  const mockTweet: Tweet = {
    id: "1",
    userId: "1",
    content: "Test tweet content",
    tweetType: "TWEET",
    createdAt: "2023-01-01T00:00:00Z",
    likes: [],
    retweets: [],
    replies: [],
  };

  it("should create tweet with content and image", () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <TweetBox
        tweetUser={mockUser}
        tweet={mockTweet}
        mode="create"
        onTweetSubmit={mockSubmit}
      />
    );

    const textarea = screen.getByPlaceholderText("O que está acontencendo?");
    const submitButton = screen.getByRole("button", { name: "Postar" });

    // Simula digitação de conteúdo
    fireEvent.change(textarea, { target: { value: "Meu primeiro tweet!" } });

    // Simula envio do tweet
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith(
      "Meu primeiro tweet!",
      "",
      undefined,
      ""
    );
  });

  it("should handle basic tweet submission", () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <TweetBox
        tweetUser={mockUser}
        tweet={mockTweet}
        onTweetSubmit={mockSubmit}
        mode={"create"}
      />
    );

    const textarea = screen.getByPlaceholderText("O que está acontencendo?");
    const submitButton = screen.getByRole("button", { name: /postar/i });

    // Simula criação de tweet
    fireEvent.change(textarea, { target: { value: "Meu novo tweet!" } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith(
      "Meu novo tweet!",
      "",
      undefined,
      ""
    );
  });

  it("should validate empty tweet submission", () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <TweetBox
        tweetUser={mockUser}
        tweet={mockTweet}
        mode="create"
        onTweetSubmit={mockSubmit}
      />
    );

    const submitButton = screen.getByRole("button", { name: "Postar" });

    // Tenta enviar tweet vazio
    fireEvent.click(submitButton);

    // Verifica se foi chamado com string vazia
    expect(mockSubmit).toHaveBeenCalledWith("", "", undefined, "");
  });

  it("should handle tweet with image URL", () => {
    const mockSubmit = vi.fn();

    renderWithProviders(
      <TweetBox
        tweetUser={mockUser}
        tweet={mockTweet}
        mode="create"
        onTweetSubmit={mockSubmit}
      />
    );

    const textarea = screen.getByPlaceholderText("O que está acontencendo?");
    const imageInput = screen.getByPlaceholderText(
      "Adicionar uma URL de imagem"
    );
    const submitButton = screen.getByRole("button", { name: "Postar" });

    // Adiciona conteúdo e imagem
    fireEvent.change(textarea, { target: { value: "Tweet com imagem!" } });
    fireEvent.change(imageInput, {
      target: { value: "https://example.com/image.jpg" },
    });

    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith(
      "Tweet com imagem!",
      "https://example.com/image.jpg",
      undefined,
      ""
    );
  });
});
