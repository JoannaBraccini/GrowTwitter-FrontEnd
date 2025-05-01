import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../configs/services/api.service";
import { logout } from "./loginSlice"; // Importa a ação de logout

interface ValidateTokenState {
  isValid: boolean | null;
  loading: boolean;
  error: string | null;
}

const initialState: ValidateTokenState = {
  isValid: null,
  loading: false,
  error: null,
};

// Thunk para validar o token
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.ok; // Retorna true se o token for válido
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Erro ao validar token"
      );
    }
  }
);

const validateTokenSlice = createSlice({
  name: "validateToken",
  initialState,
  reducers: {
    resetValidation(state) {
      state.isValid = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isValid = action.payload;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading = false;
        state.isValid = false;
        state.error = action.payload as string;

        // Dispara o logout automaticamente
        if (state.error) logout(); // Chama o logout se houver erro
      });
  },
});

export const { resetValidation } = validateTokenSlice.actions;
export const validateTokenReducer = validateTokenSlice.reducer;
