import React, {
    Component
} from "react";
import Web3 from 'web3';
import nfsoulContract from '../contracts/NFSoul.json'

const DEFAULT_STATE = {
    web3network: "",
    web3networkName: "",
    web3connected: false, // check web3
    isMetaMaskConnected: false,
    isMetaMaskLocked: true,
    nfsAddress: '',
    nfsContract: [],
    pieAddress: '',
    carrier: ''
};

export const Web3Context = React.createContext(DEFAULT_STATE);

class Web3Provider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            web3network: window.localStorage.getItem("web3network") || "",
            web3networkName: window.localStorage.getItem("web3networkName") || "",
            web3connected: window.localStorage.getItem("web3connected") || false,
            isMetaMaskLocked: window.localStorage.getItem("isMetaMaskLocked") || true,
            nfsAddress: '',
            nfsContract: [],
            pieAddress: '',
            ethereum: window.ethereum,
            provider: "",
            web3: new Web3(window['ethereum']),

            soul: {
                soulId: '',
                carrier: '',
                owner: '',
                donorMods: '',
                soulMods: '',
                marketInfo: '',
                auctionInfo: '',
            },

            soulsId: [],
            souls: []
        };

        this.getSoul = this.getSoul.bind(this);
        this.getAllSouls = this.getAllSouls.bind();
        this.getContractInstance = this.getContractInstance.bind(this);
        this.emitSoul = this.emitSoul.bind(this);
        this.sellSoul = this.sellSoul.bind(this);
    }

    componentDidMount() {

        console.log("window['ethereum'].selectedAddress: ", window['ethereum'].selectedAddress)

        if (typeof window['ethereum'] !== 'undefined') {
            // Supports EIP-1102 injected Ethereum providers.
            this.setState((state, props) => ({
                provider: window['ethereum'],
            }, () => console.log(this.state.provider)));
        } else if (typeof window.web3 !== 'undefined') {
            // Supports legacy injected Ethereum providers.
            this.setState((state, props) => ({
                provider: window.web3.currentProvider,
            }, () => console.log(this.state.provider)));
        } else {
            // Your preferred fallback.
            this.setState((state, props) => ({
                provider: window.web3.providers.HttpProvider('http://localhost:8545'),
            }, () => console.log(this.state.provider)));
        }

        // this.setState({
        //     account: window['ethereum'].selectedAddress,
        // }, () => console.log);

        // // Wait for loading completion to avoid race conditions with web3 injection timing.
        // window.addEventListener("load", async () => {
        //     // Modern dapp browsers...
        //     if (window.ethereum) {
        //       const web3 = new Web3(window.ethereum);
        //       try {
        //         // Request account access if needed
        //         await window.ethereum.enable();
        //         // Acccounts now exposed
        //         resolve(web3);
        //       } catch (error) {
        //         reject(error);
        //       }
        //     }
        //     // Legacy dapp browsers...
        //     else if (window.web3) {
        //       // Use Mist/MetaMask's provider.
        //       const web3 = window.web3;
        //       console.log("Injected web3 detected.");
        //       resolve(web3);
        //     }
        //     // Fallback to localhost; use dev console port by default...
        //     else {
        //       console.log(process.env.PUBLIC_URL)
        //       const provider = new Web3.providers.HttpProvider(
        //         "http://127.0.0.1:8545"
        //       );
        //       const web3 = new Web3(provider);
        //       console.log("No web3 instance injected, using Local web3.");
        //       resolve(web3);
        //     }
        //   });
        // }

        const web3 = new Web3(window['ethereum']); //new Web3(this.state.provider);

        this.getContractInstance(web3);

        this.state.ethereum.enable();
        this.state.ethereum.on('chainChanged', (e) => this.setNetwork(e))
        this.state.ethereum.on('accountsChanged', (e) => this.accountsChanged(e))
        window.localStorage.setItem("eth_address", this.state.ethereum.selectedAddress);
        window.localStorage.setItem('web3connected', true);
    }

    getContractInstance = async web3 => {

        const NFSoul = new web3.eth.Contract(nfsoulContract.abi, nfsoulContract.networks['5777'].address)
        await this.setState((state, props) => ({
            nfsContract: NFSoul,
        }, () => console.log));
    };

    getAllSouls = async () => {

        console.log("getAllSouls")
        const NFSoul = new this.state.web3.eth.Contract(nfsoulContract.abi, nfsoulContract.networks['5777'].address)

        let souls = [];

        await NFSoul.methods
            .getAllSoul()
            .call()
            .then(result => {
                souls = result;
            }).catch(error => {
                console.error('getAllSoul ERROR:', error);
            });

        souls.forEach((soul) => {
            this.getSoulBySoulID(soul)
        })
    }

    getSoul = async account => {

        console.log("account getSoul:", account)
        const NFSoul = new this.state.web3.eth.Contract(nfsoulContract.abi, nfsoulContract.networks['5777'].address)
        await NFSoul.methods
            .getSoul(account)
            .call()
            .then(result => {
                console.log("result: ", result)
                this.setState((state, props) => ({
                    soul: {
                        soulId: result
                    }
                }))
            }).catch(error => {
                console.error('getSouls ERROR:', error);
            });

        console.log("WEB3 getSoul additional information: ", this.state.soul.soulId)

        if (Array.isArray(this.state.soul.soulId) && !this.state.soul.soulId.length) {} else {
            await NFSoul.methods
                .carrierOf(this.state.soul.soulId[0])
                .call()
                .then(result => {
                    console.log("getCarrier RESULT: ", result)
                    this.setState({
                        soul: {
                            ...this.state.soul,
                            carrier: result,
                        }
                    });
                }).catch(error => {
                    console.error('getCarrier ERROR:', error);
                });

            await NFSoul.methods
                .ownerOf(this.state.soul.soulId[0])
                .call()
                .then(result => {
                    console.log("ownerOf RESULT: ", result)
                    this.setState({
                        soul: {
                            ...this.state.soul,
                            owner: result,
                        }
                    });
                }).catch(error => {
                    console.error('ownerOf ERROR:', error);
                });

            await NFSoul.methods
                .getDonorMod(this.state.soul.soulId[0])
                .call()
                .then(result => {
                    console.log("getDonorMod RESULT: ", result)
                    this.setState({
                        soul: {
                            ...this.state.soul,
                            donorMods: result,
                        }
                    });
                }).catch(error => {
                    console.error('getDonorMod ERROR:', error);
                });

            await NFSoul.methods
                .getSoulModifications(this.state.soul.soulId[0])
                .call()
                .then(result => {
                    console.log("getSoulModifications RESULT: ", result)
                    this.setState({
                        soul: {
                            ...this.state.soul,
                            soulMods: result,
                        }
                    });
                }).catch(error => {
                    console.error('getSoulModifications ERROR:', error);
                });

            await NFSoul.methods
                .getInfoAboutSale(this.state.soul.soulId[0])
                .call()
                .then(result => {
                    console.log("getInfoAboutSale RESULT: ", result)
                    this.setState({
                        soul: {
                            ...this.state.soul,
                            marketInfo: result,
                        }
                    });
                }).catch(error => {
                    console.error('getInfoAboutSale ERROR:', error);
                });

            await NFSoul.methods
                .auctionInfo(this.state.soul.soulId[0])
                .call()
                .then(result => {
                    console.log("auctionInfo RESULT: ", result)
                    this.setState({
                        soul: {
                            ...this.state.soul,
                            auctionInfo: result,
                        }
                    });
                }).catch(error => {
                    console.error('auctionInfo ERROR:', error);
                });
        }
    };

    getSoulBySoulID = async soulId => {
        const NFSoul = new this.state.web3.eth.Contract(nfsoulContract.abi, nfsoulContract.networks['5777'].address)

        let carrier, owner, donorMods, soulMods, marketInfo, auctionInfo;

        await NFSoul.methods
            .carrierOf(soulId)
            .call()
            .then(result => {
                carrier = result;
            }).catch(error => {
                console.error('getCarrier ERROR:', error);
            });

        await NFSoul.methods
            .ownerOf(soulId)
            .call()
            .then(result => {
                owner = result;
            }).catch(error => {
                console.error('ownerOf ERROR:', error);
            });

        await NFSoul.methods
            .getDonorMod(soulId)
            .call()
            .then(result => {
                donorMods = result;
            }).catch(error => {
                console.error('getDonorMod ERROR:', error);
            });

        await NFSoul.methods
            .getSoulModifications(soulId)
            .call()
            .then(result => {
                soulMods = result;
            }).catch(error => {
                console.error('getSoulModifications ERROR:', error);
            });

        await NFSoul.methods
            .getInfoAboutSale(soulId)
            .call()
            .then(result => {
                marketInfo = result;
            }).catch(error => {
                console.error('getInfoAboutSale ERROR:', error);
            });

        await NFSoul.methods
            .auctionInfo(soulId)
            .call()
            .then(result => {
                auctionInfo = result;
            }).catch(error => {
                console.error('auctionInfo ERROR:', error);
            });

        let soul = {
            soulId: soulId,
            carrier: carrier,
            owner: owner,
            donorMods: donorMods,
            soulMods: soulMods,
            marketInfo: marketInfo,
            auctionInfo: auctionInfo
        }

        this.setState({
            souls: [
                ...this.state.souls,
                soul
            ]
        }, () => console.log("souls: ", this.state.souls))
    };

    emitSoul = (account, soulId) => {
        console.log("emit for: ", account);

        const NFSoul = new this.state.web3.eth.Contract(nfsoulContract.abi, nfsoulContract.networks['5777'].address)

        NFSoul.methods
            .mint(soulId).send({
                from: account,
                // gas: 165000, 
                value: 500000
            })
            .on('receipt', function (receipt) {
                this.getSoul(account)
                console.log("this.state: ", this.state)
                console.log("receipt: ", receipt)
            })
            .on('error', function (error) {
                console.log("error: ", error)
            })
            .on('transactionHash', function (transactionHash) {
                console.log("transactionHash: ", transactionHash)
            })
        // .on('confirmation', function (confirmationNumber, receipt) {
        //     console.log("confirmationNumber: ", confirmationNumber);
        //     console.log("receipt: ", receipt)
        // });
        // , function (err, res) { })
        // .call()
        // .then(result => {
        //     this.setState({ soulId: result }, console.log("soulId: ", this.state));
        // }).catch(error => {
        //     console.error('getSouls ERROR:', error);
        // });
    };

    sellSoul = (soulId) => {

    }

    alert = (e) => {
        console.log("network changed: ", e)
    };

    accountsChanged = (e) => {
        console.log("accountsChanged: ", e[0])
        this.setState({
            account: e[0],
            // ...this.state
        }, () => console.log);
        window.localStorage.setItem("eth_address", this.state.ethereum.selectedAddress);

        // this.getSoul(e[0]);
    };

    switchNetwork = (netId) => {
        this.setState({
            web3network: netId
        });
        window.localStorage.setItem('web3network', netId);
    };

    setNetwork = (e) => {
        let networkName, netId;

        switch (e) {
            case "0x1":
                networkName = "Main";
                netId = 1;
                break;
            case 2:
                netId = 2;
                networkName = "Morden";
                break;
            case "0x3":
                netId = 3;
                networkName = "Ropsten";
                break;
            case "0x4":
                netId = 4;
                networkName = "Rinkeby";
                break;
            case "0x2a":
                netId = 5;
                networkName = "Kovan";
                break;
            default:
                netId = e;
                networkName = e;
        }

        this.setState({
            web3networkName: networkName,
            web3network: netId
        })
    };

    render() {
        return ( <
            Web3Context.Provider value = {
                {
                    state: this.state,
                    switchNetwork: this.switchNetwork,
                    getSoul: this.getSoul,
                    getAllSouls: this.getAllSouls,
                    emitSoul: this.emitSoul,
                    sellSoul: this.sellSoul,
                    getCarrier: this.getCarrier
                }
            } > {
                this.props.children
            } <
            /Web3Context.Provider>
        );
    }
}

export const
    Consumer = Web3Context.Consumer;
export const
    Provider = Web3Provider;