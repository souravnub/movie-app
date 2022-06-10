import React from "react";
import { BsExclamation } from "react-icons/bs";
import { Link } from "react-router-dom";
import NotFoundImg from "../../assets/NotFound.svg";
import "./pageNotFound.scss";

const PageNotFound = () => {
    return (
        <div className="main-page-not-found-container">
            <img src={NotFoundImg} alt="" />

            <div className="main-page-not-found-container__info-container">
                <div className="top-head">
                    Oops <BsExclamation className="icon" />
                </div>
                <span>404</span>
                <div className="bottom-head">
                    <span> page not found</span>
                    <span>i tried to catch some fog but i missed it.</span>
                </div>

                <Link to="/" className="btn-styled">
                    back to home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;
