import React from 'react';
import * as Context from "../context";

export function authhoc(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                data: ''
            };
        }

        componentDidMount() {}

        componentWillUnmount() {}

        handleChange() {}

        render() {

            return (
                <Context.Auth.Consumer>
                    {
                        Auth => (
                            <WrappedComponent {...Auth} {...this.props} />)
                    }
                </Context.Auth.Consumer>)
        }
    };
}