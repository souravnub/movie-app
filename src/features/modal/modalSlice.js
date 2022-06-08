import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isModalOpen: false,
    currentMovieId: null,
};

const modalSlice = createSlice({
    name: "modalSlice",
    initialState,
    reducers: {
        setModalState: (state, { payload }) => {
            const { movieId, actionType } = payload;

            state.currentMovieId = actionType === "open" ? movieId : null;
            state.isModalOpen = actionType === "open" ? true : false;
        },
    },
});

export const { setModalState } = modalSlice.actions;
export default modalSlice.reducer;
