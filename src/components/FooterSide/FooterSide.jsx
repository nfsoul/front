import React, { Component } from 'react';
import { Layout, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

class FooterSide extends Component {
    render() {
        return (
            <Footer style={{
                borderTop: '1px solid #e8e8e8',
                left: 0,
                bottom: 0,
                width: '100%',
                textAlign: 'center',
                padding: '24px 50px'
            }}>
                <a className="text-muted" href="/features">Service Features</a>
                <br />
                Telegram, GitHub, Twitter, Facebook
                <small className="d-block mb-3 text-muted">&copy; 0000-2021-∞</small>

            </Footer>
        );
    }
}

export default FooterSide;
