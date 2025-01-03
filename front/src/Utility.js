import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const handleLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      const token = response.data.body.token;

      return token ;
    } catch (err) {
      return rejectWithValue(err); // rejectWithValue permet de renvoyer une erreur spécifique au lieu de juste une erreur
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/profile",
  async (unused, { rejectWithValue, getState }) => {
    //condition(arg, { getState, extra } ): boolean | Promise<boolean>
    try {
      const state = getState(); // getState: the Redux store getState method
      const token = state.token; // state.token atteint le token dans le store et le passe a token

      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.body;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ firstName, lastName, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        {
          firstName,
          lastName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
