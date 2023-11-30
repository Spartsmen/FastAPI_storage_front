import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authState, registerParams } from "../../types/types";
import axios from '../axios';

const initialState: authState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
}

export const registerUser = createAsyncThunk('/register',
  async ({email,username, password}: registerParams) => {
    try {
      const { data } = await axios.post('/register', {
        email, password, username 
      })
      if (data.token) {
        window.localStorage.setItem('token', data.token)
      }
      return data
    } catch (e) {
      console.log(e)
    }
  }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      });
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "Success"//action.payload.message;
        state.user = action.payload.user;
        state.token = action.payload.token;
      });
      builder.addCase(registerUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.status = action.error.message || 'Произошла ошибка';
      });
    }
  })

  export const checkIsAuth = (state: authState) => Boolean(state.token);
  export default authSlice.reducer
