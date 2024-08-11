import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    channelId: null,
    channelName: null,
};

export const channelSlice = createSlice({
    name: "channel",
    initialState,
     reducers: {
        setchannelInfo: (state, action) => {
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
        }
     }
})

export const { setchannelInfo } = channelSlice.actions;

export const selectchannelId = (state) => state.channel.channelId;
export const selectchannelName = (state) => state.channel.channelName;

export default channelSlice.reducer;