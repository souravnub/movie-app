import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { originalImgUrl } from "../../features/api/apiRoutesData";
import axiosClient from "../../features/api/axiosClient";
import Spinner from "../spinner/Spinner";
import { FaInfoCircle } from "react-icons/fa";
import SwiperComponent from "../swiper/SwiperComponent";
import "../single movie info/singlemovie.scss";
import {
    fetchSingleTvData,
    getSingleTvData,
} from "../../features/tv/singleTvSlice";

const SingleTvInfo = () => {
    const { tvId } = useParams();

    const { isLoading, isError, error, singleTvDetails } = useSelector(
        getSingleTvData()
    );
    let [slidesPerView, setSlidesPerView] = useState(6);

    const [casts, setCasts] = useState([]);
    const [relatedVedios, setRelatedVideos] = useState([]);
    const [similarTv, setSimilarTv] = useState([]);

    const similarTvData = similarTv.map((movie) => {
        const { id, original_title, original_name, poster_path } = movie;
        return (
            <div className="similar-movie-card">
                <div className="img-container">
                    <img
                        src={originalImgUrl(poster_path)}
                        alt={original_title || original_name}
                    />
                    <Link className="overlay" to={`/tv/${id}`}>
                        <FaInfoCircle />
                    </Link>
                </div>
                <span>{original_title || original_name}</span>
            </div>
        );
    });

    const breakpoints = {
        small: 500,
        medium: 800,
        large: 1200,
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSingleTvData(tvId));
        axiosClient
            .get(`/tv/${tvId}/credits`)
            .then((res) => setCasts(res.data.cast.slice(0, 5)));
        axiosClient
            .get(`/tv/${tvId}/videos`)
            .then((res) => setRelatedVideos(res.data.results.slice(0, 6)));
        axiosClient.get(`/tv/${tvId}/similar`).then((res) => {
            setSimilarTv(res.data.results);
        });

        let windowWidth = window.innerWidth;
        let { small, medium, large } = breakpoints;
        if (windowWidth <= small) {
            setSlidesPerView(4);
        } else if (windowWidth <= medium && windowWidth >= small) {
            setSlidesPerView(5);
        } else if (windowWidth >= medium && windowWidth <= large) {
            setSlidesPerView(6);
        } else {
            setSlidesPerView(8);
        }
    }, [tvId]);

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <h1>error : {error}</h1>;
    }

    const {
        backdrop_path,
        original_title,
        original_name,
        overview,
        poster_path,
        genres,
    } = singleTvDetails;

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
                        alt={original_title || original_name}
                    />

                    <div className="single-movie-info-container__main-info__head">
                        <span>{original_title || original_name}</span>
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
                <SwiperComponent
                    elements={similarTvData}
                    slidesPerView={slidesPerView}
                    spaceBetween={10}
                    isPagination={false}
                />
            </div>
        </>
    );
};

export default SingleTvInfo;
