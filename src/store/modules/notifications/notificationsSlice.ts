import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Notification } from "../../../@types";

interface NotificationsState {
  list: Notification[];
}

const initialState: NotificationsState = {
  list: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      state.list.unshift(action.payload); // Adiciona a notificação no início da lista
    },
    clearNotifications(state) {
      state.list = []; // Limpa todas as notificações
    },
  },
});

export const { addNotification, clearNotifications } =
  notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer;
