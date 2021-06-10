import React, { Component } from 'react';
import { Spin, Space, Row, Layout } from 'antd';
import web3hoc from '../../hoc/web3hoc';
import SoulNotExists from './SoulNotExists';
import SoulMain from './SoulMain';
import SoulEmanation from './SoulEmanation';
import * as Context from "../../context";
import nfsoulContract from '../../contracts/NFSoul.json'
import 'antd/dist/antd.css';
import './SoulPage.css';
import NotFound from '../Errors/NotFound';

const { Content } = Layout;

class SoulPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hasError: false,
            errorMsg: '',
            soul: {
                soulId: '',
                onSale: '',
                onAuction: '',
                soulprint: '',
                epic: '',
                proofs: '',
                price: '',
                auction: {
                    currentPrice: 0,
                },
            },
            isOwner: false,
            isLoading: true,
        };

    }

    componentDidMount() {

        if (this.props.state.web3.utils.isAddress(this.props.match.params.soulId)) {

            this.getSoulInfo(this.props.match.params.soulId)

            if (this.props.match.params.soulId === window.localStorage.getItem("eth_address")) {
                this.setState((state, props) => ({
                    isOwner: true,
                }));
            } else {
                this.setState((state, props) => ({
                    isOwner: false,
                }));
            }
            if (this.props.match.params.soulId === '') {
                this.setState((state, props) => ({
                    isOwner: false,
                }));
            }
        }
        else {
            this.setState((state, props) => ({
                hasError: true,
                errorMsg: "incorrect address"
            }));
        }
    }

    getSoulInfo = async account => {
        const Web3 = this.props.state.web3;
        let soulId, carrier, owner, donorMods, soulMods, marketInfo, auctionInfo;

        const NFSoul = new Web3.eth.Contract(nfsoulContract.abi, nfsoulContract.networks['5777'].address);

        await NFSoul.methods
            .getSoul(account)
            .call()
            .then(result => soulId = result)
            .catch(error => {
                console.error('getSouls ERROR:', error);
            });

        if (Array.isArray(soulId) && !soulId.length) { } else {
            await NFSoul.methods
                .carrierOf(soulId[0])
                .call()
                .then(result => carrier = result)
                .catch(error => {
                    console.error('getCarrier ERROR:', error);
                });

            await NFSoul.methods
                .ownerOf(soulId[0])
                .call()
                .then(result => owner = result)
                .catch(error => {
                    console.error('ownerOf ERROR:', error);
                });

            await NFSoul.methods
                .getDonorMod(soulId[0])
                .call()
                .then(result => donorMods = result)
                .catch(error => {
                    console.error('getDonorMod ERROR:', error);
                });

            await NFSoul.methods
                .getSoulModifications(soulId[0])
                .call()
                .then((result => soulMods = result))
                .catch(error => {
                    console.error('getSoulModifications ERROR:', error);
                });

            await NFSoul.methods
                .getInfoAboutSale(soulId[0])
                .call()
                .then(result => marketInfo = result)
                .catch(error => {
                    console.error('getInfoAboutSale ERROR:', error);
                });

            await NFSoul.methods
                .auctionInfo(soulId[0])
                .call()
                .then(result => auctionInfo = result)
                .catch(error => {
                    console.error('auctionInfo ERROR:', error);
                });

        };

        console.log("data fetch: ", soulId, carrier, owner, donorMods, soulMods, marketInfo, auctionInfo);

        await this.setState((state, props) => ({
            isLoading: false,
            soul: {
                soulId: soulId,
                carrier: carrier,
                owner: owner,
                donorMods: donorMods,
                soulMods: soulMods,
                marketInfo: marketInfo,
                auctionInfo: auctionInfo
            }
        }));
    };

    async clearError() {
        await this.setState((state, props) => ({
            hasError: false,
            errorMsg: ''
        }));
    }

    renderSpinner = () => {
        return (
            <Space size="middle">
                <Spin size="large" />
            </Space>
        )
    }

    render() {
        const { soul, isOwner, isLoading, hasError } = this.state;
        const soulNotExist = (Array.isArray(soul.soulId) && !soul.soulId.length);
        const address = this.props.match.params.soulId;

        return (
            <>
                {(!hasError) ? (
                    <Context.Web3.Consumer>
                        {
                            Web3 => (
                                <>
                                    <Layout
                                        className="site-layout-background"
                                        style={{ padding: '24px 0', minHeight: 'none', backgroundColor: 'white' }}
                                    >

                                        <Content style={{ padding: '0 150px' }} >
                                            <Content style={{ padding: '0 24px', minHeight: 280, backgroundColor: '#f0f2f5' }} >
                                                {(isOwner == true)
                                                    ?
                                                    (
                                                        <React.Fragment>
                                                            {soulNotExist
                                                                ?
                                                                <SoulEmanation soul={address} />
                                                                :
                                                                (
                                                                    <React.Fragment>
                                                                        {isLoading ? this.renderSpinner() : <SoulMain soul={soul} address={address} isOwner={isOwner} />}
                                                                    </React.Fragment>)
                                                            }
                                                        </React.Fragment>
                                                    )
                                                    :
                                                    (<React.Fragment>
                                                        {
                                                            soulNotExist
                                                                ?
                                                                (<SoulNotExists />)
                                                                : (
                                                                    <React.Fragment>
                                                                        {isLoading ? this.renderSpinner() : <SoulMain soul={soul} address={address} isOwner={isOwner} />}
                                                                    </React.Fragment>)
                                                        }
                                                    </React.Fragment>)
                                                }
                                            </Content>
                                        </Content>
                                    </Layout>
                                </>)}
                    </Context.Web3.Consumer>)
                    : (<NotFound />)

                }
            </>
        );
    }
}

export default web3hoc(SoulPage);
