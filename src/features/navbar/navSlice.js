import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    isMenuOpen: false,
};

const navSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        closeMenu: (state) => {
            state.isMenuOpen = false;
        },
        openMenu: (state) => {
            state.isMenuOpen = true;
        },
    },
});

export default navSlice.reducer;
export const { closeMenu, openMenu } = navSlice.actions;
