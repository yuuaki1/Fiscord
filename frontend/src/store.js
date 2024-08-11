import { configureStore } from '@reduxjs/toolkit';
import serverReducer from "./components/features/serverSlice"
import channelReducer from "./components/features/channelSlice"

export const store = configureStore({
    reducer: {
        server: serverReducer,
    },
})