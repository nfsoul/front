import React, {Component} from 'react';
// import "react-table/react-table.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import './LikeButton.css'
import {Container} from "reactstrap";
import * as Context from "../../../context";

class LikeButton extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    componentDidMount() {

    }

    render() {
        return (<Context.Auth.Consumer>
                {Auth => (<Container className={"like"}>
                    <div className={(this.props.selected ? "selected " : "") + this.props.colorClassName}>
                        <div className="title">Likes</div>
                        <div onClick={Auth.isLoggedIn() ? this.props.onClick : null} className={Auth.isLoggedIn() ? "cursor-pointer" : ""}>
                            <FontAwesomeIcon icon={faThumbsUp} size={"1x"}/>
                        </div>
                        <div className="value">{this.props.likeVotes}</div>
                    </div>
                </Container>)}
            </Context.Auth.Consumer>
        );
    }
}

export default LikeButton;


LikeButton.propTypes = {
    colorClassName: PropTypes.string.isRequired,
    likeVotes: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool
}
