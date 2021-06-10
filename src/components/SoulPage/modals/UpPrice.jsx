import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import PropTypes from "prop-types";
import React, {Component} from 'react';
import {hexToNumberString} from "web3-utils";

class UpPrice extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            newPrice: '',
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

    upAuction = () => {

        const {instance, token} = this.props;

        instance.methods.upAuction(hexToNumberString(token.tokenId), this.state.newPrice).call({from: window.localStorage.getItem("eth_address")})
            .then(result => {
                console.log("result upAuction: ", result)
            })
            .catch(error => {
                console.log("error upAuction: ", error)
            })
    };

    render() {
        return (
            <div className={this.props.className}>

                <div>
                    <Button color="danger" onClick={this.toggle}>
                        Up Price
                    </Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Add proof for raise money!</ModalHeader>

                        <ModalBody>
                            <div>Description body Description body Description body Description body</div>
                            <div className="d-flex align-items-baseline">
                                <div className="col-4">New Price</div>
                                <input name="newPrice" onChange={this.handleChange} className="col-8 form-control"/>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="pr-2" color="primary" onClick={this.upAuction}>Up Price</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </div>
            </div>
        );
    }

}

export default UpPrice;

UpPrice.propTypes = {
    className: PropTypes.string,
    instance: PropTypes.object.isRequired // sc pie instance to call methods
};