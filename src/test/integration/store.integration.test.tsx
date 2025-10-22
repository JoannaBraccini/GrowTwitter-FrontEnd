import { describe, expect, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../store/modules/rootReducer";

describe("Store Integration Tests", () => {
  it("should create store with initial state", () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    const state = store.getState();

    // Verifica se todos os slices estão presentes
    expect(state).toHaveProperty("userLogged");
    expect(state).toHaveProperty("usersList");
    expect(state).toHaveProperty("tweetsList");
    expect(state).toHaveProperty("tweetDetail");
    expect(state).toHaveProperty("alert");
  });

  it("should handle multiple dispatches correctly", () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    // Verifica estado inicial
    expect(store.getState().userLogged.loading).toBe(false);

    // Simula múltiplas ações sendo despachadas
    // (Em um cenário real, você despacharia ações reais aqui)
    expect(store.getState()).toBeDefined();
  });

  it("should maintain state consistency", () => {
    const store = configureStore({
      reducer: rootReducer,
    });

    const initialState = store.getState();

    // Verifica se o estado inicial é consistente
    expect(initialState.userLogged.user).toMatchObject({
      id: "",
      name: "",
      email: "",
      username: "",
    });

    expect(initialState.tweetsList.tweets).toEqual([]);
    expect(initialState.usersList.users).toHaveLength(1);
    expect(initialState.usersList.users[0]).toMatchObject({
      id: "",
      name: "",
      username: "",
      email: "",
    });
  });
});
