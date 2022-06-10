import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./features/modal/modalSlice";
import popularMoviesSlice from "./features/movies/popularMoviesSlice";
import singleMovieSlice from "./features/movies/singleMovieSlice";
import topRatedMoviesSlice from "./features/movies/topRatedMoviesSlice";
import topRatedTvSlice from "./features/tv/topRatedTvSlice";
import trendingMoviesSlice from "./features/movies/trendingMoviesSlice";
import singleTvSlice from "./features/tv/singleTvSlice";
import trendingTvSlice from "./features/tv/trendingTvSlice";
import bookMarkedSlice from "./features/bookmarked/bookMarkedSlice";
import navSlice from "./features/navbar/navSlice";
import searchSlice from "./features/search/searchSlice";

const store = configureStore({
    reducer: {
        navbar: navSlice,
        modal: modalSlice,
        searchResult: searchSlice,
        bookmarked: bookMarkedSlice,
        popularMovies: popularMoviesSlice,
        singleMovieDetails: singleMovieSlice,
        trendingMovies: trendingMoviesSlice,
        topRatedMovies: topRatedMoviesSlice,
        topRatedTv: topRatedTvSlice,
        singleTvDetails: singleTvSlice,
        trendingTv: trendingTvSlice,
    },
});

export default store;
