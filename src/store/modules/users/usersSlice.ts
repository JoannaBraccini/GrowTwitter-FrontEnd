import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Follow, User } from "../../../@types";
import { getUsers, updateUser, deleteUser, followUser } from "./usersActions";
import { ResponseApi } from "../../../configs/services/api.service";

interface InitialState {
  ok: boolean;
  message: string;
  loading: boolean;
  users: User[];
}

const initialState: InitialState = {
  ok: false,
  message: "",
  loading: false,
  users: [
    {
      id: "",
      name: "",
      username: "",
      email: "",
      avatarUrl: "",
      bio: "",
      verified: "NONE",
      followers: [],
      following: [],
      tweets: [],
      createdAt: new Date().toISOString(),
    },
  ],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(followUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        followUser.fulfilled,
        (state, action: PayloadAction<ResponseApi<Follow>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (state.ok && action.payload.data) {
            const { followerId, followedId } = action.payload.data;
            const userIndex = state.users.findIndex(
              (user) => user.id === followedId
            );

            if (userIndex !== -1) {
              const user = state.users[userIndex];

              // Verifica se o usuário já está na lista de seguidores
              const isFollowing = user.followers.some(
                (f) => f.followerId === followerId
              );

              if (isFollowing) {
                // Remove o seguidor (unfollow)
                user.followers = user.followers.filter(
                  (f) => f.followerId !== followerId
                );
              } else {
                // Adiciona o seguidor (follow)
                user.followers.push(action.payload.data);
              }

              state.users[userIndex] = { ...user };
            }
          }
        }
      )
      .addCase(followUser.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro no follow";
      });
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action: PayloadAction<ResponseApi<User[]>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (state.ok && action.payload.data) {
            state.users = action.payload.data;
          }
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao buscar usuários";
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<ResponseApi<User>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (state.ok && action.payload.data) {
            const index = state.users.findIndex(
              (user) => user.id === action.payload.data?.id
            );

            if (index !== -1) {
              state.users[index] = {
                ...state.users[index],
                ...action.payload.data,
              };
            }
          }
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message =
          action.error.message || "Erro ao atualizar dados do usuário";
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<ResponseApi<User>>) => {
          state.loading = false;
          state.ok = action.payload.ok;
          state.message = action.payload.message;

          if (state.ok && action.payload.data) {
            const index = state.users.findIndex(
              (user) => user.id === action.payload.data?.id
            );
            if (index !== -1) {
              state.users.splice(index, 1);
            }
          }
        }
      )
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.ok = false;
        state.message = action.error.message || "Erro ao deletar usuário";
      });
  },
});
export const usersReducer = usersSlice.reducer;
