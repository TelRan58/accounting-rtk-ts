import {configureStore} from "@reduxjs/toolkit";
import token from "../features/slices/tokenSlice.ts";
import {accountApi} from "../features/api/accountApi.ts";

const preloadedState = JSON.parse(localStorage.getItem("state") || '{}') as {token: string};


export const store = configureStore({
    reducer: {
        token,
        [accountApi.reducerPath]: accountApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(accountApi.middleware),
})

store.subscribe(() => localStorage.setItem("state", JSON.stringify({token: store.getState().token})));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch