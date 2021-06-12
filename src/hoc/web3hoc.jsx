import React from 'react';
import * as Context from "../context";

const web3hoc = WrappedComponent => class extends React.Component {

    render() {
        
        return (
            <Context.Web3.Consumer>
                {
                    Web3 => (
                        <WrappedComponent
                            {...Web3}
                            {...this.props} />)
                }
            </Context.Web3.Consumer>)
    }
};


export default web3hoc;