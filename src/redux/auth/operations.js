import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCredentials, logoutAction } from "./slice";

export const apiClient = axios.create({
  baseURL: "https://readjourney.b.goit.study",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const setAuthHeader = (token) => {
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  apiClient.defaults.headers.common.Authorization = "";
};

export const setupAxiosInterceptor = (store) => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await apiClient.post("/users/current/refresh");
          const accessToken = res.data.token;
          console.log(accessToken);
          apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          store.dispatch(setCredentials(accessToken));
          return apiClient(originalRequest);
        } catch (refreshError) {
          store.dispatch(logoutAction());
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
};

export const register = createAsyncThunk(
  "/users/singup",
  async (userData, thunkAPI) => {
    try {
      const response = await apiClient.post("/users/singup", userData);
      const accessToken = response.data.token;
      setAuthHeader(accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const logIn = createAsyncThunk(
  "/users/singin",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await apiClient.post("/users/singin", credentials);
      const { accessToken } = data;
      setAuthHeader(accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
