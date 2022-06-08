import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./features/modal/modalSlice";
import popularMoviesSlice from "./features/movies/popularMoviesSlice";
import singleMovieSlice from "./features/movies/singleMovieSlice";
import topRatedMoviesSlice from "./features/movies/topRatedMoviesSlice";
import topRatedTvSlice from "./features/tv/topRatedTvSlice";
import trendingMoviesSlice from "./features/movies/trendingMoviesSlice";
import singleTvSlice from "./features/tv/singleTvSlice";
import trendingTvSlice from "./features/tv/trendingTvSlice";

const store = configureStore({
    reducer: {
        modal: modalSlice,
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
