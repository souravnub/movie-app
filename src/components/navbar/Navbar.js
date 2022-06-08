import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
    const location = useLocation();
    let currentLoaction = location.pathname;

    useEffect(() => {
        let links = document.querySelectorAll("nav .nav-links-container li a");

        links.forEach((link) => {
            if (link.getAttribute("href") === currentLoaction) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        const navigation = document.querySelector("nav");
        window.addEventListener("scroll", (e) => {
            if (window.scrollY >= 30) {
                navigation.classList.add("background-appear");
            } else {
                navigation.classList.remove("background-appear");
            }
        });
    }, [window.scrollY]);

    return (
        <nav>
            <Link className="logo" to="/">
                <span>t</span>
                <span>movies</span>
            </Link>

            <ul className="nav-links-container">
                <li>
                    <Link to="/" className="active">
                        home
                    </Link>
                </li>
                <li>
                    <Link to="/movies">movies</Link>
                </li>
                <li>
                    <Link to="/tv">TV series</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
