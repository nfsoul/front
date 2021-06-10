import React, {Component} from 'react';
import "react-table/react-table.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown} from '@fortawesome/free-regular-svg-icons'
import PropTypes from 'prop-types';
import './DislikeButton.css'

class DislikeButton extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={"d-flex row-column dislike-icon align-items-center justify-content-between"} onClick={this.props.onClick}>
                <FontAwesomeIcon className={this.props.colorClassName} icon={faThumbsDown} size={"1x"}/>
                {this.props.counter ? <div className={"ml-1 " + this.props.colorClassName}>{this.props.counter}</div> : null}
            </div>
        );
    }
}

export default DislikeButton;


DislikeButton.propTypes = {
    colorClassName: PropTypes.string.isRequired,
    counter: PropTypes.number,
    onClick: PropTypes.func.isRequired,
}
