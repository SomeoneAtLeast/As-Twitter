import React, { Component } from "react";

import './search-panel.css';

export default class SearchPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ""
        }

        this.onUpdateSherch = this.onUpdateSherch.bind(this);
    }

    onUpdateSherch(e) {
        const term = e.target.value;
        // setState({term}) то же самое, что setState({term:term})
        this.setState({term});
        // это не рекурсия, это другая функция из app, она обновляет стейт еще и там
        // закидываем в props
        this.props.onUpdateSherch(term);

    }

    render() {
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onUpdateSherch}
                />
        )
    }
}

