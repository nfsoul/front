import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Alert} from 'reactstrap';

class PieAlert extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.props)
    }

    render() {
        if (!this.props.message) return null;
        return (
            <Alert color={this.props.type}>
                <div className={"text-left"}>
                    <strong>
                        {this.props.message}
                    </strong>
                </div>
                {
                    this.props.messageArr ? this.props.messageArr.map(elm => {
                        return <div className={"text-left"}>
                            {elm}
                            <br/>
                        </div>;
                    }) : null
                }
            </Alert>
        );
    }
}

export default PieAlert;

PieAlert.propTypes = {
    type: PropTypes.string.isRequired,
    message : PropTypes.string,
    messageArr: PropTypes.arrayOf(PropTypes.string)
}