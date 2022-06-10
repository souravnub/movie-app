import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

let initialState = {
    isLoading: false,
    isError: false,
    error: null,
    totalPages: null,
    trendingMovies: [],
};

export const fetchTrendingMovies = createAsyncThunk(
    "/movies/trending",
    (page = 1, { rejectWithValue }) =>
        axiosClient
            .get(`/trending/movie/week?page=${page}`)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                throw rejectWithValue(err.response.data.status_message);
            })
);

const trendingMoviesSlice = createSlice({
    name: "trendingMovies",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTrendingMovies.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.trendingMovies = action.payload.results;
            state.totalPages = action.payload.total_pages;
        },
        [fetchTrendingMovies.rejected]: (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.error = action.payload;
        },
        [fetchTrendingMovies.pending]: (state) => {
            state.isLoading = true;
        },
    },
});

export const getTrendingMovies = () => (store) => store.trendingMovies;
export default trendingMoviesSlice.reducer;
