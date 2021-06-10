import React from 'react';
import {Button, Col, FormGroup, Input, Label, Row} from 'reactstrap';
import {ErrorHandler} from "../Errors/ErrorHandler";
import web3hoc from '../../hoc/web3hoc';
import {
    topStyles,
    hairColorStyles,
    eyesStyles,
    skinStyles,
    facialHairStyles
} from '../nativeComponents/avatar/AvatarConst'
import Avatar from "../nativeComponents/avatar/Avatar";

class AdditionalInformation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMsg: 'The field is not filled '
        }

        this.nextStep = this.nextStep.bind(this);
    }

    update = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
        this.props.update(e.target.name, e.target.value);
    }

    nextStep = () => {
        this.props.nextStep();
    }


    renderFiled = (labelFor, labelText, inputType, inputName, inputId, onChange, collection) => {
        return (
            <Col>
                <FormGroup className={"d-flex flex-row"}>
                    <Label className={"col-md-3"} for={labelFor}>{labelText}</Label>
                    <Input type={inputType} name={inputName} id={inputId}
                           onChange={onChange}
                    >
                        {collection.map((item, idx) => <option key={idx} value={item}>{item}</option>)}
                    </Input>
                </FormGroup>
            </Col>
        )
    }

    render() {
        console.log(this.props.tokenData.hash)
        return (
            <React.Fragment>

                <Col className="create-token-form">

                    <Row form>
                        <Col md={12}>
                            <div className="py-2 text-center">
                                <h4>Additional Information</h4>
                                <p className="lead">Now u'll see your personal soul avatar. Some details may be
                                    customized and will be permanent, but other details may change.</p>
                            </div>
                        </Col>
                    </Row>

                    <div className={"d-flex flex-row"}>
                        <Row className={"flex-column col-md-6"} form>
                            {
                                this.renderFiled("eyesStyle", "Eye style", "select", "eyesStyle", "eyesStyle", this.update, eyesStyles)
                            }

                            {
                                this.renderFiled("topStyle", "Top style", "select", "topStyle", "topStyle", this.update, topStyles)
                            }

                            {
                                this.renderFiled("hairColor", "Hair color", "select", "hairColor", "hairColor", this.update, hairColorStyles)
                            }

                            {
                                this.renderFiled("skinColor", "Skin color", "select", "skinColor", "skinColor", this.update, skinStyles)
                            }
                            {
                                this.props.tokenData.gender === 'male' ? this.renderFiled("facialHair", "Facial hair", "select", "facialHair", "facialHair", this.update, facialHairStyles) : null
                            }
                        </Row>
                        <Avatar className={"d-flex justify-content-center col-md-6 pb-5"}
                                   hexHash={this.props.tokenData.hash}
                                   hairColor={this.props.tokenData.hairColor}
                                   eyeType={this.props.tokenData.eyesStyle}
                                   top={this.props.tokenData.topStyle}
                                   skinColor={this.props.tokenData.skinColor}
                                   facialHair={this.props.tokenData.facialHair}/>
                    </div>

                    {/* <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="eyesColor">Height</Label>
                                <Input type="text" name="tokenHeight" id="tokenHeight" onChange={this.update} />
                            </FormGroup>
                        </Col>

                        <Col md={4}>
                            <FormGroup>
                                <Label for="tokenWeight">Weight</Label>
                                <Input type="text" name="tokenWeight" id="tokenWeight" onChange={this.update} />
                            </FormGroup>
                        </Col>

                    </Row> */}

                    <div className="py-2 text-center">

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
                            onClick={this.nextStep}>Next Step</Button>
                    </div>

                </Col>

            </React.Fragment>
        )
    }
}

export default web3hoc(AdditionalInformation);
