/* ProtectedRoute.js */
import React from 'react';
import {Route} from 'react-router-dom';
import * as Context from "../context/index";
import Forbidden from "../components/Errors/Forbidden";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (<Context.Auth.Consumer>

        {Auth => (
            <Route
                render={
                    props =>
                        Auth.isLoggedIn
                            ? <Component {...props} {...Auth} />
                            : <Route component={Forbidden}/>
                }
                {...rest}
            />
        )}
    </Context.Auth.Consumer>
    )
};
