import React, {Component} from 'react';
import "react-table/react-table.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from '@fortawesome/free-regular-svg-icons'
import {colors} from '../../../../constants'
import PropTypes from 'prop-types';
import './LikeButton.css'

class LikeButton extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        console.log(this.props.counter)
        return (
            <div className={"d-flex row-column like-icon align-items-center justify-content-between"} onClick={this.props.onClick}>
                <FontAwesomeIcon className={this.props.colorClassName} icon={faThumbsUp} size={"2x"}/>
                {this.props.counter ? <div className={"ml-1 " + this.props.colorClassName}>{this.props.counter}</div> : null}
            </div>
        );
    }
}

export default LikeButton;


LikeButton.propTypes = {
    colorClassName: PropTypes.string.isRequired,
    counter: PropTypes.number,
    onClick: PropTypes.func.isRequired,
}
