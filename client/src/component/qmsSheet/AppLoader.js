import React from "react";
import "../../css/AppLoader.css";

export const AppLoader = () => {
    return (
        <section className='app-loader'>
            <div className='bouncing-loader bouncing-loader1'>
                <div></div>
                <div></div>
                <div></div>
                <span><b>Loading</b></span>
            </div>
        </section>
    );
};