import { toAsciiFromByte32 } from 'utils'
import TokenAuction from '../../../../../sc/truffle/build/contracts/TokenAuction'

let instance = null

export default class TokenAuction {
  constructor() {
    // if (!instance) {
    //   instance = this
    //   this.web3 = getWeb3()
    //   this.contract = contract(TokenAuction)
    //   this.contract.setProvider(this.web3.currentProvider)
    // }

    return instance
  }

  async sell(tokenId, tokenPrice) {
    const contractInstance = await this.contract.deployed()
    return contractInstance._startAuction(tokenId, tokenId, price);
  }

  async reclaim() {
    const contractInstance = await this.contract.deployed()
  }

  async auctionInfo() {
    const contractInstance = await this.contract.deployed()
    return contractInstance.auctionInfo();
  }

}