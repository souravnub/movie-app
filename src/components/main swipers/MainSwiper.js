import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { originalImgUrl } from "../../features/api/apiRoutesData";
import { FaInfoCircle } from "react-icons/fa";
import SwiperComponent from "../swiper/SwiperComponent";
import "./mainswipers.scss";

const MainSwiper = ({ mediaType, type, dataArr }) => {
    let [slidesPerView, setSlidesPerView] = useState(6);

    const data = dataArr.map((element) => {
        const { id, original_title, original_name, poster_path } = element;
        return (
            <div className="similar-movie-card">
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
    });

    const breakpoints = {
        extraSm: 500,
        small: 700,
        medium: 900,
        large: 1200,
    };

    useEffect(() => {
        let windowWidth = window.innerWidth;
        let { extraSm, small, medium, large } = breakpoints;

        if (windowWidth <= extraSm) {
            setSlidesPerView(3);
        } else if (windowWidth > extraSm && windowWidth <= small) {
            setSlidesPerView(4);
        } else if (windowWidth <= medium && windowWidth >= small) {
            setSlidesPerView(5);
        } else if (windowWidth >= medium && windowWidth <= large) {
            setSlidesPerView(6);
        } else {
            setSlidesPerView(7);
        }
    }, []);

    return (
        <>
            <div className="main-swiper-container">
                <div className="head-container">
                    <span>
                        {type} {mediaType}
                    </span>
                    <Link
                        to={`/more/${mediaType}/${
                            type === "top rated" ? "top_rated" : type
                        }`}
                        className="btn-primary">
                        view more
                    </Link>
                </div>
            </div>
            <div className="similar-movies-container">
                <SwiperComponent
                    elements={data}
                    slidesPerView={slidesPerView}
                    spaceBetween={10}
                    isPagination={false}
                />
            </div>
        </>
    );
};

export default MainSwiper;
