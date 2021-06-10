import React, { useState } from 'react';
import { hexToNumberString } from "web3-utils";
import { Modal, Button } from 'antd';
import web3hoc from '../../../hoc/web3hoc';
import * as Context from "../../../context";

const SellSoul = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {

        console.log("SS props: ", this.props)

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

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Context.Web3.Consumer>
            {
                Web3 => (
                    <div className="ant-card-meta" style={{ textAlign: 'center', padding: '8px' }}>
                        <Button type="primary" onClick={showModal}>
                            Sell your Soul
                        </Button>

                        <Modal
                            title="Sell your Soul"
                            visible={isModalVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                        // isOpen={this.state.modal} 
                        // toggle={this.toggle}
                        >

                            set price
                            {/* <ModalHeader toggle={this.toggle}>Start Auction</ModalHeader>

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
                        </ModalFooter> */}
                        </Modal>

                    </div>
                )}
        </Context.Web3.Consumer>);

}
export default web3hoc(SellSoul);