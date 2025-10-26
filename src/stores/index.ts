import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import {roleReducer} from "./roleSlice.ts";
import {voteReducer} from "./voteSlice.ts";
import { campaignReducer } from "./campainSlice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        role: roleReducer,
        vote: voteReducer,
        campaign: campaignReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;