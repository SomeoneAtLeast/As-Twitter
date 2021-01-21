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
            ],
            // Для поиска
            term: "",
            // это состояние будет показывать как фильтровать посты.
            // all - так мы задали фильтр по умолчанию
            filter: "all"
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onUpdateSherch = this.onUpdateSherch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

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
    // прогоняем данные и сверем с term (это то, что ввел пользователь)
    searchPost(items, term) {
        // если пусто или стер, то верни все items
        if(term.length === 0) {
            return items
        }
        // ищем посты, где label совпадает с тем, что ввел пользователь
        //Если ничего не найдем, то получим -1, а это нас не интересует
        return items.filter((item) => {
            return item.label.indexOf(term) > -1
        })
    }

    filterPost(items, filter) {
        if (filter === "like") {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdateSherch (term) {
        this.setState({term})
    }

    // меняет фильтр в стейте на ток, который поступит от кнопки.
    onFilterSelect(filter) {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;
        // Вытаскиваем лайкнутые, length вытаскивает длину массива, то естль кол-во лайкнутых постов
        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;
        //привзка не нужна, так как это просто метод класса
        // Для фильтрации передаем массив, который сформирован searchPost и фильтр.
        // Отображаемы посты проходят сперва фильтрацию по тому, что пользователь ввел, а потом по тому, какой стоит фильтр.
        const visiblePost = this.filterPost(this.searchPost(data, term), filter);

        return (
            // все, что мы тут передаем компонентам - мы передаем в props, из которого можно вытаскивать в других компонентах.
            <div className="app">
                <AppHeader
                liked={liked}
                allPosts={allPosts}/>
                <div className="searh-panel d-flex">
                    <SearchPanel
                    onUpdateSherch={this.onUpdateSherch}/>
                    <PostStatusFilter
                    filter={filter}
                    // А тут обработчик для переключения фильтра
                    onFilterSelect={this.onFilterSelect}/>
                </div>
                {/* А здесь мы передаем посты в props */}
                <PostList
                posts={visiblePost}
                //Передаю стрелочную функцию
                onDelete={this.deleteItem}
                // Будут переключать стейты лайков и импортант
                onToggleImportant={this.onToggleImportant}
                onToggleLiked={this.onToggleLiked}/>
                <PostAddForm
                addItem={this.addItem}/>
            </div>
    
        )
    }
}
