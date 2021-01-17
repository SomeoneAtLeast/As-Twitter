import React from "react";

import './post-add-form.css';

//onAdd - деструкт из пропсов

const PostAddForm = ({onAdd}) => {
    return (
        <div className="bottom-panel d-flex">
            <input
                type="text"
                placeholder="О чем вы думаете сейчас?"
                className='from-control new-post-label'
            />
            <button
                type="submit"
                className="btn btn-outline-secondary"
                onClick={() => onAdd('Hello')}>
                Добавить
            </button>
        </div>
    )
}

export default PostAddForm;