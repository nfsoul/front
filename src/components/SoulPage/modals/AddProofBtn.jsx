import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import PropTypes from "prop-types";
import React, {Component} from 'react';
// import * as Context from "../../../context";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {hexToNumberString} from "web3-utils";
import axios from "axios";

class AddProofBtn extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            ethToChange: "",
            proofUri: '',
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

    addProof = () => {

        const {instance, tokenId} = this.props;
        const {proofUri} = this.state;

        instance.methods.setTokenURI(hexToNumberString(tokenId), proofUri)
            .send({from: window.localStorage.getItem("eth_address"), gasPrice: 1500000000})
            .then(result => {
                    console.log("result: ", result);
            })
            .catch(error => {
                console.log("error: ", error);
            });
    };

    addProofWithBackend = () => {

        let {token} = this.state;

        let uri = "google.com"

        axios.post("",
            {
                tokenId: token.tokenId,
                uri: uri
            }, {
                headers: {
                    "Authorization": 'Bearer ' + window.localStorage.getItem("sessionToken")
                }
            })
            .then(response => {
                console.log("response: ", response.data);

                if (response.status === 200) {

                    this.setState({
                        token: {
                            proofs: response.data.result
                        }
                    });

                }
                // this.setState({ isLoading: false });
            })
            .catch(error => {
                console.log("error: ", error.response);
                this.setState({
                    hasError: true,
                    errorMsg: error.response.data.error,
                });
            })

    };

    render() {
        return (

                <React.Fragment>
                    <Button outline color="link" onClick={this.toggle}>
                        <FontAwesomeIcon icon={faPlusCircle} color="#00000"/>
                    </Button>

                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Add proof for raise money!</ModalHeader>

                        <ModalBody>
                            <div>Description body Description body Description body Description body</div>
                            <div className="d-flex align-items-baseline">
                                <div className="col-4">Link</div>
                                <input name="proofUri" onChange={this.handleChange} className="col-8 form-control"/>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="pr-2" color="primary" onClick={this.addProof}>Add proof</Button>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </React.Fragment>
        );
    }

}

export default AddProofBtn;

AddProofBtn.propTypes = {
    className: PropTypes.string,
    buttonLabel: PropTypes.string.isRequired,
    instance: PropTypes.object.isRequired // sc pie instance to call methods
};