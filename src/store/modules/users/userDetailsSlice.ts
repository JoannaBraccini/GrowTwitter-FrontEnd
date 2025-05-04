import { Follow, Like, Retweet, Tweet, User, Verified } from "../../../@types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ResponseApi } from "../../../configs/services/api.service";
import { getUserDetails } from "./usersActions";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
    verified: Verified;
    createdAt: string;
    updatedAt: string;
    followers: Follow[];
    following: Follow[];
    tweets: Tweet[];
    likes: Like[];
    retweets: Retweet[];
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
    bio: "",
    verified: "NONE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    followers: [],
    following: [],
    tweets: [],
    likes: [],
    retweets: [],
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
            const updatedAt = new Date(userData.updatedAt);

            // Verifique se as datas são válidas
            state.user = {
              ...userData,
              createdAt: !isNaN(createdAt.getTime())
                ? createdAt.toISOString()
                : new Date().toISOString(),
              updatedAt: !isNaN(updatedAt.getTime())
                ? updatedAt.toISOString()
                : new Date().toISOString(),
            };
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
