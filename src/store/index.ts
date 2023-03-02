import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => {
  //   if (__DEV__) {
  //     return getDefaultMiddleware();
  //   }
  //   return getDefaultMiddleware();
  // },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
