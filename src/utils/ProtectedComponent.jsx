/* ProtectedRoute.js */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Context from "../context";

export class ProtectedComponent extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render = () => {
        return (<Context.Auth.Consumer>

            {Auth => (
                (Auth.isLoggedIn()
                        ?
                        <div className={this.props.className}>
                            {this.props.children}
                        </div>
                        : (this.props.onNotLogged
                                ? this.props.onNotLogged
                                : null
                        )
                )
            )}

        </Context.Auth.Consumer>)
    }


}

ProtectedComponent.propTypes = {
    onNotLogged: PropTypes.element,
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
};
