import React, {Component} from "react";
import './post-list-item.css';

// Компонент деструктурировали из реакта
export default class PostListItem extends Component {

    render () {
    // Вытаскиваем нужные переменные из this.props;
    // То есть из свойств каждого созданного объекта
    // Мы вытащили Label и функцию OnDelete
    const {label, onDelete, onToggleImportant, onToggleLiked, important, like } = this.props;
    // important берем из стейта
    // Like тоже из стейта
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
                onClick = {onToggleLiked}>
                    {label}
                </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button 
                    className="btn-star btm-sm"
                    type="button"
                    // onImportant будет срабатывать при клике на кнопку
                    // в кажом экземпляре
                    onClick = {onToggleImportant}>
                        <i className="fa fa-star"></i> 
                    </button>
                    <button 
                    className="btn-trash btm-sm"
                    type="button"
                    onClick={onDelete}>
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