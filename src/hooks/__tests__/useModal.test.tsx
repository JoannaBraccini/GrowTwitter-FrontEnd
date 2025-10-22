import React from "react";
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useModal } from "../useModal";

describe("useModal", () => {
  it("should initialize with modal closed", () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.modalOpen).toBe(false);
    expect(result.current.modalContent).toBe(null);
  });

  it("should open modal with content when openModal is called", () => {
    const { result } = renderHook(() => useModal());
    const testContent = React.createElement("div", null, "Test Content");

    act(() => {
      result.current.openModal(testContent);
    });

    expect(result.current.modalOpen).toBe(true);
    expect(result.current.modalContent).toBe(testContent);
  });

  it("should close modal when closeModal is called", () => {
    const { result } = renderHook(() => useModal());
    const testContent = React.createElement("div", null, "Test Content");

    act(() => {
      result.current.openModal(testContent);
    });

    expect(result.current.modalOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.modalOpen).toBe(false);
    expect(result.current.modalContent).toBe(null);
  });

  it("should handle string content", () => {
    const { result } = renderHook(() => useModal());
    const stringContent = "Test String Content";

    act(() => {
      result.current.openModal(stringContent);
    });

    expect(result.current.modalOpen).toBe(true);
    expect(result.current.modalContent).toBe(stringContent);
  });

  it("should replace content when openModal is called multiple times", () => {
    const { result } = renderHook(() => useModal());
    const firstContent = "First Content";
    const secondContent = "Second Content";

    act(() => {
      result.current.openModal(firstContent);
    });

    expect(result.current.modalContent).toBe(firstContent);

    act(() => {
      result.current.openModal(secondContent);
    });

    expect(result.current.modalContent).toBe(secondContent);
    expect(result.current.modalOpen).toBe(true);
  });
});
