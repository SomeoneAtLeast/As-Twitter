/* eslint-disable react/jsx-key */
import React from "react";

import './post-list.css';

import PostListItem from './../post-list-item';

// posts - это деструктуризация объекта props
const PostList = ({posts}) => {

    {/* Label - это props, то есть свойства объекта.
    Задаем индивидуальные свойства объектам и выводим их.
    Своего рода аргументы функции.
    important - такое же свойство объекта. 
    Это то же самое, что {true}, то есть важное, если есть, и неважное
    Если нет  */}
    // Берем массив объектов posts, проходимся по каждому объекту из массива
    // и превращаем его в li с нужными label и important
    const elements = posts.map((item) => {
        // Тут мы достали из item id, а все остальное поместили в itemProps.
        // Это нужно для того, чтобы id не передавались туда, где они не нужны.
        // Но ничего страшного в передаче id не туда нет,
        // они просто не будут использоваться
        const {id, ...itemProps} = item;

        return (
            // а тут мы применяем Id (key).
            <li key = {id} className = "list-group-item">
                {/* <PostListItem
                 label={item.label}
                 important = {item.important}/> */}
                 {/* Выше старый синтаксис, а можно использовать спрэд */}
                 <PostListItem {...itemProps}/>
                 {/* Так мы развернем объект item, где лежит 1 пост
                 и из-за того, что у нас совпадают ключи со значениями
                 label={item.label}
                 important = {item.important}
                 У нас сформируется нужынй объект */}

            </li>
        )
    });

    return (
        <ul className="app-list list-group">
            {/* Вставляем получившиеся li'шки */}
            {elements}
        </ul>
    )
}

export default PostList;