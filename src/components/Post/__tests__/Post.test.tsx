import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { configureStore } from "@reduxjs/toolkit";
import { Post } from "../index";

// Mock do componente UserCard para simplificar
vi.mock("../../UserCard", () => ({
  UserCard: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="user-card">
      <div>Test User</div>
      <div>@testuser</div>
      {children}
    </div>
  ),
}));

// Mock do tema
const mockTheme = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
  textSecondary: "#666666",
  textExtra: "#999999",
  highlight: "#f0f0f0",
  border: "#e1e8ed",
  accent: "#1da1f2",
  toggle: "#333333",
};

// Mock do store simples
const createMockStore = () => {
  return configureStore({
    reducer: {
      tweetsList: () => ({ tweets: [], feed: [] }),
      userLogged: () => ({ token: "mock-token", user: { id: "user1" } }),
      alertSlice: () => ({ message: null }),
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

// Wrapper para testes
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const store = createMockStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={mockTheme}>{children}</ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

// Dados de teste simplificados
const mockTweet = {
  id: "tweet1",
  content: "Test tweet content",
  tweetType: "TWEET" as const,
  createdAt: "2024-01-01T10:00:00Z",
  updatedAt: "2024-01-01T10:00:00Z",
  imageUrl: undefined,
  userId: "user1",
  likes: [],
  retweets: [],
  replies: [],
};

const mockTweetUser = {
  id: "user1",
  name: "Test User",
  email: "test@example.com",
  username: "testuser",
  verified: "NONE" as const,
  createdAt: "2024-01-01T10:00:00Z",
  updatedAt: "2024-01-01T10:00:00Z",
  followers: [],
  following: [],
  tweets: [],
  likes: [],
  retweets: [],
};

const mockUserLogged = {
  id: "user2",
  name: "Logged User",
  username: "loggeduser",
  verified: "NONE" as const,
};

const mockProps = {
  tweet: mockTweet,
  tweetUser: mockTweetUser,
  userLogged: mockUserLogged,
  isOwnTweet: false,
  openModal: vi.fn(),
  closeModal: vi.fn(),
};

describe("Post", () => {
  it("should render post component", () => {
    render(
      <TestWrapper>
        <Post {...mockProps} />
      </TestWrapper>
    );

    expect(screen.getByText("Test tweet content")).toBeInTheDocument();
  });

  it("should display user information", () => {
    render(
      <TestWrapper>
        <Post {...mockProps} />
      </TestWrapper>
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("@testuser")).toBeInTheDocument();
  });

  it("should show tweet content", () => {
    render(
      <TestWrapper>
        <Post {...mockProps} />
      </TestWrapper>
    );

    expect(screen.getByText("Test tweet content")).toBeInTheDocument();
  });
});
