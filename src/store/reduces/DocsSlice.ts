import axios from '../axios';
import { AxiosError } from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDocsParams, docsState, searchDocsParams} from '../../types/types';

const initialState: docsState = {
  document: null,
  isLoading: false,
  status_get: null,
  status_add: null,
  status_del: null,
  status_search:null,
  result_search: null,
  docId: null,
};

export const getDocs = createAsyncThunk(
    '/get_docs',
    async (id: number, { rejectWithValue }) => {
      try {
        const data = await axios.get('/get_docs', {
          params: { document_id: id }
        });
        return data.data
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return rejectWithValue({
            message: AxiosError.ERR_BAD_RESPONSE || error.message 
          });
        }
        return rejectWithValue({ message: 'Error' });
  
      }
    }
  );
  export const addDocs = createAsyncThunk(
    '/add_docs',
    async ({ name, content, referrals}:addDocsParams, { rejectWithValue }) => {
      try {
        const { data } = await axios.post('/add_docs', {name, content, referrals });
        return data;
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return rejectWithValue({
            message: AxiosError.ERR_BAD_RESPONSE || error.message 
          });
        }
        return rejectWithValue({ message: 'Error' });
  
      }
    }
  );

  export const delDocs = createAsyncThunk(
    '/del_docs',
    async (document_id: number, { rejectWithValue }) => {
      try {
        const { data } = await axios.delete('/del_docs', { params: { document_id } });
        return data;
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          return rejectWithValue({
            message: AxiosError.ERR_BAD_RESPONSE || error.message 
          });
        }
        return rejectWithValue({ message: 'Error' });
      }
    }
  );

  export const searchDocs = createAsyncThunk(
    '/search',
    async ({ name, depth, limit }:searchDocsParams, { rejectWithValue }) => { 
      try {
        const data = await axios.get('/search', {
          params: { 
            document_name: name,
            depth: depth,
            limit: limit
          }
        });
        return data.data;
      } catch (error) {
        console.log(error);
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
      // get docs
      builder.addCase(getDocs.pending, (state) => {
        state.isLoading = true;
        state.status_get = null;
      });
      builder.addCase(getDocs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status_get = "Success";
        state.document = Array.isArray(action.payload) ? action.payload[0] : null;;
      });
      builder.addCase(getDocs.rejected, (state) => {
        state.isLoading = false;
        state.status_get = 'Error';
      });  
      // add docs
      builder.addCase(addDocs.pending, (state) => {
        state.isLoading = true;
        state.status_add = null;
      });
      builder.addCase(addDocs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status_add = "Success";
        state.docId = action.payload['document id']
      });
      builder.addCase(addDocs.rejected, (state) => {
        state.isLoading = false;
        state.status_add = 'Error';
        state.docId = null
      });  
      // del docs
      builder.addCase(delDocs.pending, (state) => {
        state.isLoading = true;
        state.status_del = null;
      });
      builder.addCase(delDocs.fulfilled, (state) => {
        state.isLoading = false;
        state.status_del = "Success";
      });
      builder.addCase(delDocs.rejected, (state) => {
        state.isLoading = false;
        state.status_del = 'Error';
      });
      // search docs
      builder.addCase(searchDocs.pending, (state) => {
        state.isLoading = true;
        state.status_search = null;
      });
      builder.addCase(searchDocs.fulfilled, (state,action) => {
        state.isLoading = false;
        state.status_search = "Success";
        state.result_search = action.payload
      });
      builder.addCase(searchDocs.rejected, (state) => {
        state.isLoading = false;
        state.status_search = 'Error';
      });
    }
  });

  export default docsSlice.reducer;