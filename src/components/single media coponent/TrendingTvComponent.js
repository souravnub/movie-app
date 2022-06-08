import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainMediaComponent from "./MainMediaComponent";
import {
    fetchTrendingTv,
    getTrendingTv,
} from "../../features/tv/trendingTvSlice";
import "./mediaComponent.scss";
import SpinnerNoraml from "../spinner/SpinnerNormal";
const TrendingTvComponent = () => {
    const { trendingTv, isLoading, totalPages } = useSelector(getTrendingTv());

    const dispatch = useDispatch();

    const [dataArr, setDataArr] = useState(trendingTv);
    const [page, setPage] = useState(1);
    const [hideBtn, setHideBtn] = useState(false);
    const [init, setInit] = useState(trendingTv.length === 0 ? true : false);

    const pageIncrement = () => {
        if (!(page + 1 > totalPages)) {
            dispatch(fetchTrendingTv(page + 1));
            setPage((prev) => prev + 1);
        } else {
            setHideBtn(true);
        }
    };

    useEffect(() => {
        if (init) {
            dispatch(fetchTrendingTv());
        }
        setInit(false);
    }, []);

    useEffect(() => {
        if (dataArr.length === 0) {
            return setDataArr(trendingTv);
        }
        if (dataArr.length !== 0 && page !== 1) {
            return setDataArr((prev) => prev.concat(trendingTv));
        }
    }, [trendingTv]);

    return (
        <>
            <MainMediaComponent dataArr={dataArr} mediaType="tv" />
            <div className="btn-container">
                {isLoading ? (
                    <SpinnerNoraml />
                ) : (
                    <button
                        disabled={hideBtn}
                        className="btn"
                        onClick={pageIncrement}>
                        fetch more
                    </button>
                )}
            </div>
        </>
    );
};

export default TrendingTvComponent;
