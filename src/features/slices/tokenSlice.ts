import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'token',
    initialState: '',
    reducers: {
        setToken: (_state, action: PayloadAction<string>) => action.payload,
        deleteToken: () => '',
    }
})

export const {setToken, deleteToken} = tokenSlice.actions;
export default tokenSlice.reducer;