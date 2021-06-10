import React, { Component } from 'react';
import { Tag, Row, Typography } from 'antd';

const { Text } = Typography;


class SoulProofs extends Component {

    render() {
        const { proofs } = this.props;
        const isEmpty = (Array.isArray(proofs) && !proofs.length);

        console.log("SoulProofs props: ", this.props);

        return (

            <Row>
                {/* <Text>Proofs:</Text> */}
                <span>
                {(!isEmpty)
                    ? <Text code type="warning">this soul has no proof of existence</Text>
                    :
                    proofs.map((id) => <Tag key={id.name} icon={id.icon} color={id.color}>{id.name}</Tag>)
                }
                <Tag color="processing">add</Tag>
                </span>
            </Row>

        );
    }
}

export default SoulProofs;
