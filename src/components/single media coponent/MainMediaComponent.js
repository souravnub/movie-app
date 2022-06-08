import React from "react";
import { originalImgUrl } from "../../features/api/apiRoutesData";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./mediaComponent.scss";

const MainMediaComponent = ({ dataArr, mediaType }) => {
    const location = useLocation().pathname;
    let splitArr = location.split("/");
    let content = splitArr[splitArr.length - 1];

    return (
        <div className="main-media-container">
            <div className="heading">
                <span>{content === "top_rated" ? "top rated" : content}</span>
                <span>{mediaType}</span>
            </div>
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
        </div>
    );
};

export default MainMediaComponent;
