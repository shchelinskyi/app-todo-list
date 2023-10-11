import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../slices/todoSlice.ts';
import creatingFormSlice from "../slices/creatingFormSlice";

const store = configureStore({
    reducer: {
        todo: todoSlice,
        creatingForm: creatingFormSlice,
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;