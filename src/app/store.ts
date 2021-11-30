import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { brushSliceReducer } from './brushSlice';
import {canvasSliceReducer} from './canvasSlice'
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    canvasSlice: canvasSliceReducer,
    brushSlice: brushSliceReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
