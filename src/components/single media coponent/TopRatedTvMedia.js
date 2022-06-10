import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainMediaComponent from "./MainMediaComponent";
import {
    fetchTopRatedTV,
    getTopRatedTv,
} from "../../features/tv/topRatedTvSlice";
import "./mediaComponent.scss";
import SpinnerNoraml from "../spinner/SpinnerNormal";
const TopRatedTvMedia = () => {
    const { topRatedTv, isLoading, totalPages } = useSelector(getTopRatedTv());

    const dispatch = useDispatch();

    const [dataArr, setDataArr] = useState(topRatedTv);
    const [page, setPage] = useState(1);
    const [hideBtn, setHideBtn] = useState(false);
    const [init, setInit] = useState(topRatedTv.length === 0 ? true : false);

    const pageIncrement = () => {
        if (!(page + 1 > totalPages)) {
            dispatch(fetchTopRatedTV(page + 1));
            setPage((prev) => prev + 1);
        } else {
            setHideBtn(true);
        }
    };

    useEffect(() => {
        if (init) {
            dispatch(fetchTopRatedTV());
        }
        setInit(false);
    }, []);

    useEffect(() => {
        if (dataArr.length === 0) {
            return setDataArr(topRatedTv);
        }
        if (dataArr.length !== 0 && page !== 1) {
            return setDataArr((prev) => prev.concat(topRatedTv));
        }
    }, [topRatedTv]);

    return (
        <>
            <MainMediaComponent dataArr={dataArr} mediaType="tv" />
            <div className="btn-container">
                {isLoading ? (
                    <SpinnerNoraml />
                ) : (
                    !hideBtn && (
                        <button className="btn-styled" onClick={pageIncrement}>
                            fetch more
                        </button>
                    )
                )}
            </div>
        </>
    );
};

export default TopRatedTvMedia;
