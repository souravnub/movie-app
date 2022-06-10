import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTopRatedMovies,
    getTopRatedMovies,
} from "../../features/movies/topRatedMoviesSlice";
import {
    fetchTrendingMovies,
    getTrendingMovies,
} from "../../features/movies/trendingMoviesSlice";
import SpinnerNormal from "../../components/spinner/SpinnerNormal";
import { originalImgUrl } from "../../features/api/apiRoutesData";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import "./moviesPage.scss";
import SearchComponent from "../../components/search/SearchComponent";
import { fetchSearchResults } from "../../features/search/searchSlice";

const MoviesPage = () => {
    const dispatch = useDispatch();
    const { isLoading: isTrendingLoading, trendingMovies } = useSelector(
        getTrendingMovies()
    );
    const { isLoading: isTopRatedLoading, topRatedMovies } = useSelector(
        getTopRatedMovies()
    );

    const [currentContentType, setCurrentContentType] = useState(
        localStorage.getItem("currentMoviesContentType" || "trending")
    );

    const [dataArr, setDataArr] = useState([]);
    const [topRatedMoviesArr, setTopRatedMoviesArr] = useState(topRatedMovies);
    const [trendingMoviesArr, setTrendingMoviesArr] = useState(trendingMovies);

    const [currentTrendingPage, setCurrentTrendingPage] = useState(1);
    const [currentTopRatedPage, setCurrentTopRatedPage] = useState(1);

    const [hadSearched, setHadSearched] = useState(false);

    const setDataArrToMainArr = (arr) => {
        // noDuplicateArr is the Arr containg all the data but without duplicate ... (request from the movie database was returning some duplicates in reslut)
        let noDuplicatesArr = [];
        arr.forEach((ele) => {
            let found = noDuplicatesArr.find((e) => e.id === ele.id);
            if (!found) {
                noDuplicatesArr.push(ele);
            }
        });
        setDataArr(noDuplicatesArr);
    };

    // setting everything up when contentType is changed ,, data Arr is also set here when more data is fetched or when trendingMoviesArr or topRatedMoviesArr is changed
    useEffect(() => {
        if (currentContentType === "trending") {
            setDataArrToMainArr(trendingMoviesArr);
        } else {
            setDataArrToMainArr(topRatedMoviesArr);
        }
    }, [currentContentType, trendingMoviesArr, topRatedMoviesArr]);

    // checking the arrays on initial render : if page is reloaded then only the below useeffect will show some effect
    useEffect(() => {
        if (
            currentContentType === "trending" &&
            trendingMoviesArr.length === 0
        ) {
            dispatch(fetchTrendingMovies());
        } else if (
            currentContentType === "topRated" &&
            topRatedMoviesArr.length === 0
        ) {
            dispatch(fetchTopRatedMovies());
        }
    }, []);

    // setting everything when the contentType is changed but the array to be displayed is empty
    useEffect(() => {
        if (
            currentContentType === "trending" &&
            trendingMoviesArr.length === 0
        ) {
            dispatch(fetchTrendingMovies());
        } else if (
            currentContentType === "topRated" &&
            topRatedMoviesArr.length === 0
        ) {
            dispatch(fetchTopRatedMovies());
        }
        localStorage.setItem("currentMoviesContentType", currentContentType);
    }, [currentContentType]);

    // setting everything when the fetching actions are dispatched (dataArr is not set here)
    useEffect(() => {
        if (!isTrendingLoading && currentContentType === "trending") {
            if (trendingMoviesArr.length === 0 && currentTrendingPage === 1) {
                setTrendingMoviesArr(trendingMovies);
            } else {
                setTrendingMoviesArr((prev) => prev.concat(trendingMovies));
            }
        } else if (!isTopRatedLoading && currentContentType === "topRated") {
            if (topRatedMoviesArr.length === 0 && currentTopRatedPage === 1) {
                setTopRatedMoviesArr(topRatedMovies);
            } else {
                setTopRatedMoviesArr((prev) => prev.concat(topRatedMovies));
            }
        }
    }, [trendingMovies, topRatedMovies]);

    const handleFetchMore = () => {
        if (currentContentType === "trending") {
            dispatch(fetchTrendingMovies(currentTrendingPage + 1));
            setCurrentTrendingPage((prev) => prev + 1);
        } else {
            dispatch(fetchTopRatedMovies(currentTopRatedPage + 1));
            setCurrentTopRatedPage((prev) => prev + 1);
        }
    };

    // below is the code for serachComponent
    const {
        isLoading: searchLoading,
        searchResults,
        totalResults,
    } = useSelector((store) => store.searchResult);

    const [query, setQuery] = useState("");
    const [currentSearchPage, setCurrentSearchPage] = useState(1);
    const [isResultArrEmpty, setIsResultArrEmpty] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (query.trim().length !== 0) {
            setHadSearched(true);
            dispatch(fetchSearchResults({ query, mediaType: "movie" }));
        } else {
            setHadSearched(false);
            if (currentContentType === "trending") {
                setDataArrToMainArr(trendingMoviesArr);
            } else {
                setDataArrToMainArr(topRatedMoviesArr);
            }
        }
    };
    const handleInputChange = (inp) => {
        setQuery(inp);
    };
    const handleRemoveSearch = () => {
        setQuery("");
        setHadSearched(false);
        if (currentContentType === "trending") {
            setDataArrToMainArr(trendingMoviesArr);
        } else {
            setDataArrToMainArr(topRatedMoviesArr);
        }
    };

    const handleFetchMoreSearchResults = () => {
        dispatch(
            fetchSearchResults({
                page: currentSearchPage + 1,
                mediaType: "movie",
                query,
            })
        );
        setCurrentSearchPage((prev) => prev + 1);
    };

    useEffect(() => {
        if (!searchLoading) {
            if (currentSearchPage === 1) {
                if (searchResults.length > 0) {
                    setIsResultArrEmpty(false);
                    setDataArr(searchResults);
                } else {
                    if (hadSearched) {
                        setIsResultArrEmpty(true);
                    }
                }
            } else {
                setDataArr((prev) => prev.concat(searchResults));
            }
        }
    }, [searchLoading]);

    return (
        <div className="main-movies-container">
            <div className="main-movies-container__btn-container">
                <SearchComponent
                    mediaType="movie"
                    currentQueryVal={query}
                    isLoading={searchLoading}
                    handleInputChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}
                />
                <div className="action-btn-container">
                    {hadSearched ? (
                        <button
                            onClick={handleRemoveSearch}
                            className="btn-close"
                            style={{
                                borderRadius: ".5em",
                                padding: ".3em .7em",
                            }}>
                            <CgClose />
                        </button>
                    ) : (
                        <>
                            <button
                                className={
                                    currentContentType === "trending"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setCurrentContentType("trending")
                                }>
                                trending
                            </button>
                            <button
                                className={
                                    currentContentType === "topRated"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setCurrentContentType("topRated")
                                }>
                                topRated
                            </button>
                        </>
                    )}
                </div>
            </div>

            {isResultArrEmpty ? (
                <h1>no matching result found !</h1>
            ) : (
                <div className="main-movies-container__movies-card-container">
                    {dataArr.map((ele) => {
                        const {
                            poster_path,
                            id,
                            original_title,
                            original_name,
                        } = ele;
                        return (
                            <div
                                key={id}
                                className="main-movies-container__movies-card-container__movie-card">
                                <div className="img-container">
                                    <img
                                        src={originalImgUrl(poster_path)}
                                        alt={original_title || original_name}
                                    />
                                    <Link to={`/movie/${id}`}>
                                        <FaInfoCircle />
                                    </Link>
                                </div>
                                <span>{original_name || original_title}</span>
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="main-movies-container__bottom-container">
                {!isTopRatedLoading && !isTrendingLoading ? (
                    hadSearched ? (
                        <div className="main-movies-container__bottom-container__search-bottom-btn-container">
                            {totalResults !== dataArr.length &&
                                (searchLoading ? (
                                    <SpinnerNormal small={true} />
                                ) : (
                                    <button
                                        className="btn-styled"
                                        onClick={handleFetchMoreSearchResults}>
                                        more search results
                                    </button>
                                ))}
                            <span>
                                totalResults : {totalResults} | currently
                                Showing :{" "}
                                {isResultArrEmpty ? 0 : dataArr.length}
                            </span>
                        </div>
                    ) : (
                        <button
                            className="btn-styled"
                            onClick={handleFetchMore}>
                            fetch more
                        </button>
                    )
                ) : (
                    <SpinnerNormal />
                )}
            </div>
        </div>
    );
};

export default MoviesPage;
