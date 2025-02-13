import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tweet, User, UserBase } from "../../../types";
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
    avatarUrl: string;
    bio: string;
    followers: UserBase[];
    following: UserBase[];
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
    bio: "",
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
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.ok = action.payload.ok;
        state.message = action.payload.message;

        if (state.ok && action.payload.data) {
          state.user = action.payload.data;
        }
      })
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
