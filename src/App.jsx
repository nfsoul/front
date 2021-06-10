import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { history } from './helpers';
import * as Context from "./context";
import AuctionPage from './components/AuctionPage/AuctionPage';
import SoulPage from './components/SoulPage/SoulPage';
// import './App.css';
import "antd/dist/antd.css";

import HeaderSide from './components/HeaderSide/HeaderSide';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faEthereum,
    faFacebookF,
    faGoogle,
    faInstagram,
    faTelegram,
    faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { faBell, faCoffee, faCoins, faEnvelope, faGavel, faLink, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { ProtectedRoute } from './utils/ProtectedRoute';
import CreateTokenPage from './components/CreateTokenPage/CreateTokenPage'
import FooterSide from './components/FooterSide/FooterSide';
import MainPage from './components/MainPage/MainPage';
import NotFound from "./components/Errors/NotFound";
import ListForVote from "./components/StyxPage/ListForVote";
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import Statistics from './components/Statistics/Statistics';
library.add(faFacebookF, faTwitter, faLink, faEthereum, faTelegram, faGavel, faCoffee, faInstagram, faEnvelope, faGoogle, faBell, faCoins, faPlusCircle);


const { Header, Content, Footer, Sider } = Layout;

class App extends Component {

    constructor(props, context) {
        super(props, context);

        history.listen((location, action) => {
        });
    }

    render() {

        return (
            <Context.Web3.Provider>
                <Context.Auth.Provider>
                    <Router history={history}>
                        <Layout className="layout" style={{display: 'block' }}>
                            <Route path="/" component={HeaderSide} />
                            <Switch>
                                <Route exact path="/" component={MainPage} />
                                <Route path="/styx" component={ListForVote} />
                                <Route path="/soul/:soulId" component={SoulPage} />
                                <Route path="/soul" component={SoulPage} />
                                <Route path="/create-token" component={CreateTokenPage} />
                                <Route path="/auction" component={AuctionPage} />
                                <Route path="/stats" component={Statistics} />
                                <Route component={NotFound} />
                            </Switch>
                            <Route path="/" component={FooterSide} />
                        </Layout>
                    </Router>
                </Context.Auth.Provider>
            </Context.Web3.Provider>
        );
    }
}

export default App;
