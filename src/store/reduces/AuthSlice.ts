import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios';
import { authState, registerParams } from "../../types/types";
import { AxiosError } from "axios";
import instance from "../axios";

const initialState: authState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  '/register',
  async ({ email, username, password }: registerParams, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/register', { email, password, username });
      return data;
    } catch (error) {
      //console.log(error);
      if (error instanceof Error) {
        return rejectWithValue({
          message: AxiosError.ERR_BAD_RESPONSE || error.message 
        });
      }
      return rejectWithValue({ message: 'Error' });

    }
  }
);

export const loginUser = createAsyncThunk(
  '/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      params.append('username', email); 
      params.append('password', password);

      const { data } = await instance.post('/login', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (data.access_token) { 
        window.localStorage.setItem('access_token', data.access_token); 
        return { user: data.user, access_token: data.access_token }; 
      } else {
        throw new Error('Token was not provided in response.');
      }
    } catch (error) {
      //console.log(error);
      if (error instanceof Error) {
        return rejectWithValue({
          message: AxiosError.ERR_BAD_RESPONSE || error.message 
        });
      }
      return rejectWithValue({ message: 'Error' });

    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //registration
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = "Success";
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.status = 'Error';
    });
    //login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.status = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.status = "Success";
      state.user = action.payload.user;
      state.token = action.payload.access_token;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.status = 'Error';
    });  
    
  }
});

export const checkIsAuth = (state: authState) => Boolean(state.token);
export default authSlice.reducer;

