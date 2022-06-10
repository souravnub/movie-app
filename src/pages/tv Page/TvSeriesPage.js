import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpinnerNormal from "../../components/spinner/SpinnerNormal";
import { originalImgUrl } from "../../features/api/apiRoutesData";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import "../movies Page/moviesPage.scss";
import {
    fetchTrendingTv,
    getTrendingTv,
} from "../../features/tv/trendingTvSlice";
import {
    fetchTopRatedTV,
    getTopRatedTv,
} from "../../features/tv/topRatedTvSlice";
import { fetchSearchResults } from "../../features/search/searchSlice";
import SearchComponent from "../../components/search/SearchComponent";

const TvSeriesPage = () => {
    const dispatch = useDispatch();
    const { isLoading: isTrendingLoading, trendingTv } = useSelector(
        getTrendingTv()
    );
    const { isLoading: isTopRatedLoading, topRatedTv } = useSelector(
        getTopRatedTv()
    );

    const [currentContentType, setCurrentContentType] = useState(
        localStorage.getItem("currentTvContentType" || "trending")
    );

    const [dataArr, setDataArr] = useState([]);
    const [topRatedTvArr, setTopRatedTvArr] = useState(topRatedTv);
    const [trendingTvArr, setTrendingTvArr] = useState(trendingTv);

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

    // setting everything up when contentType is changed ,, data Arr is also set here when more data is fetched and whenever the topRatedTvArr or trendingTvArr is changed
    useEffect(() => {
        if (currentContentType === "trending") {
            setDataArrToMainArr(trendingTvArr);
        } else {
            setDataArrToMainArr(topRatedTvArr);
        }
    }, [currentContentType, trendingTvArr, topRatedTvArr]);

    // checking the arrays on initial render : if page is reloaded then only the below useeffect will show some effect
    useEffect(() => {
        if (currentContentType === "trending" && trendingTv.length === 0) {
            dispatch(fetchTrendingTv());
        } else if (
            currentContentType === "topRated" &&
            topRatedTv.length === 0
        ) {
            dispatch(fetchTopRatedTV());
        }
    }, []);

    // setting everything when the contentType is changed but the array to be displayed is empty
    useEffect(() => {
        if (currentContentType === "trending" && trendingTv.length === 0) {
            dispatch(fetchTrendingTv());
        } else if (
            currentContentType === "topRated" &&
            topRatedTv.length === 0
        ) {
            dispatch(fetchTopRatedTV());
        }
        localStorage.setItem("currentTvContentType", currentContentType);
    }, [currentContentType]);

    // setting everything when the fetching actions are dispatched (dataArr is not set here)
    useEffect(() => {
        if (!isTrendingLoading && currentContentType === "trending") {
            if (trendingTvArr.length === 0 && currentTrendingPage === 1) {
                setTrendingTvArr(trendingTv);
            } else {
                setTrendingTvArr((prev) => prev.concat(trendingTv));
            }
        } else if (!isTopRatedLoading && currentContentType === "topRated") {
            if (topRatedTvArr.length === 0 && currentTopRatedPage === 1) {
                setTopRatedTvArr(topRatedTv);
            } else {
                setTopRatedTvArr((prev) => prev.concat(topRatedTv));
            }
        }
    }, [trendingTv, topRatedTv]);

    const handleFetchMore = () => {
        if (currentContentType === "trending") {
            dispatch(fetchTrendingTv(currentTrendingPage + 1));
            setCurrentTrendingPage((prev) => prev + 1);
        } else {
            dispatch(fetchTopRatedTV(currentTopRatedPage + 1));
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
            dispatch(fetchSearchResults({ query, mediaType: "tv" }));
        } else {
            setHadSearched(false);
            if (currentContentType === "trending") {
                setDataArrToMainArr(trendingTvArr);
            } else {
                setDataArrToMainArr(topRatedTvArr);
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
            setDataArrToMainArr(trendingTvArr);
        } else {
            setDataArrToMainArr(topRatedTvArr);
        }
    };
    const handleFetchMoreSearchResults = () => {
        dispatch(
            fetchSearchResults({
                page: currentSearchPage + 1,
                mediaType: "tv",
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
                    mediaType="tv"
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
                                    <Link to={`/tv/${id}`}>
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

export default TvSeriesPage;
