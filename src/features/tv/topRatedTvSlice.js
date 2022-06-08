import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

let initialState = {
    isLoading: false,
    isError: false,
    totalPages: null,
    error: null,
    topRatedTv: [],
};

export const fetchTopRatedTV = createAsyncThunk(
    "/tv/topRated",
    (page = 1, { rejectWithValue }) =>
        axiosClient
            .get(`/tv/top_rated?page=${page}`)
            .then((res) => res.data)
            .catch((err) => {
                throw rejectWithValue(err.message);
            })
);

const topRatedTvSlice = createSlice({
    name: "topRatedTV",
    initialState,
    extraReducers: {
        [fetchTopRatedTV.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.topRatedTv = payload.results;
            state.totalPages = payload.total_pages;
        },
        [fetchTopRatedTV.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },
        [fetchTopRatedTV.pending]: (state) => {
            state.isLoading = true;
        },
    },
});

export const getTopRatedTv = () => (store) => store.topRatedTv;

export default topRatedTvSlice.reducer;
