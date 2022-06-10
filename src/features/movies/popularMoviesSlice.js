import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

let initialState = {
    isLoading: false,
    isError: false,
    error: null,
    popularMovies: [],
};

export const getPopularMovies = createAsyncThunk(
    "/movies/popularMovies",
    (obj, { rejectWithValue }) => {
        return axiosClient
            .get("/movie/popular")
            .then((res) => res.data)
            .catch((err) => {
                rejectWithValue(err.response.data.status_message);
            });
    }
);

const popularMoviesSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {},
    extraReducers: {
        [getPopularMovies.fulfilled]: (state, { payload }) => {
            state.isLoading = false;

            state.popularMovies = payload.results;
        },
        [getPopularMovies.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },
        [getPopularMovies.pending]: (state) => {
            state.isLoading = true;
        },
    },
});

export const getPopularMovieData = () => (store) => store.popularMovies;
export default popularMoviesSlice.reducer;
