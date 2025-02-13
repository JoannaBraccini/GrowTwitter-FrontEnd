import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserSearchRequest, UserUpdate } from "../../../types";
import {
  deleteUserService,
  getUserDetailsService,
  getUsersService,
  updateUserService,
} from "../../../configs/services/user.service";
import { showAlert } from "../alert/alertSlice";
import { RootState } from "../..";

export const getUsers = createAsyncThunk(
  "users/findMany",
  async (query: UserSearchRequest, { dispatch }) => {
    const response = await getUsersService({ ...query });

    if (!response.ok) {
      dispatch(
        showAlert({
          message: response.message,
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

    const response = await getUserDetailsService(id, token);

    if (!response.ok) {
      dispatch(
        showAlert({
          type: "error",
          message: response.message,
        })
      );
      return response;
    }

    dispatch(
      showAlert({
        type: "success",
        message: response.message,
      })
    );

    return response;
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, ...data }: UserUpdate, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await updateUserService(token, { id, ...data });

    if (!response.ok) {
      dispatch(
        showAlert({
          type: "error",
          message: response.message,
        })
      );
      return response;
    }

    dispatch(
      showAlert({
        type: "success",
        message: response.message,
      })
    );

    return response;
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string, { dispatch, getState }) => {
    const { userLogged } = getState() as RootState;
    const { token } = userLogged;

    const response = await deleteUserService(token, id);

    if (!response.ok) {
      dispatch(
        showAlert({
          type: "error",
          message: response.message,
        })
      );

      return response;
    }

    dispatch(
      showAlert({
        type: "success",
        message: response.message,
      })
    );

    return response;
  }
);
