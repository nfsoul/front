import React, { Component } from 'react';
import { Result, Button } from 'antd';
import 'antd/dist/antd.css';


export default class Forbidden extends Component {

    componentDidMount() {
        document.title = "????";
    }

    render() {
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
            />
        )
    }
}