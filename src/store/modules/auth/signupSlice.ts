import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignupRequest, SignupResponse } from "../../../types";
import { showAlert } from "../alert/alertSlice";
import { ResponseApi } from "../../../configs/services/api.service";
import { signupService } from "../../../configs/services/auth.service";

export const signupAsyncThunk = createAsyncThunk(
  "auth/signup",
  async (data: SignupRequest, { dispatch }) => {
    const { name, username, email, password } = data;

    const response = await signupService({
      name,
      username,
      email,
      password,
    });

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
          type: "error",
        })
      );
    }

    dispatch(
      showAlert({
        message: response.message,
        type: "success",
      })
    );

    return response;
  }
);

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
  };
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  user: {
    id: "",
    name: "",
    username: "",
    email: "",
    avatarUrl: "",
    createdAt: new Date().toISOString(),
  },
};

const signupSlice = createSlice({
  name: "userSignup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //SIGNUP/CREATE
    builder
      .addCase(signupAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        signupAsyncThunk.fulfilled,
        (state, action: PayloadAction<ResponseApi<SignupResponse>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (action.payload.ok && action.payload.data) {
            // Converte createdAt para string ISO se necessário
            const userData = action.payload.data;
            state.user = {
              ...userData,
              avatarUrl:
                "https://www.svgrepo.com/show/485335/photo-image-image.svg", //Salvar uma imagem padrão
              createdAt: new Date(userData.createdAt).toISOString(),
            };
          }
        }
      )
      .addCase(signupAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro no Registro";
      });
  },
});

export const signupReducer = signupSlice.reducer;
