import React, { useEffect, useState, useRef } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../../features/api/axiosClient";
import { setModalState } from "../../features/modal/modalSlice";
import "./modal.scss";

const Modal = () => {
    const dispatch = useDispatch();

    const [isError, setIsError] = useState(false);
    const { isModalOpen, currentMovieId: movieId } = useSelector(
        (store) => store.modal
    );

    const [embedSource, setEmbedSource] = useState(null);

    const embededVideoRef = useRef();

    const handleCloseModalClick = () => {
        setEmbedSource(null);
        dispatch(setModalState({ actionType: "close" }));
    };

    const getMovieTrailer = async (movieId) => {
        const response = await axiosClient.get(`/movie/${movieId}/videos`);

        let key = response.data.results.find(
            (result) => result.type.toLowerCase() === "trailer"
        ).key;
        setEmbedSource(`https://www.youtube.com/embed/${key}`);
    };

    useEffect(() => {
        if (isModalOpen) {
            try {
                if (isError) {
                    setIsError(false);
                }
                getMovieTrailer(movieId);
            } catch (error) {
                setEmbedSource(null);
                setIsError(true);
            }
        }
    }, [isModalOpen]);

    return (
        <div
            className={`main-modal-container ${
                isModalOpen ? "modal-open" : "modal-close"
            }`}>
            <div className="modal-content-container">
                <button onClick={handleCloseModalClick}>
                    <CgClose />
                </button>

                {embedSource && (
                    <iframe
                        ref={embededVideoRef}
                        src={embedSource}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                )}
            </div>
        </div>
    );
};

export default Modal;
