import React, {Component} from "react";

import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: "all", label: "Все"},
            {name: "like", label: "Понравилось"},
        ]
    }
    render() {
        const buttons = this.buttons.map(({name, label}) => {
            //вытаскиваем то, что передали в props в app
            const {filter, onFilterSelect} = this.props;
            const active = filter === name;
            const clazz = active ? "btn-info" : "btn-outline-secondary"
            return (
            // name уникальный, поэтому может использоваться в качестве key
                <button
                    key={name}
                    type="button"
                    className={`btn ${clazz}`}
                    // запускаем onFilterSelect и передаем ему name, этот name поедет в app
                    onClick={() => onFilterSelect(name)}>{label}</button>
            )
        });
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}

