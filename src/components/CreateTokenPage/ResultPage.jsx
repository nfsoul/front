import React from 'react';
import {Button, FormGroup, Label, Row, Col, Input} from 'reactstrap';
import {ErrorHandler} from "../Errors/ErrorHandler";
import web3hoc from '../../hoc/web3hoc';
import Avatar from "../nativeComponents/avatar/Avatar";


// TODO: check checkbox for Bill of sale

class ResultPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMsg: '',
            isLoading: false,
            isSended: false,
            token: {}
        }
    }

    renderFiled = (labelFor, labelText, fieldValue, fieldSize = 4) => {
        return (
            <Col md={fieldSize}>
                <Label for={labelFor}>{labelText}: </Label>
                {' '}
                {fieldValue}
            </Col>
        )
    };

    render() {

        const {
            birthday,
            description,
            firstName,
            gender,
            lastName,
            mods,
            middleName,
            region
        } = this.props.resultData;

        return (
            <React.Fragment>
                <Col className="create-token-form">

                    <Row form>
                        <Col md={12}>
                            <div className="py-2 text-center">
                                <h4>Tokenize</h4>
                                <p className="lead">Below is an example form built entirely with Bootstrap's form
                                    controls. Each required form group has a validation state that can be triggered by
                                    attempting to submit the form without completing it.</p>
                            </div>
                        </Col>
                    </Row>

                    <FormGroup tag="fieldset" row>
                        <Col sm={12}>

                            <div className="py-2 text-center">
                                <h4
                                    // className="d-flex justify-content-between align-items-center mb-3"
                                >Soul Preview</h4>
                            </div>
                            <Row className={"d-flex flex-row flex-wrap"}>
                                <Avatar className={"d-flex justify-content-center col-md-6 pb-5"}
                                           hexHash={this.props.resultData.hash}
                                           hairColor={this.props.resultData.hairColor}
                                           eyeType={this.props.resultData.eyesStyle}
                                           top={this.props.resultData.topStyle}
                                           skinColor={this.props.resultData.skinColor}
                                           facialHair={this.props.resultData.facialHair}/>

                                <Col md={6} className="list-group mb-3">

                                    <Row form className="list-group-item d-flex justify-content-between lh-condensed">

                                        {
                                            this.renderFiled("firstName", "First Name", firstName)
                                        }

                                        {
                                            this.renderFiled("middleName", "Middle Name", middleName)
                                        }

                                        {
                                            this.renderFiled("lastName", "Last Name", lastName)
                                        }

                                    </Row>

                                    <Row form className="list-group-item d-flex justify-content-between lh-condensed">

                                        {
                                            this.renderFiled("birthday", "Birthday", birthday)
                                        }

                                        {
                                            this.renderFiled("gender", "Gender", gender)
                                        }

                                        {
                                            this.renderFiled("region", "Region", region)
                                        }


                                    </Row>

                                    <Row form className="list-group-item d-flex justify-content-between lh-condensed">
                                        {
                                            this.renderFiled("mods", "Mods", mods, 10)
                                        }
                                    </Row>

                                    <Row form className="list-group-item d-flex justify-content-between lh-condensed">
                                        {
                                            this.renderFiled("description", "Self description", description, 12)
                                        }
                                    </Row>

                                </Col>
                            </Row>
                        </Col>
                    </FormGroup>

                    <div className="py-2 text-center">
                        <FormGroup row>
                            <Label for="checkbox2" sm={6}>Bill of sale</Label>
                            <Col sm={{size: 4}}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" id="checkbox2"/>{' '}
                                        I agree
                                    </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                    </div>

                    <div className="py-2 text-center">
                        <FormGroup check row>

                            <Row>
                                {
                                    (this.state.hasError) && (<ErrorHandler props={this.state.errorMsg}/>)
                                }
                            </Row>


                            <Button
                                className="py-2 d-none d-md-inline-block border-0"
                                style={{marginRight: 10}}
                                onClick={this.props.previousStep}>Previous Step</Button>


                            <Button
                                className="py-2 d-none d-md-inline-block border-0"
                                style={{marginRight: 10}}
                                type="submit"
                            >Request to tokenize</Button>

                        </FormGroup>
                    </div>

                </Col>
            </React.Fragment>
        )
    }
}

export default web3hoc(ResultPage);
