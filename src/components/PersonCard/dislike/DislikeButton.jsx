import React, {Component} from 'react';
// import "react-table/react-table.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import './DislikeButton.css'
import {Container} from "reactstrap";
import * as Context from "../../../context";

class DislikeButton extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (<Context.Auth.Consumer>
                {Auth => (<Container className={"dislike"}>
                    <div className={(this.props.selected ? "selected " : "") + this.props.colorClassName}
                         onClick={Auth.isLoggedIn() ? this.props.onClick : null}>
                        <div className="title">Likes</div>
                        <div onClick={Auth.isLoggedIn() ? this.props.onClick : null} className={Auth.isLoggedIn() ? "cursor-pointer" : ""}>
                            <FontAwesomeIcon icon={faThumbsDown} size={"1x"}/>
                        </div>
                        <div className="value">{this.props.dislikeVotes}</div>
                    </div>
                </Container>)}
            </Context.Auth.Consumer>
        );
    }
}

export default DislikeButton;


DislikeButton.propTypes = {
    colorClassName: PropTypes.string.isRequired,
    dislikeVotes: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool
}
