import React from "react";

const SearchBox = ({d, search}) => {
    return(
        <div className="pa2">
        <input type="search" placeholder="Search a robot" className="pa3 ba hover-bg-light-green search" onChange={search}/></div>
    )
};

export default SearchBox;
