import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTrendingMovies,
    getTrendingMovies,
} from "../../features/movies/trendingMoviesSlice";
import MainMediaComponent from "./MainMediaComponent";
import "./mediaComponent.scss";
import SpinnerNoraml from "../spinner/SpinnerNormal";

const TrendingMoviesMedia = () => {
    const { trendingMovies, isLoading, totalPages } = useSelector(
        getTrendingMovies()
    );

    const dispatch = useDispatch();

    const [dataArr, setDataArr] = useState(trendingMovies);
    const [page, setPage] = useState(1);
    const [hideBtn, setHideBtn] = useState(false);
    const [init, setInit] = useState(
        trendingMovies.length === 0 ? true : false
    );

    const pageIncrement = () => {
        if (!(page + 1 > totalPages)) {
            dispatch(fetchTrendingMovies(page + 1));
            setPage((prev) => prev + 1);
        } else {
            setHideBtn(true);
        }
    };

    useEffect(() => {
        if (init) {
            dispatch(fetchTrendingMovies());
        }
        setInit(false);
    }, []);

    useEffect(() => {
        if (dataArr.length === 0) {
            return setDataArr(trendingMovies);
        }
        if (dataArr.length !== 0 && page !== 1) {
            return setDataArr((prev) => prev.concat(trendingMovies));
        }
    }, [trendingMovies]);

    return (
        <>
            <MainMediaComponent dataArr={dataArr} mediaType="movies" />
            <div className="btn-container">
                {isLoading ? (
                    <SpinnerNoraml />
                ) : (
                    <button
                        disabled={hideBtn}
                        className="btn"
                        onClick={pageIncrement}>
                        fetch more
                    </button>
                )}
            </div>
        </>
    );
};

export default TrendingMoviesMedia;
