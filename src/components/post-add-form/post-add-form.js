import React, {Component} from "react";

import './post-add-form.css';

//onAdd - деструкт из пропсов

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }

        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    // e требуется для доступа к событию на конкретном элементе
    // функцию сюда не передаем, так как следующее значение value не зависит от предыдущего
    onValueChange(e) {
        this.setState ({
            text: e.target.value
        })
    }
    // для отмены перезагрузки страницы по умолчанию
    // передаем e и делаем preventdefault
    onSubmit(e) {
        e.preventDefault();
        // это функция из app
        this.props.addItem(this.state.text);
        // Менять стейт напрямую через сетстейт можно, если нам не требуется предыдущее состояние.
        this.setState({
            text: ""
        });

    }

    render() {
        return (
            <form
                className="bottom-panel d-flex"
                onSubmit = {this.onSubmit}>
                <input
                    type="text"
                    placeholder="О чем вы думаете сейчас?"
                    className="from-control new-post-label"
                    onChange={this.onValueChange}
                    // сделали элемент контралируемым.
                    // то есть можем им управлять.
                    value={this.state.text}
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary">
                    Добавить
                </button>
            </form>
        )
    }
}
