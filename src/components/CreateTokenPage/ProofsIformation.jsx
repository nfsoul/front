import React from 'react';
import { Form, Button, FormGroup, Label, Row, Col, Input, FormText } from 'reactstrap';
import moment from 'moment';

//     "proofs": [
//     "facebook-f",
//     "telegram",
//     "instagram",
//     "google",
//     "ethereum"
//     }

export default class ProofsIformation extends React.Component {


    handleChange(event) {
        const { name, value } = event.target;
        const { token } = this.state;

        this.setState({
            token: {
                ...token,
                [name]: value
            }
        });
    };

    handleChangeDate(event) {
        const { name, value } = event.target;
        const { token } = this.state;

        this.setState({
            token: {
                ...token,
                [name]: moment(value, "YYYYMMDD")
            }
        });
    };

    handleCharAdd(event) {
        const { name, value } = event.target;
        const { token } = this.state;

        token.characteristics[name] = 1;

        this.setState({
            token: {
                ...token,
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <Col className="create-token-form">

                    <Row form>
                        <Col md={12}>
                            <div className="py-2 text-center">
                                <h4>Step: Proofs Information</h4>
                                <p className="lead">Below is an example form built entirely with Bootstrap's form controls. Each required form group has a validation state that can be triggered by attempting to submit the form without completing it.</p>
                            </div>
                        </Col>
                    </Row>

                    <FormGroup row>
                        <Label for="exampleFile" sm={2}>File</Label>
                        <Col sm={10}>
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                                This is some placeholder block-level help text for the above input.
                                It's a bit lighter and easily wraps to a new line.
                                </FormText>
                        </Col>
                    </FormGroup>

                    <div className="py-2 text-center">
                        <Button
                            className="py-2 d-none d-md-inline-block border-0"
                            style={{ marginRight: 10 }}
                            onClick={this.props.previousStep}>
                            Previous Step
                </Button>
                        <Button
                            className="py-2 d-none d-md-inline-block border-0"
                            style={{ marginRight: 10 }}
                            onClick={this.props.nextStep}>Next Step
                </Button>
                    </div>
                </Col>
            </React.Fragment>
        )
    }
}