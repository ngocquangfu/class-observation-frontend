import React, { Component } from 'react';
import './Filter.scss'

export default class Filter extends Component {
    render() {
        return (
            <>
            <br/>
                <form className="filters">
                    <div className="filters__options">
                        <div className="filters__set">
                            <label htmlFor="filter-type">{this.props.filterName}</label>
                            {this.props.select}
                        </div>
                    </div>
                </form>

            </>
        )
    }

}