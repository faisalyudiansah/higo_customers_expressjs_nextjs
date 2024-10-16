import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./slices/customerSlice";

const store = configureStore({
    reducer: {
        customerSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
