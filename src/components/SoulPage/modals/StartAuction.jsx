import { ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import PropTypes from "prop-types";
import React, { Component } from 'react';
import { hexToNumberString } from "web3-utils";
import { Modal, Avatar, Button, Row, Col } from 'antd';

class StartAuction extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            priceValue: '',
            modal: false
        }
    }

    handleChange = (e) => {

        if (isNaN(e.target.value)) return;

        this.setState({
            [e.target.name]: e.target.value
        })
    };


    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    wantToSell = () => {

        // upValue === priceValue
        const { instance, token } = this.props;

        instance.methods.sell(hexToNumberString(token.tokenId), this.state.priceValue)
            .send({ from: window.localStorage.getItem("eth_address") })
            .then(result => {
                console.log("result in wantToSell: ", result);

                if (result) {
                }
            })
            .catch(error => {
                console.log("error in : wantToSell", error)
            })
    };

    render() {
        return (
            <div className={this.props.className}>

                <div>
                    <Button outline color="success" size="lg" onClick={this.toggle}>
                        Sell your Soul
                    </Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Start Auction</ModalHeader>

                        <ModalBody>
                            <div>Description body Description body Description body Description body</div>
                            <div className="d-flex align-items-baseline">
                                <div className="col-4">Price:</div>
                                <input name="proofUri" onChange={this.handleChange} className="col-8 form-control" />
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="pr-2" color="primary" onClick={this.wantToSell}>Start</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </div>
            </div>
        );
    }

}

export default StartAuction;

StartAuction.propTypes = {
    className: PropTypes.string,
    instance: PropTypes.object.isRequired // sc pie instance to call methods
};