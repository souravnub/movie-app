import React from "react";
import "./searchComponent.scss";
import { BiSearch } from "react-icons/bi";
import SpinnerNormal from "../spinner/SpinnerNormal";

const SearchComponent = ({
    isLoading,
    currentQueryVal,
    handleInputChange,
    handleFormSubmit,
}) => {
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="input-field-container">
                <input
                    type="text"
                    placeholder=" "
                    value={currentQueryVal}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
                <span className="input-bottom-line"></span>
            </div>
            <button type="submit">
                {isLoading ? <SpinnerNormal small={true} /> : <BiSearch />}
            </button>
        </form>
    );
};

export default SearchComponent;
