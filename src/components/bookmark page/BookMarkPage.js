import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookMarked } from "../../features/bookmarked/bookMarkedSlice";
import { BsBookmarkStarFill } from "react-icons/bs";
import "./bookmarkedPage.scss";
import BookmarkedElementContainer from "./BookmarkedElementContainer";

const BookMarkPage = () => {
    const bookmarked = useSelector(getBookMarked());
    const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
    const [bookmarkedTv, setBookmarkedTv] = useState([]);

    useEffect(() => {
        let bookmarkedMovies = bookmarked.filter(
            (ele) => ele.mediaType === "movie"
        );
        setBookmarkedMovies(bookmarkedMovies);
        let bookmarkedTv = bookmarked.filter((ele) => ele.mediaType === "tv");
        setBookmarkedTv(bookmarkedTv);
    }, [bookmarked]);

    return (
        <div className="main-parent-bookmark-container">
            <div className="heading">
                <span className="bar-bottom">bookMarks</span>
                <BsBookmarkStarFill />
            </div>
            <div className="main-bookmark-container">
                <BookmarkedElementContainer
                    dataArr={bookmarkedMovies}
                    currentMedia="movies"
                />
                <BookmarkedElementContainer
                    dataArr={bookmarkedTv}
                    currentMedia="tv"
                />
            </div>
        </div>
    );
};

export default BookMarkPage;
