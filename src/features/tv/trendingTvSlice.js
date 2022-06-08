import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

let initialState = {
    isLoading: false,
    isError: false,
    error: null,
    totalPages: null,
    trendingTv: [],
};

export const fetchTrendingTv = createAsyncThunk(
    "/tv/trdening",
    (page = 1, { rejectWithValue }) =>
        axiosClient
            .get(`/trending/tv/week?page=${page}`)
            .then((res) => res.data)
            .catch((err) => {
                throw rejectWithValue(err.message);
            })
);

const trendingTvSlice = createSlice({
    name: "trendingTv",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTrendingTv.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.trendingTv = payload.results;
            state.totalPages = payload.total_pages;
        },
        [fetchTrendingTv.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.error = action.payload;
        },
        [fetchTrendingTv.pending]: (state) => {
            state.isLoading = true;
        },
    },
});

export const getTrendingTv = () => (store) => store.trendingTv;
export default trendingTvSlice.reducer;
