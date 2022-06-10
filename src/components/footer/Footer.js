import "./footer.scss";
import { Link } from "react-router-dom";

import React from "react";

const Footer = () => {
    return (
        <footer>
            <Link className="logo" to="/">
                <span>t</span>
                <span>movies</span>
            </Link>

            <div className="links-container">
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <a href="/">contact us</a>
                    </li>
                    <li>
                        <a href="/">terms of services</a>
                    </li>
                    <li>
                        <a href="/">about us</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <a href="/">live</a>
                    </li>
                    <li>
                        <a href="/">f a q</a>
                    </li>
                    <li>
                        <a href="/">premium</a>
                    </li>
                    <li>
                        <a href="/">privacy policy</a>
                    </li>
                </ul>

                <ul>
                    <li>
                        <a href="/">you must watch</a>
                    </li>
                    <li>
                        <a href="/">recently released</a>
                    </li>
                    <li>
                        <a href="/">top IMDB</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
