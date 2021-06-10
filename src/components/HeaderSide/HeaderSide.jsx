import React, { Component } from 'react';
import * as Context from "../../context";
import { Link } from 'react-router-dom';
import './Header.css'
import 'antd/dist/antd.css';
import { PageHeader, Button, Tag, Layout, Row, Col, Divider } from 'antd';
import { ReactComponent as ReactLogo } from './logo.svg';
import web3hoc from '../../hoc/web3hoc';

const { Header, Content } = Layout;


const button = (

    <>
        <React.Fragment>
            <Context.Web3.Consumer>
                {

                    Web3 => (
                        console.log("Web3 HEADER: ", Web3),
                        Web3.account != null
                            ? <Link to={"/soul/" + Web3.account}>{Web3.account.substring(0, 10)}...</Link>
                            : (window.ethereum.selectedAddress != null)
                                ? <Link to={"/soul/" + window.ethereum.selectedAddress}>{window.ethereum.selectedAddress.substring(0, 10)}...</Link>
                                : (<Button key="1" type="primary" onClick={join}>Join</Button>)
                    )
                }
            </Context.Web3.Consumer>
        </React.Fragment>
    </>
)

function join() {
    // metamask
}



class HeaderSide extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: {},
            isLogged: false,
            dropdownOpen: false,
            checked: false
        };
    }

    _loadContext = () => {
        const value = this.context;
        this.setState({ ...value, isLogged: this.context.isLoggedIn });
    };

    componentDidMount = () => {
        this._loadContext();
    };

    renderButton = () => {
        return (
            <>
                <React.Fragment>
                    <Context.Web3.Consumer>

                        {
                            Web3 => (
                                console.log("HEADER Web3: ", Web3),
                                Web3.account != null
                                    ? <Link to={"/soul/" + Web3.account}>{Web3.account.substring(0, 10)}... </Link>
                                    : (<Button key="1" type="primary" onClick={join}>Join</Button>)
                            )
                        }
                    </Context.Web3.Consumer>
                </React.Fragment>
            </>
        )
    }

    // style={{ backgroundColor: 'f0f2f5' }}
    
    render() {
        return (
            <Header >
                <Layout className="" style={{ padding: '0 100px 0 100px', backgroundColor: 'f0f2f5' }}>
                    <Content style={{ padding: '0', flex: 'initial', backgroundColor: 'f0f2f5' }} >
                        <PageHeader
                            title={
                                <Row justify="start">
                                    <Col span={6}><ReactLogo /></Col>
                                    <Col span={4}><Link to="/">NFSoul</Link></Col>
                                </Row>}
                            // className="site-page-header"
                            subTitle="want to be rich and famous?"
                            tags={<Tag color="blue">v.0.1</Tag>}
                            extra={[button]}
                        />


                    </Content>

                </Layout>
            </Header>
        );
    }
}

export default web3hoc(HeaderSide);
