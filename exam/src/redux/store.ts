import { configureStore } from "@reduxjs/toolkit";
import langReducer from './slices/langSlice';

const store = configureStore({
    reducer: {
        chat: langReducer
    }
})
  
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
