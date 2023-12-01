import axios from '../axios';
import { AxiosError } from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { docsState, docs } from '../../types/types';

const initialState: docsState = {
  document: null,
  isLoading: false,
  status: null,
};

export const getDocs = createAsyncThunk(
    '/get_docs',
    async ({id}: any, { rejectWithValue }) => {
      try {
        const { data } = await axios.get('/get_docs', {
          params: { id }
        });
        return data
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

  export const docsSlice = createSlice({
    name: 'docs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getDocs.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      });
      builder.addCase(getDocs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "Success";
        state.document = action.payload.document;
      });
      builder.addCase(getDocs.rejected, (state) => {
        state.isLoading = false;
        state.status = 'Error';
      });  
      
    }
  });

  export default docsSlice.reducer;