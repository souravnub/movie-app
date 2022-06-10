import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import { MdBookmarkAdded } from "react-icons/md";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu, openMenu } from "../../features/navbar/navSlice";

const Navbar = () => {
    const location = useLocation();
    let currentLoaction = location.pathname;

    const { isMenuOpen } = useSelector((store) => store.navbar);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isMenuOpen) {
            dispatch(closeMenu());
        }
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

    let links = [
        { text: "home", path: "/" },
        { text: "movies", path: "/movies" },
        { text: "TV series", path: "/tv" },
    ];

    return (
        <nav>
            <Link className="logo" to="/">
                <span>t</span>
                <span>movies</span>
            </Link>

            <ul
                className={`nav-links-container ${
                    isMenuOpen ? "menu-open" : ""
                }`}>
                {links.map((link, idx) => {
                    return (
                        <li key={idx}>
                            <Link to={link.path}>{link.text}</Link>
                        </li>
                    );
                })}

                <button onClick={() => dispatch(closeMenu())}>
                    <CgClose />
                </button>
            </ul>

            <div className="nav-btn-container">
                <button onClick={() => dispatch(openMenu())}>
                    <HiOutlineMenuAlt3 />
                </button>

                <Link to="/bookmarked" className="bookmark-link">
                    <MdBookmarkAdded />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
