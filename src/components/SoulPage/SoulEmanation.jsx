import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button } from 'antd';
import web3hoc from '../../hoc/web3hoc';
import { fromWei, hexToNumberString } from 'web3-utils';

class SoulEmanation extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hasError: false,
            errorMsg: ''
        };
        this.emanate = this.emanate.bind(this);
    }

    emanate = (address) => {
        const soulId = hexToNumberString(address);
        this.props.emitSoul(address, soulId);
    }

    render() {

        const { soul } = this.props;

        console.log("address: ", soul)

        return (
            <>
                <Row>
                    <Col span={12} offset={6}>
                        You should emanate your Soul
                        <Button key="1" type="primary" onClick={() => this.emanate(soul)}>Emanate</Button>
                    </Col>
                </Row>
            </>
        );
    }
}

export default web3hoc(SoulEmanation);
