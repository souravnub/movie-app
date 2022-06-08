import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTopRatedMovies,
    getTopRatedMovies,
} from "../features/movies/topRatedMoviesSlice";
import { fetchTopRatedTV, getTopRatedTv } from "../features/tv/topRatedTvSlice";
import {
    fetchTrendingMovies,
    getTrendingMovies,
} from "../features/movies/trendingMoviesSlice";
import HeroSlider from "./heroSlider/HeroSlider";
import MainSwiper from "./main swipers/MainSwiper";
import Modal from "./modal/Modal";
import { fetchTrendingTv, getTrendingTv } from "../features/tv/trendingTvSlice";

const Home = () => {
    const mediaTypes = {
        movie: "movies",
        tv: "tv",
    };
    const contentTypes = {
        trending: "trending",
        top_rated: "top rated",
    };

    const dispatch = useDispatch();
    const { trendingMovies } = useSelector(getTrendingMovies());
    const { topRatedMovies } = useSelector(getTopRatedMovies());
    const { topRatedTv } = useSelector(getTopRatedTv());
    const { trendingTv } = useSelector(getTrendingTv());

    useEffect(() => {
        dispatch(fetchTrendingMovies());
        dispatch(fetchTopRatedMovies());
        dispatch(fetchTopRatedTV());
        dispatch(fetchTrendingTv());
    }, []);

    return (
        <>
            <Modal />
            <HeroSlider />
            <MainSwiper
                mediaType={mediaTypes.movie}
                type={contentTypes.trending}
                dataArr={trendingMovies}
            />
            <MainSwiper
                mediaType={mediaTypes.movie}
                type={contentTypes.top_rated}
                dataArr={topRatedMovies}
            />
            <MainSwiper
                mediaType={mediaTypes.tv}
                type={contentTypes.top_rated}
                dataArr={topRatedTv}
            />
            <MainSwiper
                mediaType={mediaTypes.tv}
                type={contentTypes.trending}
                dataArr={trendingTv}
            />
        </>
    );
};

export default Home;
