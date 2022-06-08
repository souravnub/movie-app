import React from "react";
import "./bookmarkedPage.scss";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import { BsExclamationLg, BsFillBookmarkXFill } from "react-icons/bs";
import { originalImgUrl } from "../../features/api/apiRoutesData";
import { useDispatch } from "react-redux";
import { removeFromBookMarks } from "../../features/bookmarked/bookMarkedSlice";

const BookmarkedElementContainer = ({ currentMedia, dataArr }) => {
    const dispatch = useDispatch();

    const handleRemoveBookmark = ({ id, mediaType }) => {
        dispatch(removeFromBookMarks({ id, mediaType: mediaType }));
    };
    return (
        <div className="main-bookmark-container__sub-container">
            <span className="sub-heading bar-bottom">
                {currentMedia === "tv" ? "tv" : "movies"}
            </span>
            {dataArr.length > 0 ? (
                <div className="bookmarked-elements-container">
                    {dataArr.map((ele) => {
                        const {
                            id,
                            poster_path,
                            original_title,
                            original_name,
                            mediaType,
                        } = ele;
                        return (
                            <div className="element-card" key={id}>
                                <button
                                    onClick={() =>
                                        handleRemoveBookmark({ id, mediaType })
                                    }>
                                    <BsFillBookmarkXFill className="icon" />
                                </button>

                                <div className="img-container">
                                    <img
                                        src={originalImgUrl(poster_path)}
                                        alt={original_title || original_name}
                                    />
                                    <Link
                                        className="overlay"
                                        to={
                                            currentMedia === "tv"
                                                ? `/tv/${id}`
                                                : `/movie/${id}`
                                        }>
                                        <FaInfoCircle />
                                    </Link>
                                </div>
                                <span>{original_title || original_name}</span>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="empty-heading">
                    no bookmarked {currentMedia === "tv" ? "tv" : "movies"} yet{" "}
                    <BsExclamationLg />
                </div>
            )}
        </div>
    );
};

export default BookmarkedElementContainer;
