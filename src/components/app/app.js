import React from "react";

import './app.css';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list"
import PostAddForm from "../post-add-form";

const App = () => {

    // data - это объект с постами, он может поступать с сервера, например
    // id (key)- обычно поступают с сервера. Они нужны для того, чтобы при добавлении
    // нового элемента Реакт понимал какие элементы изменились, а какие осталисть
    // без изменений и смог перерисовать только изменившиеся.
    const data = [
        {label: "Going to learn React", important: true, id: "q"},
        {label: "That is so good", important: false, id: "e"},
        {label: "I need a break..", important: false, id: "r"},
    ]

    return (
        <div className="app">
            <AppHeader/>
            <div className="searh-panel d-flex">
                <SearchPanel/>
                <PostStatusFilter/>
            </div>
            {/* А здесь мы передаем посты в props */}
            <PostList posts={data}/>
            <PostAddForm/>
        </div>

    )
}

export default App;