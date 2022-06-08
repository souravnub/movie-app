import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    bookmarked: JSON.parse(localStorage.getItem("bookmarked")) || [],
};

const bookMarkedSlice = createSlice({
    name: "bookmarked",
    initialState,
    reducers: {
        addToBookMarks: (state, { payload }) => {
            state.bookmarked = state.bookmarked.concat(payload);
            localStorage.setItem(
                "bookmarked",
                JSON.stringify(state.bookmarked)
            );
        },
        removeFromBookMarks: (state, { payload }) => {
            let newArr = [];
            const { id, mediaType } = payload;
            state.bookmarked.forEach((ele) => {
                if (!(ele.id === id && ele.mediaType === mediaType)) {
                    newArr.push(ele);
                }
            });
            state.bookmarked = newArr;
            localStorage.setItem("bookmarked", JSON.stringify(newArr));
        },
    },
});

export const getBookMarked = () => (store) => store.bookmarked.bookmarked;
export default bookMarkedSlice.reducer;
export const { addToBookMarks, removeFromBookMarks } = bookMarkedSlice.actions;
