import React, { Component } from 'react';
import { Tag, Row, Typography } from 'antd';

const { Text, Link } = Typography;


class EpicMods extends Component {

    render() {

        const { donorMods } = this.props;
        const isEmpty = (Array.isArray(donorMods) && !donorMods.length);

        return (
            <Row>
                {/* <Text>Epic: </Text> */}
                <span>
                    {(isEmpty)
                        ? (donorMods == "") ? <Text code type="warning">this soul has no uniqueness </Text>
                            : <Text code>this soul has no uniqueness </Text>

                        :
                        donorMods.map((item) => <Tag color="magenta">{item}</Tag>)
                    }

                    <Tag color="processing">add</Tag>
                </span>
            </Row>)
    }
}

export default EpicMods;
