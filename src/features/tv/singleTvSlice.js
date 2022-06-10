import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

let initialState = {
    isLoading: false,
    isError: false,
    error: null,
    singleTvDetails: {},
};

export const fetchSingleTvData = createAsyncThunk(
    "/tv/singleTvInfo",
    (tvId, { rejectWithValue }) =>
        axiosClient
            .get(`/tv/${tvId}`)
            .then((res) => res.data)
            .catch((err) => {
                throw rejectWithValue(err.response.data.status_message);
            })
);

const singleTvSlice = createSlice({
    name: "singleTv",
    initialState,
    extraReducers: {
        [fetchSingleTvData.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.singleTvDetails = { ...payload, mediaType: "tv" };
        },
        [fetchSingleTvData.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },
        [fetchSingleTvData.pending]: (state) => {
            state.isLoading = true;
        },
    },
});

export const getSingleTvData = () => (store) => store.singleTvDetails;

export default singleTvSlice.reducer;
