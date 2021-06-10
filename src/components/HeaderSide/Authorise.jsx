import React, { Component } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, } from 'reactstrap';
import * as Context from "../../context";
import Select from "../nativeComponents/Select"
import { safeMapArrToOptions as mapToOptions } from "../../utils/utils"
import PieAlert from "../nativeComponents/PieAlert";
import { Link } from 'react-router-dom'
import Recaptcha from "react-recaptcha";
import { recaptcha } from "../../constants/conf";

export default class Authorise extends Component {

    constructor(props) {
        super(props);
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        const { personInfo } = this.state;
        this.setState({
            personInfo: {
                ...personInfo,
                [name]: value
            }
        });
    };

    render() {
        return (
            <Context.Web3.Consumer>
                {Web3 => (
                    <Context.Auth.Consumer>
                        {Auth => (
                            <div>
                                <Link
                                    className="py-2 d-none d-md-inline-block token-block"
                                    to="/soul"
                                >Enter</Link>
                            </div>
                        )}
                    </Context.Auth.Consumer>
                )}
            </Context.Web3.Consumer>
        );
    }
}