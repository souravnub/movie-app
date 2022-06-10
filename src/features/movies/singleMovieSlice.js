import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

let initialState = {
    isLoading: false,
    isError: false,
    error: null,
    movieDetails: {},
};

export const getMovieDetails = createAsyncThunk(
    "movie/getMovieDetails",
    (movieId, { rejectWithValue }) =>
        axiosClient
            .get(`/movie/${movieId}`)
            .then((res) => res.data)
            .catch((err) => {
                throw rejectWithValue(err.response.data.status_message);
            })
);

const popularMoviesSlice = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {},
    extraReducers: {
        [getMovieDetails.pending]: (state) => {
            state.isLoading = true;
        },
        [getMovieDetails.fulfilled]: (state, { payload }) => {
            state.movieDetails = { ...payload, mediaType: "movie" };
            state.isLoading = false;
        },
        [getMovieDetails.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },
    },
});

export const getSingleMovieDetails = () => (store) => store.singleMovieDetails;
export default popularMoviesSlice.reducer;
