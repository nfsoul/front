import React, {Component} from 'react';
import {Container} from 'reactstrap';
import './Blog.css';

class Blog extends Component {

    render() {
        return (
            <div className={"blog pt-2"}>
                <Container className={"blog-container"}>
                    {this.props.children}
                </Container>
            </div>

        );
    }
}

export default Blog;
