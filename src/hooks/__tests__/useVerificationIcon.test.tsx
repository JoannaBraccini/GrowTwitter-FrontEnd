import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useVerificationIcon } from "../useVerifyIcon";
import { Verified } from "../../@types";

describe("useVerificationIcon", () => {
  it("should return gold verification for GOLD verified user", () => {
    const user = {
      name: "John Doe",
      verified: "GOLD" as Verified,
    };

    const { result } = renderHook(() => useVerificationIcon(user));

    expect(result.current.label).toBe("Verificado Gold");
    // SVG é convertido em data URL pelo bundler
    expect(result.current.icon).toMatch(/^data:image\/svg\+xml/);
  });

  it("should return blue verification for BLUE verified user", () => {
    const user = {
      name: "Jane Smith",
      verified: "BLUE" as Verified,
    };

    const { result } = renderHook(() => useVerificationIcon(user));

    expect(result.current.label).toBe("Verificado Blue");
    // SVG é convertido em data URL pelo bundler
    expect(result.current.icon).toMatch(/^data:image\/svg\+xml/);
  });

  it("should return default blue verification for NONE verified user", () => {
    const user = {
      name: "Regular User",
      verified: "NONE" as Verified,
    };

    const { result } = renderHook(() => useVerificationIcon(user));

    expect(result.current.label).toBe("Obter verificação");
    // SVG é convertido em data URL pelo bundler
    expect(result.current.icon).toMatch(/^data:image\/svg\+xml/);
  });

  it("should return default blue verification for undefined verified status", () => {
    const user = {
      name: "Undefined User",
    };

    const { result } = renderHook(() => useVerificationIcon(user));

    expect(result.current.label).toBe("Obter verificação");
    // SVG é convertido em data URL pelo bundler
    expect(result.current.icon).toMatch(/^data:image\/svg\+xml/);
  });

  it("should memoize result for same user", () => {
    const user = {
      name: "Test User",
      verified: "GOLD" as Verified,
    };

    const { result, rerender } = renderHook(() => useVerificationIcon(user));
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });
});
