import React from "react";

const SpinnerNormal = ({ small }) => {
    return (
        <div
            className="spinner-normal"
            style={
                small && {
                    "--border-width": ".15em",
                    width: "1.3rem",
                    height: "1.3rem",
                }
            }
        />
    );
};

export default SpinnerNormal;
