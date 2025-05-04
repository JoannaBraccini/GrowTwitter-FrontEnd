import { UserSearchRequest, UserUpdate } from "../../../@types";
import {
  deleteUserService,
  followUserService,
  getUserDetailsService,
  getUsersService,
  updateUserService,
} from "../../../configs/services/user.service";

import { RootState } from "../..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { handle403 } from "../utils/errorHandlers";
import { showAlert } from "../alert/alertSlice";
import { validateTokenOrThrow } from "../utils/authUtils";

// ######################################
// #               POST                 #
// ######################################

export const followUser = createAsyncThunk(
  "users/follow",
  async (id: string, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    const response = await followUserService(id, token);
    const handled = await handle403(response, dispatch);

    if (!response.ok && !handled) {
      console.log(response.message);

      dispatch(
        showAlert({
          message: "Erro ao seguir usuário",
          type: "error",
        })
      );
    }

    return response;
  }
);

// ######################################
// #               GET                  #
// ######################################

export const getUsers = createAsyncThunk(
  "users/findMany",
  async (query: UserSearchRequest, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    const response = await getUsersService({ ...query }, token);

    if (!response.ok) {
      console.log(response.message);
      dispatch(
        showAlert({
          message: "Erro ao buscar usuários",
          type: "error",
        })
      );
    }
    return response;
  }
);

export const getUserDetails = createAsyncThunk(
  "users/findOne",
  async (id: string, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    const response = await getUserDetailsService(id, token);

    if (!response.ok) {
      console.log(response.message);
      dispatch(
        showAlert({
          type: "error",
          message: "Erro ao buscar detalhes do usuário",
        })
      );
    }

    return response;
  }
);

// ######################################
// #              UPDATE                #
// ######################################

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, ...data }: UserUpdate, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    const response = await updateUserService(token, { id, ...data });
    const handled = await handle403(response, dispatch);

    if (!response.ok && !handled) {
      console.log(response.message);
      dispatch(
        showAlert({
          type: "error",
          message: "Erro ao atualizar usuário",
        })
      );
      return response;
    }
  }
);

// ######################################
// #               DELETE               #
// ######################################

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    await validateTokenOrThrow(dispatch, token);

    const response = await deleteUserService(token, id);
    const handled = await handle403(response, dispatch);

    if (!response.ok && !handled) {
      console.log(response.message);
      dispatch(
        showAlert({
          type: "error",
          message: "Erro ao deletar usuário",
        })
      );
      return response;
    }
  }
);
