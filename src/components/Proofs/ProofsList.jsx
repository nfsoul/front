import React, {Component} from 'react';
import { Tag } from 'antd';
import {proofs} from '../../constants/proofs'

class ProofsList extends Component {

    render() {
        const {soulProofs} = this.props;
        return (
                proofs.map((id) => <Tag key={id.name} icon={id.icon} color={id.color}>{id.name}</Tag>)
        );
    }
}

export default ProofsList;
