import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalState } from "../../features/modal/modalSlice";
import SwiperComponent from "../swiper/SwiperComponent";
import axiosClient from "../../features/api/axiosClient";
import "./heroSlide.scss";
import { Link } from "react-router-dom";
import { originalImgUrl } from "../../features/api/apiRoutesData";
import { getPopularMovies } from "../../features/movies/popularMoviesSlice";
import { getPopularMovieData } from "../../features/movies/popularMoviesSlice";
import Spinner from "../spinner/Spinner";

const HeroSlider = () => {
    const dispatch = useDispatch();
    const { popularMovies } = useSelector(getPopularMovieData());

    const handleWatchTrailerClick = (movieId) => {
        dispatch(setModalState({ movieId, actionType: "open" }));
    };

    useEffect(() => {
        dispatch(getPopularMovies());
    }, []);

    let data = popularMovies.slice(0, 5).map((movie) => {
        const { id, original_title, overview, backdrop_path, poster_path } =
            movie;
        return (
            <div
                key={id}
                className="hero-movie-card"
                style={{
                    backgroundImage: `url(${originalImgUrl(backdrop_path)})`,
                }}>
                <div className="hero-movie-card__info">
                    <span>{original_title}</span>
                    <p>{overview}</p>
                    <div className="hero-movie-card__info__btn-container">
                        <Link className="btn-neutral" to={`/movie/${id}`}>
                            more details
                        </Link>
                        <button
                            className="btn-primary"
                            onClick={() => handleWatchTrailerClick(id)}>
                            watch trailer
                        </button>
                    </div>
                </div>

                <div className="hero-movie-card__poster-container">
                    <img src={originalImgUrl(poster_path)} alt="movie poster" />
                </div>
            </div>
        );
    });
    return <SwiperComponent elements={data} />;
};

export default HeroSlider;
