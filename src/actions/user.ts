import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/json; charset=utf-8',
  },
});

// export const searchRepo = createAsyncThunk('search/repositories', async (param: { query: string; page: number }) => {
export const searchRepo = createAsyncThunk('search/repositories', async () => {
  const result = await axios.get('/search/repositories', {
    params: {
      // q: param.query,
      // page: param.page,
      q: 'react',
    },
  });
  // console.log('/search/repositories::', result.data);
  return result.data;
});
