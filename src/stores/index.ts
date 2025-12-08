import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { roleReducer } from "./roleSlice";
import { voteReducer } from "./voteSlice";
import { campaignReducer } from "./campainSlice";
import sessionReducer from "./sessionSlice.ts";

import storage from "redux-persist/lib/storage"; // localStorage
import {
    persistReducer,
    persistStore,
} from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["session"],
};

const rootReducer = combineReducers({
    user: userReducer,
    role: roleReducer,
    vote: voteReducer,
    campaign: campaignReducer,
    session: sessionReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
