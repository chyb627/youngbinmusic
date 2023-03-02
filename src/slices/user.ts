import { createSlice } from '@reduxjs/toolkit';
import { searchRepo } from '../actions/user';

export interface InitialState {
  searchRepoLoading: boolean;
  searchRepoDone: boolean;
  searchRepoError: Error | string | null | undefined;
  searchRepoData: any;
}

export const initialState: InitialState = {
  searchRepoLoading: false,
  searchRepoDone: false,
  searchRepoError: null,
  searchRepoData: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // searchRepo
      .addCase(searchRepo.pending, (state) => {
        state.searchRepoLoading = true;
        state.searchRepoDone = false;
        state.searchRepoError = null;
      })
      .addCase(searchRepo.fulfilled, (state, action) => {
        state.searchRepoLoading = false;
        state.searchRepoDone = true;
        state.searchRepoData = action.payload.items;
      })
      .addCase(searchRepo.rejected, (state, action) => {
        state.searchRepoLoading = false;
        state.searchRepoError = action.error.message;
      }),
});

export default userSlice;
