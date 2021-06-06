import React from "react";
import "./Scroll.css"

const Scroll = (props) => {
    return (
        <div className="scrolled" style={{overflow: 'scroll', border: '1px solid black', height: '800px'}}>
            {props.children}
        </div>
    )
};

export default Scroll
