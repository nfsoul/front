import React, {Component} from 'react';
import "react-table/react-table.css";
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';
import {AvatarScr} from "../Avatar/Avatar";
import LikeButton from "../nativeComponents/buttons/like-old/LikeButton";
import DislikeButton from "../nativeComponents/buttons/dislike-old/DislikeButton";
import {colors} from "../../constants";
import {ProtectedComponent} from "../../utils/ProtectedComponent";
import axios from "axios";

class TokenForVoteCard extends Component {


    constructor(props, context) {
        super(props, context);
        console.log(props.token)
        this.state = {
            likeVotes: props.token.likeVotes,
            dislikeVotes: props.token.dislikeVotes,
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
                likeVotes : data.likeVotes,
                dislikeVotes: data.dislikeVotes
            }));
        })
    };


    render() {
        const token = this.props.token;
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 py-3">
                <Card>
                    <CardImg top width="100%" src={AvatarScr(token.tokenId)} alt="Card image cap"/>
                    <CardBody>
                        <CardTitle className={"text-center"}>{token.firstName + " " + token.lastName}</CardTitle>
                        <CardText className={"text-center"}>{token.description}</CardText>
                        <ProtectedComponent className={"d-flex row-column justify-content-around"}>
                            <LikeButton colorClassName={this.state.vote === 1? colors.like.selected : colors.like.notSelected}
                                        onClick={() => this.vote(this.state.vote === 1 ? 0 : 1)} counter={this.state.likeVotes}/>
                            <DislikeButton colorClassName={this.state.vote === -1? colors.like.selected : colors.like.notSelected}
                                           onClick={() => this.vote(this.state.vote === -1 ? 0 : -1)} counter={this.state.dislikeVotes}/>
                        </ProtectedComponent>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default TokenForVoteCard;
