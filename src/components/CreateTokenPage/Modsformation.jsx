import React from 'react';
import {Button, FormGroup, Label, Row, Col, Input} from 'reactstrap';
import {mods} from '../../constants/mods';
import Avatar from "../nativeComponents/avatar/Avatar";

export default class ModsInformation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modFirst: '',
            modSecond: '',
            mods: [],
            currentMods: ''
        }
    }

    renderMod = () => {
        return (
            <React.Fragment>
                <Row>
                    <Col md={12}>
                        <Row key={2}>
                            <Col md={6} className={"d-flex flex-column"}>
                                <FormGroup>
                                    <Label for={`selectMod${2}`}>Select {2}
                                        <small>st</small> Characteristic</Label>
                                    <Input type="select" name={`selectMod${2}`} id={`selectMod${2}`}
                                           onChange={(e) => this.handleSelectMod(e, 2)}>
                                        {this.renderModList()}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for={`selectMod${1}`}>Select {1}
                                        <small>st</small> Characteristic</Label>
                                    <Input type="select" name={`selectMod${1}`} id={`selectMod${1}`}
                                           onChange={(e) => this.handleSelectMod(e, 1)}>
                                        {this.renderModList()}
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Avatar className={"d-flex justify-content-center col-md-6 pb-5"}
                                       hexHash={this.props.tokenData.hash}
                                       hairColor={this.props.tokenData.hairColor}
                                       eyeType={this.props.tokenData.eyesStyle}
                                       top={this.props.tokenData.topStyle}
                                       skinColor={this.props.tokenData.skinColor}
                                       facialHair={this.props.tokenData.facialHair}/>

                        </Row>
                    </Col>
                </Row>

            </React.Fragment>
        )
    };

    renderModList = () => {
        // TODO exclude selected mode from src list for view
        return this.state.mods.map(
            (mod, idx) => <option key={idx} value={idx} alt={mod.description}>{mod.value}</option>
        )
    };

    handleSelectMod = (e, num) => {

        let mod1desc = (num === 1) ? e.target[e.target.value].attributes["alt"].nodeValue : this.state.modFirst;
        let mod2desc = (num === 2) ? e.target[e.target.value].attributes["alt"].nodeValue : this.state.modSecond;

        this.setState({
            modFirst: mod1desc,
            modSecond: mod2desc
        }, this.props.update(num, e.target.value));

    };


    componentDidMount() {
        this.state.mods = mods;
        this.state.currentMods = this.props.currentMods
    }

    render() {

        return (
            <React.Fragment>
                <Col className="create-token-form">

                    <Row form>
                        <Col md={12}>
                            <div className="py-2 text-center">
                                <h4>Step: Characteristics <small>only two charactaristics</small></h4>
                                <p className="lead">Below is an example form built entirely with Bootstrap's form
                                    controls. Each required form group has a validation state that can be triggered by
                                    attempting to submit the form without completing it.</p>
                            </div>
                        </Col>
                    </Row>

                    {this.renderMod()}


                    <div className="py-2 text-center">
                        <Button
                            className="py-2 d-none d-md-inline-block border-0"
                            style={{marginRight: 10}}
                            onClick={this.props.previousStep}>Previous Step</Button>
                        <Button
                            className="py-2 d-none d-md-inline-block border-0"
                            style={{marginRight: 10}}
                            onClick={this.props.nextStep}>Next Step</Button>
                    </div>
                </Col>
            </React.Fragment>
        )
    }
}