import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { originalImgUrl } from "../../features/api/apiRoutesData";
import {
    fetchTrendingMovies,
    getTrendingMovies,
} from "../../features/movies/trendingMoviesSlice";

import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./mediaComponent.scss";
import { fetchTopRatedMovies } from "../../features/movies/topRatedMoviesSlice";
import { fetchTrendingTv } from "../../features/tv/trendingTvSlice";
import { fetchTopRatedTV } from "../../features/tv/topRatedTvSlice";

const getFetchingFunction = (mediaType, contentType) => {
    switch (mediaType) {
        case "movies":
            switch (contentType) {
                case "trending":
                    return fetchTrendingMovies();
                case "top_rated":
                    return fetchTopRatedMovies();
                default:
                    return;
            }
        case "tv":
            switch (contentType) {
                case "trending":
                    return fetchTrendingTv();
                case "top_rated":
                    return fetchTopRatedTV();
                default:
                    return;
            }
    }
};

const MediaComponent = () => {
    const { mediaType, contentType } = useParams();
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
            dispatch(getFetchingFunction(mediaType, contentType));
        }
        setInit(false);
    }, []);

    useEffect(() => {
        if (dataArr.length == 0) {
            return setDataArr(trendingMovies);
        }
        if (dataArr.length !== 0 && page !== 1) {
            return setDataArr((prev) => prev.concat(trendingMovies));
        }
    }, [trendingMovies]);

    return (
        <div className="main-media-container">
            <div className="main-grid-container">
                {dataArr.map((ele) => {
                    const { id, poster_path, original_name, original_title } =
                        ele;
                    return (
                        <div className="similar-movie-card" key={id}>
                            <div className="img-container">
                                <img
                                    src={originalImgUrl(poster_path)}
                                    alt={original_title || original_name}
                                />
                                <Link
                                    className="overlay"
                                    to={
                                        mediaType === "movies"
                                            ? `/movie/${id}`
                                            : `/tv/${id}`
                                    }>
                                    <FaInfoCircle />
                                </Link>
                            </div>
                            <span>{original_title || original_name}</span>
                        </div>
                    );
                })}
            </div>

            <button
                disabled={hideBtn}
                className="btn-primary"
                onClick={pageIncrement}>
                fetch more {page}
            </button>
        </div>
    );
};

export default MediaComponent;
