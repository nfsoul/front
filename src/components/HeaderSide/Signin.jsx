import React, {Component} from 'react';
import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader} from 'reactstrap';
import * as Context from "../../context";
import PieAlert from "../nativeComponents/PieAlert";
import Recaptcha from "react-recaptcha";

import {recaptcha} from "../../constants/conf"

class Signin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            personInfo: {
                email: '',
                password: '',
                captchaKey: '',
            },
            hasError: false,
            errorMsg: ''
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    handleSubmit(event, auth) {
        event.preventDefault();
        this.clearError();

        auth.logIn(this.state.personInfo).then(result => {

            if (result.status === 200) {
                // auth.checkSessionToken();
                this.setState({
                    modal: false
                });

                // TODO: redirect to homePage
            }

            if (result.status === 401) {
                this.setState({
                    hasError: true,
                    errorMsg: result.data.error,
                });
            }
        });
    };

    async clearError() {
        await this.setState({
            hasError: false,
            errorMsg: '',
            responseStatus: false
        });
    }

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

    onRecaptchaLoad = () => {
        console.log("Recaptcha loaded");
    };

    onRecaptchaVerify = (a) => {
        const { personInfo } = this.state;
        this.setState({
            personInfo: {
                ...personInfo,
                captchaKey: a
            }
        });
    };

    render() {
        return (

            <Context.Auth.Consumer>

                {Auth => (
                    <div className={"pr-2"}>
                        <Button color="secondary py-2 d-none d-md-inline-block bg-transparent" onClick={this.toggle}>Sign in</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Gateway</ModalHeader>
                            <ModalBody>

                                <Form onSubmit={(e) => this.handleSubmit(e, Auth)}>
                                    <PieAlert type={"danger"} message={this.state.errorMsg}/>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" onChange={this.handleChange} id="email" placeholder="Email address" />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password" name="password" onChange={this.handleChange} id="password" placeholder="Password" />
                                    </FormGroup>

                                    <Recaptcha
                                        sitekey={recaptcha.siteKey}
                                        render="explicit"
                                        onloadCallback={this.onRecaptchaLoad}
                                        verifyCallback={this.onRecaptchaVerify}
                                    />

                                    <Button color="btn btn-lg btn-secondary btn-block" type="submit">Sign in</Button>{' '}
                                </Form>

                            </ModalBody>
                        </Modal>
                    </div>
                )}
            </Context.Auth.Consumer>
        );
    }
}

export default Signin;
