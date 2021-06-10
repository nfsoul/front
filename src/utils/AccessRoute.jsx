import React from 'react';
import createClass from 'create-react-class';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Forbidden from "../components/Errors/Forbidden";

var AccessRoute = createClass({

    render: function () {
        var info = this.props.info;
        var component = this.props.component;
        var rest = this.props;
        var roles = this.props.roles;

        return (
            info && info.role && roles.includes(info.role)
                ?
                <Route {...rest} render={props => (
                    <component {...props} />
                )}/>
                :
                <Route component={Forbidden}/>
        );
    }
});

function mapStateToProps(state) {
    const {info} = state.info;
    return {
        info
    };
}

const connectedAccessRoute = connect(mapStateToProps)(AccessRoute);
export {connectedAccessRoute as AccessRoute};
