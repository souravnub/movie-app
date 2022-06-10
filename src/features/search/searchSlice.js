import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

let initialState = {
    totalPages: null,
    totalResults: null,
    isLoading: false,
    isError: false,
    error: null,
    searchResults: {},
};

export const fetchSearchResults = createAsyncThunk(
    "/serach/movies",
    (args, { rejectWithValue }) => {
        const { query, mediaType, page = 1 } = args;
        return axiosClient
            .get(`/search/${mediaType}`, {
                params: { page, query },
            })
            .then((res) => res.data)
            .catch((err) => {
                rejectWithValue(err.response.data.status_message);
            });
    }
);

const searchMovieSlice = createSlice({
    name: "serachMovie",
    initialState,
    extraReducers: {
        [fetchSearchResults.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = false;
            state.searchResults = payload.results;
            state.totalPages = payload.total_pages;
            state.totalResults = payload.total_results;
        },
        [fetchSearchResults.rejected]: (state, { payload }) => {
            state.isLoading = false;
            state.isError = true;
            state.error = payload;
        },
        [fetchSearchResults.pending]: (state) => {
            state.isLoading = true;
        },
    },
});

export default searchMovieSlice.reducer;
