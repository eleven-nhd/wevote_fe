import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import {roleReducer} from "./roleSlice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        role: roleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;