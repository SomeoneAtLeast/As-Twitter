import React from "react";

import './app-header.css';
// в функцию приходят props
const AppHeader = ({liked, allPosts}) => {
    return (
        <div className="app-header d-flex">
            <h1>Oleg Parhimchik</h1>
            <h2>{allPosts} записей, из них понравилось {liked}</h2>
        </div>
    )
}

export default AppHeader;