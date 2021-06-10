import React from 'react';
import {Button, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import {ErrorHandler} from "../Errors/ErrorHandler";
import {genders} from '../../constants/genders';

import './MainInformation.css'
// import axios from "axios";


export default class MainInformation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMsg: 'The field is not filled'
        };

        this.nextStep = this.nextStep.bind(this);
    }

    update = (e) => {
        this.clearError();
        this.props.update(e.target.name, e.target.value);
    };

    renderField = (labelFor, labelText, inputType, inputName, inputId, inputPlaceholder, onChange, fieldSize = 4) => {
        return (
            <Col md={fieldSize}>
                <FormGroup>
                    <Label for={labelFor}>{labelText}</Label>
                    <Input
                        type={inputType}
                        name={inputName}
                        id={inputId}
                        placeholder={inputPlaceholder}
                        onChange={onChange}
                    />
                </FormGroup>
            </Col>
        )
    }

    renderSelectField = (labelFor, labelText, inputType, inputName, inputId, inputPlaceholder, onChange, collection = [], fieldSize = 4) => {
        return (
            <Col md={4}>
                <FormGroup>
                    <Label for={labelFor}>{labelText}</Label>
                    <Input
                        type={inputType}
                        name={inputName}
                        id={inputId}
                        placeholder={inputPlaceholder}
                        onChange={onChange}
                    >
                        {collection.map((item, idx) => <option key={idx} value={item.name}>{item.value}</option>)}
                    </Input>
                </FormGroup>
            </Col>
        )
    };

    validField = (field) => { }

    nextStep = () => {

        this.clearError();

        const { firstName, middleName, lastName, gender, birthday, region } = this.props.tokenData;

        if (
            firstName !== '' &&
            middleName !== '' &&
            lastName !== '' &&
            gender !== '' &&
            birthday !== '' &&
            region !== ''
        ) {
            // const token = this.props.tokenData;
            this.props.updateHash().then(() => this.props.nextStep())

        } else {
            this.setState({
                hasError: true,
                errorMsg: 'The field is not filled'
        })}
    };

    async clearError() {
        await this.setState({
            hasError: false,
            errorMsg: ''
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <React.Fragment>

                <Col className="create-token-form" >

                    <Row form>
                        <Col md={12}>
                            <div className="py-2 text-center">
                                <h4>Main Information</h4>
                                <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                            </div>
                        </Col>
                    </Row>

                    <Row form>

                        {
                            this.renderField("firstName", "First Name", "text", "firstName", "firstName", "", this.update)
                        }

                        {
                            this.renderField("middleName", "Middle Name", "text", "middleName", "middleName", "", this.update)
                        }

                        {
                            this.renderField("lastName", "Last name", "text", "lastName", "lastName", "", this.update)
                        }

                    </Row>

                    <Row form>

                        {
                            this.renderSelectField("gender", "Gender", "select", "gender", "gender", "", this.update, genders)
                        }


                        {
                            // TODO: date delimiter 
                            this.renderField("birthday", "Birthday", "date", "birthday", "birthday", "", this.update)
                        }

                        {
                            this.renderField("region", "Region", "text", "region", "region", "", this.update)
                        }

                    </Row>

                    <Row>
                        {
                            this.renderField("description", "Self description", "textarea", "description", "description", "", this.update, 12)
                        }
                    </Row>


                    <div className="py-2 text-center">

                        <Row>
                            {
                                (this.state.hasError) && (<ErrorHandler props={this.state.errorMsg} />)
                            }
                        </Row>

                        <Button
                            className="py-2 d-none d-md-inline-block border-0"
                            style={{ marginRight: 10 }}
                            onClick={this.nextStep}>Next Step</Button>

                    </div>

                </Col>

            </React.Fragment>
        )
    }
}