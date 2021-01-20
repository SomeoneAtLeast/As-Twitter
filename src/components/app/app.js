import React, {Component} from "react";

import './app.css';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list"
import PostAddForm from "../post-add-form";

export default class App extends Component {
    // тут используется классический синтаксис. 
    // в уроке можно найти более новый.
    // Новый синтаксис называется Class fields
    constructor (props) {
        super(props);
        // В стейте то, что мы хотели бы менять.
        // data - это объект с постами, он может поступать с сервера, например
        // id (key)- обычно поступают с сервера. Они нужны для того, чтобы при добавлении
        // нового элемента Реакт понимал какие элементы изменились, а какие осталисть
        // без изменений и смог перерисовать только изменившиеся.
        this.state = {
            // нельзая напрямую удалять и добавлять в массив стейта, можно создать новыймассив
            // и заменить этот. Внутри объекта удалять свойства тоже нельзя. Иммутабильность

            data : [
                {label: "Going to learn React", important: true, like: false, id: "1"},
                {label: "That is so good", important: false, like: false, id: "2"},
                {label: "I need a break..", important: false, like: false, id: "3"},
            ]
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);

        // Новые id будут генерироватся от 4
        this.maxId = 4;
    }
    // deliteItem - та функция, которая передается до кнопки сквозь элементы
    // Функционал описан тут
    // Деструктурируем из стейта data
    deleteItem(id) {
        this.setState(({data}) => {
            // elem - каждый элемент массива. Сравниваем с id, который приходит от кнопки
            const index = data.findIndex(elem => elem.id === id); 
            // удалять оригинальные данные из стейта нельзя, нужен другой массив
            // Копируем от 0 до дого, на котоырй нажали 
            const before = data.slice(0, index);
            // а это со сделующего за индексом и до конца, поэтому второго аргумента нет.
            const after = data.slice(index + 1);
            // тут собираем все данные до и после
            const newArr = [...before, ...after];
            // таким образом бы не зменяем текущий массив, а помещаем новый
            return {
                data: newArr
            }

            // более чистая запись
            // const newArr = [...data.slice(0, index), ...data.slice(index + 1)];
            // без лишних переменных.
        } )
    }

    // body - текст нового поста
    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            // берем все из data + добавляем новый item
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        this.setState(({data}) => {
            // для иммутабильности стейт напрямую не меняем, создаем копию
             const index = data.findIndex(elem => elem.id === id);

             const old = data[index];
             // создаем новый объект, перезаписываем в нем свойство like.
             // То, что после запятой - перезапишится в этом объъекте
             const newItem = {...old, important: !old.important};
            // благодаря индексам новый объект вставляется туда, где был старый
             const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

             return {
                 data: newArr
             }
        })
    }

    onToggleLiked(id) {
        this.setState(({data}) => {
            // для иммутабильности стейт напрямую не меняем, создаем копию
             const index = data.findIndex(elem => elem.id === id);

             const old = data[index];
             // создаем новый объект, перезаписываем в нем свойство like.
             // То, что после запятой - перезапишится в этом объъекте
             const newItem = {...old, like: !old.like};
            // благодаря индексам новый объект вставляется туда, где был старый
             const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

             return {
                 data: newArr
             }
        })
    }

    render() {
        const {data} = this.state;
        // Вытаскиваем лайкнутые, length вытаскивает длину массива, то естль кол-во лайкнутых постов
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        return (
            <div className="app">
                <AppHeader
                liked={liked}
                allPosts={allPosts}/>
                <div className="searh-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                {/* А здесь мы передаем посты в props */}
                <PostList
                posts={this.state.data}
                //Передаю стрелочную функцию
                onDelete={this.deleteItem}
                // Будут переключать стейты лайков и импортант
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                onAdd={this.addItem}/>
            </div>
    
        )
    }
}
