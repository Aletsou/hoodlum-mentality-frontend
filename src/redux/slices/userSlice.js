// src/redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for user login
export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
  const response = await axios.post('https://hoodlum-mentality-backend-8ec976c27e34.herokuapp.com/api/users/login', credentials);
  return response.data;
});

// Async thunk for user registration
export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
  const response = await axios.post('https://hoodlum-mentality-backend-8ec976c27e34.herokuapp.com/api/users/register', userData);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handle registration actions
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;

