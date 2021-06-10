import React, {Component} from "react";
import axios from "axios";

import * as conf from "../constants/conf"

// todo: defaultValue???
export const AuthContext = React.createContext(null);

class AuthProvider extends Component {

    constructor(props) {
        super(props);
        let sessionToken = window.localStorage.getItem("sessionToken");
        this.state = {
            token: window.localStorage.getItem("token"),
            email: window.localStorage.getItem("email"),
            sessionToken: sessionToken,
        };

        if (sessionToken) {
            console.log("session token exist:" + sessionToken);
            axios.defaults.headers.common['Authorization'] = "Bearer " + sessionToken;
        }
    }

    componentDidMount() {
        this.checkSessionToken();
    }


    isLoggedIn = () => {
        if (!this.state.sessionToken) {
            this.onFail("session token is null")
        }
        return this.state.sessionToken ? this.state.sessionToken.length > 10 : false;
    };

    onLoggedIn = (response) => {
        console.log("success logged: ");
        console.log(response);

        const result = response.data.result;

        console.log("result: ", result);

        window.localStorage.setItem("token", result.token);


        window.localStorage.setItem("email", result.email);
        window.localStorage.setItem("sessionToken", result.sessionToken);

        this.setState({
            token: result.token,
            email: result.email,
            sessionToken: result.sessionToken,
        });

        axios.defaults.headers.common['Authorization'] = "Bearer " + result.sessionToken;

        console.log(axios.defaults.headers);

        return response;
    };

    onFail = (error) => {
        console.log(error)
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("sessionToken");
        return error.response;
    };


    logIn = (authInfo) => {
        return axios.post(conf.urls.login, authInfo)
            .then(this.onLoggedIn)
            .catch(this.onFail);
    };

    logOut = () => {
        return axios.post(conf.urls.logout, {}).then(response => {
            if (response.status === 200) {
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("email");
                window.localStorage.removeItem("sessionToken");

                this.setState({
                    token: null,
                    email: null,
                    sessionToken: null
                });

                axios.defaults.headers.common['Authorization'] = null;

                document.location = "/";
            }
        }).catch(this.onFail);
    };

    register = (userInfo) => {
        return axios.post(conf.urls.register, userInfo)
            .then(this.onLoggedIn)
            .catch(this.onFail);
    };

    isAdmin = () => {
        return false;
    };

    checkSessionToken = () => {
        if (window.localStorage.getItem("sessionToken")) {
            axios.get(conf.urls.current)
                .then(this.onLoggedIn)
                .catch(this.onFail);
        }
    };

    render() {
        return (
            <AuthContext.Provider
                value={{
                    isLoggedIn: this.isLoggedIn,
                    logIn: this.logIn,
                    logOut: this.logOut,
                    register: this.register,
                }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export const Consumer = AuthContext.Consumer;
export const Provider = AuthProvider;