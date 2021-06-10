import React, {Component} from 'react';
import {Col, Container, Form, Row} from 'reactstrap';
import axios from "axios";
import StepWizard from 'react-step-wizard';
import MainInformation from './MainInformation'
import ModsInformation from './Modsformation';
import AdditionalInformation from './AdditionalInformation';
import './transitions.css';
import StepperNav from './StepperNav';
import './wizard.css';
import TruffleContract from 'truffle-contract';
import web3hoc from '../../hoc/web3hoc';
import ResultPage from './ResultPage';

import {
    topStyles,
    hairColorStyles,
    eyesStyles,
    skinStyles,
    facialHairStyles
} from '../nativeComponents/avatar/AvatarConst'

class CreateTokenPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            errorMsg: '',
            isLoading: false,
            isSended: false,
            pieInited: false,
            contractAddress: "",

            token: {
                firstName: '',
                lastName: '',
                middleName: '',
                gender: '',
                birthday: '',
                eyesStyle: eyesStyles[0],
                hairColor: hairColorStyles[0],
                skinColor: skinStyles[0],
                facialHair: facialHairStyles[0],
                topStyle: topStyles[0],
                description: '',
                hash: '',
                proofs: [],
                mods: '00000000000000000000000000000000'
            },

            mod1idx: '',
            mod2idx: '',

            transitions: {
                enterRight: "animated enterRight",
                enterLeft: "animated enterLeft",
                exitRight: "animated  exitRight",
                exitLeft: "animated exitLeft",
                intro: "animated intro",
            }

        };

        this.initTokenAuctionInstance();

        if(!window.localStorage.getItem("token") && window.localStorage.getItem("token") !== "null") {
            this.props.history.push('/token')
        }
    }

    initTokenAuctionInstance = () => {

        this.nfsoul.deployed().then(async (instance) => {

            // let accountBalances = {};

            // const pastEvents = await instance.getPastEvents('Transfer', {
            //     fromBlock: 0
            // });

            // pastEvents.forEach((event) => {
            //     if (event.returnValues.fromBalance >= onePercentage) {
            //         accountBalances[event.returnValues.from] = event.returnValues.fromBalance;
            //     }
            //     if (event.returnValues.toBalance >= onePercentage) {
            //         accountBalances[event.returnValues.to] = event.returnValues.toBalance;
            //     }
            // });

            this.setState({
                contractAddress: instance.address,
                instance: instance
            }, () => console.log(this.state.instance));

            // subscribtion on events
            /*await instance.Transfer({
                fromBlock: 0,
                toBlock: 'latest'
            }, async (error, event) => {
 
                this.setState({accountBalances : accountBalances})
            });*/
        });

    };

    async handleSubmit(e) {
        e.preventDefault();
        this.clearStatusMsg();

        const form = e.currentTarget;

        if (form.checkValidity() === true) {

            this.setState({ isLoading: true });

            const { token } = this.state;

            await axios.post("", {
                firstName: token.firstName,
                lastName: token.lastName,
                middleName: token.middleName,
                birthday: token.birthday,
                sex: token.gender,
                facialHair: token.facialHair,
                topStyle: token.topStyle,
                eyesStyle: token.eyesStyle,
                hairColor: token.hairColor,
                skinColor: token.skinColor,
                description: token.description,
                mods: token.mods.toString().replace(/,/g, ''),
            }, {
                    headers: {
                        "Authorization": 'Bearer ' + window.localStorage.getItem("sessionToken")
                    }
                }).then(response => {
                    console.log("response: ", response);

                    if (response.status === 200) {
                        window.localStorage.setItem('token', response.data.result.tokenId);
                        this.setState({ isSended: true });
                        // TODO: notification
                        this.props.history.push('/token')
                    }
                    this.setState({ isLoading: false });
                }).catch(error => {
                    console.log("error: ", error);
                    this.setState({
                        hasError: true,
                        errorMsg: error.response,
                    });
                })
        }
    }

    async clearStatusMsg() {
        await this.setState({
            hasError: false,
            errorMsg: '',
            isLoading: false,
            isSended: false
        });
    }

    handleCharAdd = (key, value) => {
        // const { name } = event.target;
        const { token } = this.state;

        token.characteristics[key] = 1;

        this.setState({
            token: {
                ...token,
            }
        });
    };

    // TODO: Hot reloaded Generated Avatar
    updateForm = (key, value) => {
        const { token } = this.state;

        this.setState({
            token: {
                ...token,
                [key]: value
            }
        });
    }

    updateModForm = (num, idx) => {
        const { token } = this.state;

        console.log("num outter: ", num);
        console.log("idx: ", idx)


        let mod1id = (num === 1) ? ((this.state.mod1idx === '') ? idx : this.state.mod1idx) : this.state.mod1idx;
        let mod2id = (num === 2) ? ((this.state.mod2idx === '') ? idx : this.state.mod2idx) : this.state.mod2idx;

        let arrayMods = token.mods.split('');

        if (mod1id !== '' && num === 1) {

            arrayMods = arrayMods.map((mod, index) => {
                if (mod1id === index) {
                    return '0';
                }
                else {
                    return mod;
                }
            })
        }

        if (mod2id !== '' && num === 2) {

            arrayMods = arrayMods.map((mod, index) => {
                if (mod2id === index) {
                    return '0';
                }
                else {
                    return mod;
                }
            })
        }

        let arrayMods2 = arrayMods.map((mod, index) => {

            if (idx === index) {
                return '1'
            } else {
                return mod
            }
        });

        this.setState({
            token: {
                ...token,
                mods: arrayMods2.toString().replace(/,/g, '')
            },
            mod1idx: (num === 1) ? idx : mod1id,
            mod2idx: (num === 2) ? idx : mod2id
        }, this.updateHash);

    };

    updateHash = async () => {
        axios.post("", {
            firstName: this.state.token.firstName,
            lastName: this.state.token.lastName,
            middleName: this.state.token.middleName,
            birthday: this.state.token.birthday,
            sex: this.state.token.gender,
            eyesStyle: this.state.token.eyesStyle,
            topStyle: this.state.token.topStyle,
            hairColor: this.state.token.hairColor,
            skinColor: this.state.token.skinColor,
            description: this.state.token.description,
            mods: this.state.token.mods.toString().replace(/,/g, ''),
        }).then(result => {
            this.setState({
                token :
                    {
                        ...this.state.token,
                        hash: result.data.result
                    }
            });
        })
    }

    render() {

        return (

            <Container>

                <div className="py-3 text-center">
                    <h2>Create your own Soul</h2>
                </div>

                <Row >
                    <Col className="col-md-12">
                        <Form className={"pb-3"} onSubmit={(e) => this.handleSubmit(e)}>
                            <StepWizard
                                onStepChange={this.onStepChange}
                                transitions={this.state.transitions}
                                isHashEnabled
                                nav={<StepperNav />}>
                                <MainInformation
                                    hashKey={'MainInformation'}
                                    update={this.updateForm}
                                    updateHash={this.updateHash}
                                    tokenData={this.state.token}
                                />
                                <AdditionalInformation
                                    hashKey={'AdditionalInformation'}
                                    update={this.updateForm}
                                    tokenData={this.state.token}
                                />
                                <ModsInformation
                                    hashKey={'ModsInformation'}
                                    updateHash={this.updateHash}
                                    update={this.updateModForm}
                                    form={this.state.form}
                                    tokenData={this.state.token}
                                    currentMods={this.state.token.mods} />
                                <ResultPage
                                    hashKey={'ResultPage'}
                                    resultData={this.state.token}
                                />

                            </StepWizard>

                        </Form>
                    </Col>
                    {/* <Col className="col-md-4 order-md-2 mb-4">
                        <TokenResult />
                    </Col> */}
                </Row>
            </Container>

        );
    }
}

export default web3hoc(CreateTokenPage);
