import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Follow, Tweet, User, Verified } from "../../../@types";
import { getUserDetails } from "./usersActions";
import { ResponseApi } from "../../../configs/services/api.service";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    avatarUrl: string;
    bio: string;
    verified: Verified;
    createdAt: string;
    followers: Follow[];
    following: Follow[];
    tweets: Tweet[];
  };
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  user: {
    id: "",
    name: "",
    email: "",
    username: "",
    avatarUrl: "",
    verified: "NONE",
    bio: "",
    createdAt: new Date().toISOString(),
    followers: [],
    following: [],
    tweets: [],
  },
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails(state, action: PayloadAction<User>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // Reset
    resetUserDetails() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUserDetails.fulfilled,
        (state, action: PayloadAction<ResponseApi<User>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (action.payload.ok && action.payload.data) {
            const userData = action.payload.data;
            const createdAt = new Date(userData.createdAt);

            // Verifique se a data é válida
            if (!isNaN(createdAt.getTime())) {
              state.user = {
                ...userData,
                createdAt: createdAt.toISOString(),
              };
            } else {
              state.user = {
                ...userData,
                createdAt: new Date().toISOString(), // Usa a data atual se for inválido
              };
            }
          }
        }
      )
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message =
          action.error.message || "Erro ao buscar dados do usuário";
      });
  },
});
export const { resetUserDetails, setUserDetails } = userDetailsSlice.actions;
export const userDetailsReducer = userDetailsSlice.reducer;
