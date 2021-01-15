import React, {Component} from "react";
import './post-list-item.css';

// Компонент деструктурировали из реакта
export default class PostListItem extends Component {
    // тут используется классический синтаксис. 
    // в уроке можно найти более новый.
    constructor (props) {
        super(props);
        // state - это состояние конкретного экземпляра.
        this.state = {
            important: false,
            like: false
        };
        // Обязательно привязываем обработчик к контексту
        // То есть к конкретному объекту
        this.onImportant = this.onImportant.bind(this);
        this.onLike = this.onLike.bind(this);
    }

    onImportant () {
        // state можно менять только с помощью setState
        // state.important деструктурировали в {important}
        // {} обернули в () чтобы получить подходищий для jsx результат
        this.setState(({important}) => ({
            // здесь мы просто меняем на противоположное
            // чтобы работало в обе стороны
            important: !important
        }))
    }

    onLike() {
        this.setState(({like}) => ({
            like: !like
        }))
    }

    render () {
    // Вытаскиваем нужные переменные из this.props;
    // То есть из свойств каждого созданного объекта
    const {label} = this.props;
    // important берем из стейта
    // Like тоже из стейта
    const {important, like} = this.state;
    let classNames = "app-list-item d-flex justify-content-between";

    // а тут меняем важность и лайки в css и html
    if (important) {
        classNames += " important";
    } 

    if (like) {
        classNames += " like";
    } 

    return (
            <div className={classNames}>
                <span
                className = "app-list-item-label"
                onClick = {this.onLike}>
                    {label}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button 
                    className="btn-star btm-sm"
                    type="button"
                    // onImportant будет срабатывать при клике на кнопку
                    // в кажом экземпляре
                    onClick = {this.onImportant}>
                        <i className="fa fa-star"></i> 
                    </button>
                    <button 
                    className="btn-trash btm-sm"
                    type="button">
                        <i className="fa fa-trash-o"></i> 
                    </button>
                    <i className="fa fa-heart"></i> 
                </div>
            </div>
        )
    }
}




// Здесь мы деструктурируем объект props (это объект с свойствами)
// И достаем из него только свойство объекта Label, то есть создаем переменную
// Label и далее используем ее без props.


// const PostListItem = ({label, important = false}) => {

//     let classNames = "app-list-item d-flex justify-content-between";
//     if (important) {
//         classNames += " important";
//     } 

//     return (
//         <div className={classNames}>
//             <span className = "app-list-item-label">
//                 {label}
//             </span>
//             <div className="d-flex justify-content-center align-items-center">
//                 <button 
//                 className="btn-star btm-sm"
//                 type="button">
//                     <i className="fa fa-star"></i> 
//                 </button>
//                 <button 
//                 className="btn-trash btm-sm"
//                 type="button">
//                     <i className="fa fa-trash-o"></i> 
//                 </button>
//                 <i className="fa fa-heart"></i> 
//             </div>
//         </div>
//     )
// }

// export default PostListItem;