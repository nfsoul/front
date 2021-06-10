import React, {Component} from 'react';
import {Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader,} from 'reactstrap';
import * as Context from "../../context";
import Select from "../nativeComponents/Select"
import {safeMapArrToOptions as mapToOptions} from "../../utils/utils"
import PieAlert from "../nativeComponents/PieAlert";
import {Link} from 'react-router-dom'
import Recaptcha from "react-recaptcha";
import {recaptcha} from "../../constants/conf";


const initState = {
    modal: false,
    personInfo: {
        email: '',
        password: '',
        account: '',
        captchaKey: '',
        agreementsAccepted: false
    },
    validate: {},
    formDisabled: true
};

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = initState;
    }

    toggle = () => {
        this.setState(prevState => ({
            validate: prevState.modal ? {} : prevState.validate,
            modal: !prevState.modal
        }));
    };

    handleSubmit = (event, auth) => {
        event.preventDefault();
        this.clearError();
        auth.register(this.state.personInfo).then(result => {
            console.log(result)

            if (result.status === 200) {
                this.setState({
                    successMsg: "Successfully sign up, please leave this window and sign in"
                });
            }
            if (result.status === 400) {
                this.setState({
                    errorMsg: result.data.error,
                });
            }
        });
    };

    handleChange = (event) => {
        const {name, value} = event.target;
        const {personInfo} = this.state;
        this.setState({
            personInfo: {
                ...personInfo,
                [name]: value
            }
        });
    };

    handleAgreement = (e) => {
        const {id, checked} = e.target;
        const {personInfo} = this.state;
        personInfo[id] = checked;
        this.setState({
            personInfo: personInfo
        })
    };

    clearError = () => {
        this.setState({
            errorMsg: '',
        });
    };

    validateEmail = (e) => {
        const emailRex = /^[\w!#$%&’*+/=?`{|}~^-]+(?:\.[\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}$/;
        const {validate} = this.state;
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({validate})
    };

    validatePassword = (e) => {
        const passwordRex = /^(?=.*[A-Za-z\d@$!%*#?&])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
        const {validate} = this.state;
        if (passwordRex.test(e.target.value)) {
            validate.passwordState = 'has-success'
        } else {
            validate.passwordState = 'has-danger'
        }
        this.setState({validate})
    };

    validateConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        const {validate} = this.state;
        if (confirmPassword === this.state.personInfo.password) {
            validate.passwordConfirmState = 'has-success'
        } else {
            validate.passwordConfirmState = 'has-danger'
        }
        this.setState({validate})
    };

    isFormEnabled = (state) => {
        const {validate} = state;
        const {personInfo} = state;
        return validate.emailState === 'has-success'
            && validate.passwordState === 'has-success'
            && validate.passwordConfirmState === 'has-success'
            && personInfo.agreementsAccepted && personInfo.captchaKey
            && (state.personInfo.account && state.personInfo.account.length === 42);
    };

    onRecaptchaLoad = () => {
        console.log("Recaptcha loaded");
    };

    onRecaptchaVerify = (a) => {
        const {personInfo} = this.state;
        this.setState({
            personInfo: {
                ...personInfo,
                captchaKey: a
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
                                <Button className="py-2 d-none d-md-inline-block bg-transparent border-0"
                                        onClick={this.toggle}>Sign up</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>Registration</ModalHeader>
                                    <ModalBody>

                                        <Form onSubmit={(e) => this.handleSubmit(e, Auth)} autoComplete={"off"}>
                                            <PieAlert type={"danger"} message={this.state.errorMsg}/>
                                            <FormGroup autoComplete={"off"}>
                                                <Label for="email">Email</Label>
                                                <Input type="email" name="email"
                                                       onChange={(e) => {
                                                           this.validateEmail(e);
                                                           this.handleChange(e)
                                                       }}
                                                       id="email"
                                                       placeholder="Email address"
                                                       valid={this.state.validate.emailState === 'has-success'}
                                                       invalid={this.state.validate.emailState === 'has-danger'}
                                                       autoComplete={"off"}/>
                                                <FormFeedback valid>
                                                    That's a tasty looking email you've got there.
                                                </FormFeedback>
                                                <FormFeedback invalid>
                                                    Uh oh! Looks like there is an issue with your email. Please input a
                                                    correct email.
                                                </FormFeedback>
                                            </FormGroup>

                                            <FormGroup autoComplete={"off"}>
                                                <Label for="password">Password</Label>
                                                <Input type="password" name="password"
                                                       onChange={(e) => {
                                                           this.validatePassword(e);
                                                           this.handleChange(e)
                                                       }}
                                                       id="password"
                                                       placeholder="Password"
                                                       valid={this.state.validate.passwordState === 'has-success'}
                                                       invalid={this.state.validate.passwordState === 'has-danger'}
                                                       autoComplete={"off"}/>
                                                <FormFeedback valid>
                                                    Great, your password is secure!
                                                </FormFeedback>
                                                <FormFeedback invalid>
                                                    Looks like your password isn't secure.
                                                    Password must contain at least 8 characters with one digit and
                                                    should not contain some special characters.
                                                </FormFeedback>
                                            </FormGroup>

                                            <FormGroup autoComplete={"off"}>
                                                <Label for="confirmPassword">Confirm password</Label>
                                                <Input type="password" name="confirmPassword"
                                                       onChange={(e) => {
                                                           this.validateConfirmPassword(e);
                                                           this.handleChange(e)
                                                       }}
                                                       id="confirmPassword" placeholder="Confirm Password"
                                                       valid={this.state.validate.passwordConfirmState === 'has-success'}
                                                       invalid={this.state.validate.passwordConfirmState === 'has-danger'}
                                                       autoComplete={"off"}/>
                                                <FormFeedback valid>
                                                    You've got it! Passwords match!
                                                </FormFeedback>
                                                <FormFeedback invalid>
                                                    Passwords do not match
                                                </FormFeedback>
                                            </FormGroup>

                                            <Select
                                                id={"account"}
                                                label={"Ethereum account"}
                                                options={mapToOptions(Web3.accounts)}
                                                noOptionsLabel={"looks like u've not enabling your metamask plugin or haven't an eth account connected with metamask"}
                                                onChange={(e) => this.handleChange(e)}
                                            />


                                            <div className={"form-check"}>
                                                <Input type="checkbox" id="agreementsAccepted"
                                                       onChange={this.handleAgreement}
                                                       checked={this.state.personInfo.agreement}/>
                                                <Label for={"agreementsAccepted"}>I agree with <Link target={"_blank"}
                                                                                                     to={"/agreement"}>terms
                                                    of use and processing of my personal data.</Link></Label>
                                            </div>

                                            <div className={"mb-3"}>
                                                <Recaptcha
                                                sitekey={recaptcha.siteKey}
                                                render="explicit"
                                                onloadCallback={this.onRecaptchaLoad}
                                                verifyCallback={this.onRecaptchaVerify}/>
                                            </div>


                                            <Button
                                                hidden={this.state.successMsg}
                                                color="secondary btn btn-lg btn-primary btn-block"
                                                disabled={!this.isFormEnabled(this.state)}
                                                type="submit">Sign up</Button>{' '}

                                            <PieAlert type={"success"} message={this.state.successMsg}/>
                                        </Form>
                                    </ModalBody>
                                </Modal>
                            </div>
                        )}
                    </Context.Auth.Consumer>
                )}
            </Context.Web3.Consumer>
        );
    }
}

export default Signup;
