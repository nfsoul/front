import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Result, Button } from 'antd';

class SoulNotExists extends Component {

    render() {

        return (
            <Result
                status="666"
                title="666"
                subTitle="Sorry, this soul doesn't exist or burned"
                extra={<Button type="primary">Back Home</Button>}
            />
        );
    }
}

export default SoulNotExists;
