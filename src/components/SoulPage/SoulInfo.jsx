import React, { Component } from 'react';
import './SoulPage.css';
import web3hoc from '../../hoc/web3hoc';
import EpicMods from './EpicMods';
import SoulProofs from './SoulProofs';
import SoulPrint from './SoulPrint';
import { Card, Avatar, Button, Row, Col, Typography, Divider, Timeline } from 'antd';

const { Title } = Typography;

class SoulInfo extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            auction: {}
        }
    }

    render() {
        let { auctionInfo, donorMods, carrier, soulMods, proofs, dinirMods, marketInfo, owner, soulId, soulsMods } = this.props.soul;

        return (
            <React.Fragment>
                <Row>
                    <Divider>Resume</Divider>
                </Row>

                <Row>
                    <Divider>Main</Divider>

                    <Col flex={3} span={10}>

                        <Col>
                            <span className="proile-rating">Name: </span>
                        </Col>

                        <Row>
                            <span className="proile-rating">Birthday: </span>
                        </Row>

                        <Row>
                            <span className="proile-rating">Gender: </span>
                        </Row>

                        <Row>
                            <span className="proile-rating">Eye color: </span>
                        </Row>

                        <Row>
                            <span className="proile-rating">Skin color: </span>
                        </Row>

                        <Row>
                            <span className="proile-rating">Self Description: </span>
                        </Row>

                        <Row>
                            <span className="proile-rating">Experience: </span>
                        </Row>

                        <Row>
                            <span className="proile-rating">Hourly Rate: </span>
                        </Row>

                        <Row>
                            <span className="proile-rating">Total Projects: </span>
                        </Row>

                        <Row>
                            <span className="proile-rating">English Level: </span>
                        </Row>
                        <Row>
                            <span className="proile-rating">Availability: </span>
                        </Row>
                    </Col>

                    <Col flex={1} >
                        <Divider>Soulprint</Divider>
                        <SoulPrint soulprint={soulMods} />

                        <Divider>Unique</Divider>
                        <EpicMods donorMods={donorMods} />

                        <Divider>Proofs</Divider>
                        <SoulProofs proofs={proofs} />

                        <Divider>Owner of soul</Divider>
                        <p>Number of souls in possession </p>
                    </Col>

                    {/* <Col xs="4">
                        <h5>Auction Information</h5>

                        <Row>
                            <span className="proile-rating">CURRENT PRICE : <span></span></span>
                        </div>
                        <Row><span
                            className="proile-rating">AUCTION START : <span></span></span>
                        </div>
                        <Row><span
                            className="proile-rating">AUCTION END : <span></span></span>
                        </div>
                        <Row><span
                            className="proile-rating">DURATION : <span></span></span>
                        </div>
                        <Row><span
                            className="proile-rating">QUALITY : <span>{auction.quality}</span></span>
                        </div>
                        <Row><span
                            className="proile-rating">RANKINGS : <span>{auction.rank}</span></span>
                        </div>s
                    </Col> */}
                </Row>
                <Row>
                    <Divider>Soul cycle</Divider>

                    {/* <Timeline>
                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
                        <Timeline.Item color="red">
                            <p>Solve initial network problems 1</p>
                            <p>Solve initial network problems 2</p>
                            <p>Solve initial network problems 3 2015-09-01</p>
                        </Timeline.Item>
                        <Timeline.Item>
                            <p>Technical testing 1</p>
                            <p>Technical testing 2</p>
                            <p>Technical testing 3 2015-09-01</p>
                        </Timeline.Item>
                    </Timeline> */}
                </Row>

            </React.Fragment>
        );
    }
}

export default web3hoc(SoulInfo);
