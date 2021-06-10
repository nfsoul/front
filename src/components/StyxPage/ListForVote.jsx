import React, {Component} from 'react';
import axios from "axios";
// import "react-table/react-table.css";
import {Container} from 'react-bootstrap';
import Pagination from "react-js-pagination";
import PersonCard from "../PersonCard/PersonCard";
import "./ListForVote.css";

class ListForVote extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            hasError: false,
            errorMsg: '',
            isLoading: false,
            tokens: [],
            totalItemsCount: 0,
            itemsCountPerPage: 12,
            activePage: 1

        }
    }

    getData = (pageNumber) => {
        axios.get("", {
            params: {
                page: pageNumber
            }
        }).then(response => {
            console.log("response.data.result.items: ", response.data)
            if (response.status === 200) {
                this.setState({
                    tokens: response.data.result.items,
                    totalItemsCount: response.data.result.totalElements,
                }, () => console.log(this.state));
                return response.data;
            }
        }).catch(error => {
            console.log("error getAuctionsTokenInfo: ", error.response)
            return error.response;
        });
    };

    componentDidMount() {
        this.getData(0)
    }

    onPaginationChange = (pageNumber) => {
        this.setState({
            activePage: pageNumber
        }, () => this.getData(pageNumber - 1))
    }

    render() {
        // const {tokens} = this.state;

        return (
            <div className={"d-flex flex-center flex-column"}>
                <Container fluid className={"d-flex row-column flex-wrap pr-10 pl-10"}>
                    <div className={"row"}>
                        {this.state.tokens.map((token) => <PersonCard key={token.tokenId} token={token}/>)}
                    </div>
                </Container>
                {/*TODO take out from here, create new component - wrapper*/}
                {
                    (!this.state.totalItemsCount || this.state.totalItemsCount === 0) ? null :
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCountPerPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={this.onPaginationChange}
                            innerClass={"pagination justify-content-center"}
                            activeClass={"active"}
                            itemClass={"page-item"}
                            activeLinkClass={"page-link"}
                            linkClass={"page-link"}
                            disabledClass={"disabled"}
                            lastPageText={">>"}
                            firstPageText={"<<"}
                            nextPageText={">"}
                            prevPageText={"<"}/>
                }

            </div>
        );
    }
}

export default ListForVote;
