import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { originalImgUrl } from "../../features/api/apiRoutesData";
import axiosClient from "../../features/api/axiosClient";
import {
    getMovieDetails,
    getSingleMovieDetails,
} from "../../features/movies/singleMovieSlice";
import Spinner from "../spinner/Spinner";
import { FaInfoCircle } from "react-icons/fa";
import { TbFaceIdError } from "react-icons/tb";
import { MdBookmarkAdd, MdBookmarkRemove } from "react-icons/md";
import SwiperComponent from "../swiper/SwiperComponent";
import "./singlemovie.scss";
import {
    addToBookMarks,
    getBookMarked,
    removeFromBookMarks,
} from "../../features/bookmarked/bookMarkedSlice";

const SingleMovieInfo = () => {
    const { movieId } = useParams();

    const { isLoading, isError, error, movieDetails } = useSelector(
        getSingleMovieDetails()
    );

    const bookmarked = useSelector(getBookMarked());

    const [isBookMarked, setIsBookMarked] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const e = bookmarked.find((ele) => ele.id === movieDetails.id);
            if (e) {
                return setIsBookMarked(true);
            }
            return setIsBookMarked(false);
        }
    }, [bookmarked, isLoading]);

    let [slidesPerView, setSlidesPerView] = useState(6);

    const [casts, setCasts] = useState([]);
    const [relatedVedios, setRelatedVideos] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);

    const similarMoviesData =
        similarMovies &&
        similarMovies.map((movie) => {
            const { id, original_title, poster_path } = movie;
            return (
                <div className="similar-movie-card">
                    <div className="img-container">
                        <img
                            src={originalImgUrl(poster_path)}
                            alt={original_title}
                        />
                        <Link className="overlay" to={`/movie/${id}`}>
                            <FaInfoCircle />
                        </Link>
                    </div>
                    <span>{original_title}</span>
                </div>
            );
        });

    const breakpoints = {
        extraSm: 400,
        small: 500,
        medium: 800,
        large: 1200,
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieDetails(movieId));
        axiosClient.get(`/movie/${movieId}/credits`).then((res) => {
            let mainRes =
                res.data.cast &&
                res.data.cast.filter((cast) => {
                    if (cast.profile_path) {
                        return cast;
                    }
                    return;
                });
            setCasts(mainRes && mainRes.slice(0, 5));
        });
        axiosClient
            .get(`/movie/${movieId}/videos`)
            .then(
                (res) =>
                    res.data.results &&
                    setRelatedVideos(res.data.results.slice(0, 6))
            );
        axiosClient.get(`/movie/${movieId}/similar`).then((res) => {
            setSimilarMovies(res.data.results);
        });

        window.addEventListener("resize", () => {
            let windowWidth = window.innerWidth;
            let { small, medium, large, extraSm } = breakpoints;
            if (windowWidth <= extraSm) {
                setSlidesPerView(3);
            } else if (windowWidth >= extraSm && windowWidth <= small) {
                setSlidesPerView(4);
            } else if (windowWidth <= medium && windowWidth >= small) {
                setSlidesPerView(5);
            } else if (windowWidth >= medium && windowWidth <= large) {
                setSlidesPerView(6);
            } else {
                setSlidesPerView(8);
            }
        });
    }, [movieId]);

    const handleAddToBookmarks = () => {
        const { id, original_title, original_name, poster_path, mediaType } =
            movieDetails;
        const info = {
            id,
            original_title,
            original_name,
            poster_path,
            mediaType,
        };
        dispatch(addToBookMarks(info));
    };
    const removeFromBookmark = () => {
        dispatch(
            removeFromBookMarks({
                id: movieDetails.id,
                mediaType: movieDetails.mediaType,
            })
        );
    };

    if (isLoading) {
        return <Spinner />;
    }
    if (isError || movieDetails.success === false) {
        return (
            <div className="error-container">
                <TbFaceIdError className="icon" />
                <span>{error || movieDetails.status_message}</span>
            </div>
        );
    }

    const { backdrop_path, original_title, overview, poster_path, genres } =
        movieDetails;

    return (
        <>
            <div
                className="single-movie-info-container"
                style={{
                    backgroundImage: `linear-gradient(to top, black 12% , transparent 145%),url(${originalImgUrl(
                        backdrop_path
                    )})`,
                }}>
                <div className="single-movie-info-container__main-info">
                    <img
                        src={originalImgUrl(poster_path)}
                        alt={original_title}
                    />

                    <div className="single-movie-info-container__main-info__head">
                        <div className="head-info">
                            <span>{original_title}</span>

                            {!isBookMarked ? (
                                <button onClick={handleAddToBookmarks}>
                                    <MdBookmarkAdd className="icon" />
                                </button>
                            ) : (
                                <button onClick={removeFromBookmark}>
                                    <MdBookmarkRemove className="icon icon-red" />
                                </button>
                            )}
                        </div>
                        <div className="genres-container">
                            {genres &&
                                genres.map((genre) => {
                                    const { id, name } = genre;
                                    return (
                                        <div key={id} className="btn-primary">
                                            {name}
                                        </div>
                                    );
                                })}
                        </div>
                        <p>{overview}</p>

                        {casts && casts.length > 0 && (
                            <div className="casts-container">
                                <span>casts</span>
                                <div className="casts-container__casts-cards-container">
                                    {casts.map((cast) => {
                                        const { id, name, profile_path } = cast;
                                        return (
                                            <div className="cast-card" key={id}>
                                                <img
                                                    src={originalImgUrl(
                                                        profile_path
                                                    )}
                                                    alt={name}
                                                />
                                                <span>{name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="related-videos-container">
                {relatedVedios.map((video) => {
                    if (video.site.toLowerCase() === "youtube") {
                        return (
                            <div className="video-card" key={video.id}>
                                <span>{video.name}</span>
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${video.key}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen></iframe>
                            </div>
                        );
                    }
                })}
            </div>

            <div className="similar-movies-container">
                <span>similar</span>
                {similarMovies.length > 0 ? (
                    <SwiperComponent
                        elements={similarMoviesData}
                        slidesPerView={slidesPerView}
                        spaceBetween={10}
                        isPagination={false}
                    />
                ) : (
                    <h2 style={{ opacity: 0.5, textTransform: "capitalize" }}>
                        no similar movies found
                    </h2>
                )}
            </div>
        </>
    );
};

export default SingleMovieInfo;
