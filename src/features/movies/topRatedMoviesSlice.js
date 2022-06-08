import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

let initialState = {
    isLoading: false,
    isError: false,
    error: null,
    totalPages: null,
    topRatedMovies: [],
};

export const fetchTopRatedMovies = createAsyncThunk(
    "/movies/topRated",
    (page = 1, { rejectWithValue }) =>
        axiosClient
            .get(`/movie/top_rated?page=${page}&`)
            .then((res) => res.data)
            .catch((err) => {
                throw rejectWithValue(err.message);
            })
);

const topRatedMoviesSlice = createSlice({
    name: "topRatedMovies",
    initialState,
    extraReducers: {
        [fetchTopRatedMovies.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.topRatedMovies = payload.results;
            state.totalPages = payload.total_pages;
        },
        [fetchTopRatedMovies.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },
        [fetchTopRatedMovies.pending]: (state) => {
            state.isLoading = true;
        },
    },
});

export const getTopRatedMovies = () => (store) => store.topRatedMovies;

export default topRatedMoviesSlice.reducer;
