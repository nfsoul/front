import React, { Component } from 'react';
import { Tag, Row, Button } from 'antd';

class SoulPrint extends Component {

    render() {

        console.log("Soulprint props: ", this.props.soulprint)
        const { soulprint } = this.props;

        const isExist = (soulprint == "0x0000000000000000000000000000000000000000000000000000000000000000") ? false : true;

        return (

            <Row>
                {(isExist) ?
                    (<span>
                        <Tag color="primary">Primary</Tag>
                        <Tag color="secondary">Secondary</Tag>
                        <Tag color="success">Success</Tag>
                        <Tag color="danger">Danger</Tag>
                        <Tag color="warning">Warning</Tag>
                    </span>)
                    : (<Button type="primary">Set soulprint</Button>)}
            </Row>

        );
    }
}

export default SoulPrint;
