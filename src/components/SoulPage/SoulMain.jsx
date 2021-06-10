import React, { Component } from 'react';
import './SoulPage.css';
import { ButtonGroup } from "reactstrap";
// import { Avatar } from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import web3hoc from '../../hoc/web3hoc';
import { fromWei, hexToNumberString } from 'web3-utils';
import SellSoul from "./modals/SellSoul";
import moment from 'moment';
import { Card, Avatar, Button, Row, Col } from 'antd';
import SoulInfo from './SoulInfo';
import UpPrice from "./modals/UpPrice";
import { EditOutlined, EllipsisOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

const { Meta } = Card;

class SoulMain extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hasError: false,
            errorMsg: '',
            soul: {
                soulId: '',
                onSale: '',
                onAuction: '',
                soulprint: '', // TODO component for render mods
                epic: '',
                proofs: '',
                price: '',
                auction: {
                    currentPrice: 0,
                },
            },
            tokenized: false,
            onSale: false,
            isOwner: false
        };
    }

    async clearError() {
        await this.setState((state, props) => ({
            hasError: false,
            errorMsg: ''
        }));
    }

    checkAuctionInfo = () => {

        const { nfsInst, token } = this.state;

        nfsInst
            .methods
            .auctionInfo(hexToNumberString(token.soulId))
            .call({ from: window.localStorage.getItem("eth_address") })
            .then(result => {

                let auc = {
                    basePrice: fromWei(hexToNumberString(result[2]["_hex"])), // "_hex": "0x038d7ea4c68000"
                    carrier: '', // TODO
                    currentPrice: fromWei(hexToNumberString(result[6]["_hex"])), // "_hex": "0x038d7ea4c68063"
                    duration: hexToNumberString(result[1]["_hex"]), // "_hex": "0x024b70"
                    onSale: result[8], // true
                    owner: '', // TODO
                    ownerOwner: '', // TODO
                    startedAt: moment.unix(hexToNumberString(result[0]["_hex"])).format("MM-DD-YYYY HH:mm:ss"), //  "_hex": "0x5cff95da"
                    upAt: hexToNumberString(result[5]["_hex"]), //  "_hex": "0x5cff95da"
                    upCounter: hexToNumberString(result[4]["_hex"]), // "_hex": "0x01"
                    upValue: fromWei(hexToNumberString(result[3]["_hex"])), // "_hex": "0x64",
                    mods: result[7] // "0x0101010100000000000000000001000000000100000000000000000000000101"
                };

                if (result) {
                    this.setState((state, props) => ({
                        token: {
                            ...token,
                            auction: auc
                        }
                    }, () => console.log("this.state.token: ", this.state.token)))
                }
            })
            .catch(error => {
                console.log("checkAuctionInfo error: ", error)
            })
    };

    // SMART_CONTRACTS FUNCTIONS //
    buyToken = () => {

        const { nfsInst, token } = this.state;

        nfsInst.methods.buy(hexToNumberString(token.soulId)).send({ from: window.localStorage.getItem("eth_address") })
            .then(result => {

            }
            ).catch(error => {

            }
            );
        //     , (error, result) => {
        //     console.log("error: ", error);
        //     console.log("result: ", result);
        // });
    };

    renderMenu = (soulNotExist) => {

        return (
            <React.Fragment>
                <div className="profile-head">
                    {this.renderSellButton()}
                </div>
            </React.Fragment>
        )
    }

    renderBuyButton = () => {
        return (<Button color="danger" onClick={() => this.buyToken()}>Buy</Button>)
    };

    renderSellButton = () => {
        return (
            <React.Fragment>
                <ButtonGroup>
                    <UpPrice instance={this.state.nfsInst} />
                </ButtonGroup>
            </React.Fragment>
        )
    };

    renderProofInfo = (filter) => {

        // <div className="profile-work">
        //             <br />
        //             <Col sm="8" md={{ size: 6, offset: 3 }}>
        //                 <h5>Proofs <AddProofBtn tokenId={this.state.token.tokenId} instance={this.state.nfsInst} /></h5>
        //             </Col>
        //             <ButtonGroup> {this.renderProofInfo(token.proofs)} </ButtonGroup>
        //         </div>

        return this.state.token.proofs.map((item) => <Button outline color="link"><FontAwesomeIcon
            icon={['fa', item.type]} /></Button>)
    };

    renderModsInfo = () => {

        // let newArra = this.state.soul.mods.split('');
        // let modsArr = mods.filter((item, idx) => {
        //     return newArra[idx] === 1
        // });

        // return (
        //     <div className="profile-head">
        //         <h5>Modificators</h5>
        //         {
        //             modsArr.map((item) => <Badge>{item.value}</Badge>)
        //         }
        //     </div>
        // )
    };

    render() {

        const { soul, address, isOwner, isLoading } = this.props;
        const { donorMods, proofs, soulMods, marketInfo, auctionInfo } = soul;

        const button = isOwner ? ([<ShoppingCartOutlined key="buy" />, <EditOutlined key="edit" />]) : ([<ShoppingCartOutlined key="buy" />])

        const sellButton = isOwner ? (<SellSoul />) : '';

        return (
            <Row gutter={[16, 16]}>
                <Col flex={2} span={6}>
                    <Card
                        hoverable
                        cover={
                            <img
                                alt="example"
                                src={"https://avatars.dicebear.com/v2/human/" + address + ".svg"}
                            />
                        }
                        actions={button}
                        title={"Soul: " + soul.soulId}
                        description="soul card"
                        style={{marginTop: '24px'}}
                    >
                        <Meta
                            style={{ textAlign: 'center', padding: '0 10px' }}
                            title={"Price: " + marketInfo.price + ' eth (usd, btc)'}
                        />
                        {sellButton}
                    </Card>,

                    <br />
                    <ul className="list-group">
                        <li className="list-group-item text-right">
                            <span className="proile-rating">Carrier: {soul.carrier}</span>
                        </li>
                        <li className="list-group-item text-right">
                            <span className="proile-rating">Owner: {soul.owner} </span>
                        </li>
                    </ul>
                    <br />
                </Col>
                <Col flex={3} span={20} >
                    <SoulInfo soul={soul} />
                </Col>
            </Row >
        );
    }
}

export default web3hoc(SoulMain);
