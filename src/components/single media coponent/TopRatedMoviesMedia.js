import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainMediaComponent from "./MainMediaComponent";
import {
    fetchTopRatedMovies,
    getTopRatedMovies,
} from "../../features/movies/topRatedMoviesSlice";
import "./mediaComponent.scss";
import SpinnerNoraml from "../spinner/SpinnerNormal";
const TopRatedMoviesMedia = () => {
    const { topRatedMovies, isLoading, totalPages } = useSelector(
        getTopRatedMovies()
    );

    const dispatch = useDispatch();

    const [dataArr, setDataArr] = useState(topRatedMovies);
    const [page, setPage] = useState(1);
    const [hideBtn, setHideBtn] = useState(false);
    const [init, setInit] = useState(
        topRatedMovies.length === 0 ? true : false
    );

    const pageIncrement = () => {
        if (!(page + 1 > totalPages)) {
            dispatch(fetchTopRatedMovies(page + 1));
            setPage((prev) => prev + 1);
        } else {
            setHideBtn(true);
        }
    };

    useEffect(() => {
        if (init) {
            dispatch(fetchTopRatedMovies());
        }
        setInit(false);
    }, []);

    useEffect(() => {
        if (dataArr.length === 0) {
            return setDataArr(topRatedMovies);
        }
        if (dataArr.length !== 0 && page !== 1) {
            return setDataArr((prev) => prev.concat(topRatedMovies));
        }
    }, [topRatedMovies]);

    return (
        <>
            <MainMediaComponent dataArr={dataArr} mediaType="movies" />
            <div className="btn-container">
                {isLoading ? (
                    <SpinnerNoraml />
                ) : (
                    !hideBtn && (
                        <button className="btn-styled" onClick={pageIncrement}>
                            fetch more
                        </button>
                    )
                )}
            </div>
        </>
    );
};

export default TopRatedMoviesMedia;
