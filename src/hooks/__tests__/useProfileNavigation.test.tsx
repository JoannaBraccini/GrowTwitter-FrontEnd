import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useProfileNavigation } from "../useProfileNavigation";

// Mock do react-router-dom e Redux hooks
const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => ({ token: "mock-token" }),
}));

describe("useProfileNavigation", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return handleProfileClick function", () => {
    const { result } = renderHook(() => useProfileNavigation());

    expect(result.current).toHaveProperty("handleProfileClick");
    expect(typeof result.current.handleProfileClick).toBe("function");
  });

  it("should navigate to profile page when handleProfileClick is called", async () => {
    // Mock dispatch que sempre retorna um objeto com unwrap
    let callCount = 0;
    mockDispatch.mockImplementation(() => ({
      unwrap: vi.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve(true); // Para validateToken
        } else {
          return Promise.resolve({ data: { username: "test-username" } }); // Para getUserDetails
        }
      }),
    }));

    const { result } = renderHook(() => useProfileNavigation());
    const userId = "test-user-id";

    await result.current.handleProfileClick(userId);

    // Aguarda o setTimeout interno
    await waitFor(
      () => {
        expect(mockNavigate).toHaveBeenCalledWith("/test-username");
      },
      { timeout: 1500 }
    );
  });

  it("should not navigate when userId is empty", async () => {
    const { result } = renderHook(() => useProfileNavigation());

    await result.current.handleProfileClick("");

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
