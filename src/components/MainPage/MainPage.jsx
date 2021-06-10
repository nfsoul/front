import React, { Component } from 'react';
import AuctionPage from '../AuctionPage/AuctionPage';
import { Layout } from 'antd';

const { Content,
} = Layout;

class MainPage extends Component {

    render() {
        return (
            <Layout className="site-layout-background" style={{ padding: '24px 0'}}>
                <Content style={{ padding: '0 150px' }}>
                    <AuctionPage />
                </Content>
            </Layout>
        );
    }
}

export default MainPage;
