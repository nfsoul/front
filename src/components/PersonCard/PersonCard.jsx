import React, {Component} from 'react';
// import "react-table/react-table.css";
import "./PersonCard.css"
import {faComments} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {Container} from "reactstrap";
import LikeButton from "./like/LikeButton";
import DislikeButton from "./dislike/DislikeButton";
import {Link} from "react-router-dom";
import Avatar from "../nativeComponents/avatar/Avatar";

class PersonCard extends Component {

    constructor(props, context) {
        super(props, context);
        console.log(props.token)
        this.state = {
            likeVotes: props.token.likeVotes ? props.token.likeVotes : 0,
            dislikeVotes: props.token.dislikeVotes ? props.token.dislikeVotes : 0,
            comments: props.token.comments ? props.token.comments : 0,
            vote: props.token.vote
        }
    }

    componentDidMount() {
    }


    vote = (value) => {
        axios.post("", {
            tokenId: this.props.token.tokenId,
            value
        }).then(response => {
            const data = response.data.result;
            this.setState(prevState => ({
                vote: data.vote,
                likeVotes: data.likeVotes,
                dislikeVotes: data.dislikeVotes
            }));
        })
    };


    render() {
        const style = this.state.likeVotes >= this.state.dislikeVotes ? "green" : "";
        console.log(this.props.token)
        return (
            <div className="py-3 person-body person-body-sm person-body-md person-body-lg">
                <div className={"person-card " + style}>
                    <div className="additional">
                        <div className="person-user-card">
                            {
                                this.props.token.title ?
                                    <div className="level center">
                                        {this.props.token.title}
                                    </div> : null
                            }
                            {
                                this.props.token.karma ?
                                    <div className="points center">
                                        {this.props.token.karma + " Karma"}
                                    </div> : null
                            }
                            <Link to={"/token/"+this.props.token.tokenId} className="center cursor-pointer">
                                <Avatar hexHash={this.props.token.tokenId}
                                           facialHair={this.props.token.facialHair}
                                           skinColor={this.props.token.skinColor}
                                           eyeType={this.props.token.eyeType}
                                           hairColor={this.props.token.hairColor}
                                           top={this.props.token.topStyle}/>
                            </Link>
                        </div>
                        <div className="more-info">
                            <h1>{this.props.token.firstName + " " + this.props.token.lastName}</h1>
                            <div className="coords">
                                <span>Joined</span>
                                <span>TODO</span>
                            </div>
                            <div className="coords">
                                <span>Activity</span>
                                <span>TODO</span>
                            </div>
                            <div className="coords">
                                <span>Location</span>
                                <span>TODO</span>
                            </div>
                            <div className="social">
                                <LikeButton selected={this.state.vote === 1} colorClassName={style} likeVotes={this.state.likeVotes} onClick={() => this.vote(this.state.vote === 1 ? 0 : 1)}/>
                                <DislikeButton selected={this.state.vote === -1} colorClassName={style} dislikeVotes={this.state.dislikeVotes} onClick={() => this.vote(this.state.vote === -1 ? 0 : -1)}/>
                                <Container>
                                    <div className="title">Comments</div>
                                    <FontAwesomeIcon icon={faComments} size={"1x"}/>
                                    <div className="value">{this.state.comments}</div>
                                </Container>
                            </div>
                        </div>
                    </div>
                    <div className="general">
                        <h1>{this.props.token.firstName + " " + this.props.token.lastName}</h1>
                        <p>Description here (some motivation for click / expand information, etc).</p>
                        <span className="more">More information onhover</span>
                    </div>
                </div>

            </div>
        );
    }
}

export default PersonCard;
