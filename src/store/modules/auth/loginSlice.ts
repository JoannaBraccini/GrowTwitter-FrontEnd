import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginRequest, LoginResponse, Verified } from "../../../types";
import { showAlert } from "../alert/alertSlice";
import { loginService } from "../../../configs/services/auth.service";
import { ResponseApi } from "../../../configs/services/api.service";

export const loginAsyncThunk = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, { dispatch }) => {
    const { username, email, password, remember } = data;
    const body = {
      username: username ?? undefined,
      email: email ?? undefined,
      password,
    };

    const response = await loginService(body);
    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    } else {
      dispatch(
        showAlert({
          message: response.message,
          type: "success",
        })
      );
    }

    return {
      ...response,
      remember,
    };
  }
);

interface LoginPayload extends ResponseApi<LoginResponse> {
  remember: boolean;
}

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  remember: boolean;
  token: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatarUrl: string;
    verified: Verified;
  };
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  remember: false,
  token: "",
  user: {
    id: "",
    name: "",
    username: "",
    email: "",
    avatarUrl: "",
    verified: "NONE",
  },
};

const userLoggedSlice = createSlice({
  name: "userLogged",
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem("GrowToken");
      localStorage.removeItem("GrowUser");
      sessionStorage.removeItem("GrowToken");
      sessionStorage.removeItem("GrowUser");
      return initialState;
    },
  },
  extraReducers(builder) {
    // LOGIN USER
    builder
      .addCase(loginAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        loginAsyncThunk.fulfilled,
        (state, action: PayloadAction<LoginPayload>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (action.payload.ok && action.payload.data) {
            state.token = action.payload.data.token;
            state.user = action.payload.data.user;
            state.remember = action.payload.remember;

            // Armazena no LocalStorage ou SessionStorage
            const storage = action.payload.remember
              ? localStorage
              : sessionStorage;
            storage.setItem("GrowToken", JSON.stringify(state.token));
            storage.setItem("GrowUser", JSON.stringify(state.user));
          }
        }
      )
      .addCase(loginAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro no Login";
      });
  },
});

export const { logout } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
