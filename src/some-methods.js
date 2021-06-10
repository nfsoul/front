initTokenAuctionInstance = () => {

    this.nfsoul.deployed().then(async (instance) => {

        let accountBalances = {};

        const pastEvents = await instance.getPastEvents('Transfer', {
            fromBlock: 0
        });

        pastEvents.forEach((event) => {
            if (event.returnValues.fromBalance >= onePercentage) {
                accountBalances[event.returnValues.from] = event.returnValues.fromBalance;
            }
            if (event.returnValues.toBalance >= onePercentage) {
                accountBalances[event.returnValues.to] = event.returnValues.toBalance;
            }
        });

        this.setState({
            contractAddress: instance.address,
            instance: instance
        }, () => console.log(this.state.instance));

        // subscribtion on events
        await instance.Transfer({
            fromBlock: 0,
            toBlock: 'latest'
        }, async (error, event) => {
            this.setState({accountBalances : accountBalances})
        });
    });

}

mintToken = (sender, chars) => {

    let nfsoul = window.localStorage.getItem("token");
    // mint(address carrier, uint256 tokenId, bytes32 modification)

    this.state.instance.mint(sender, hexToNumberString(nfsoul), chars, { from: sender })
        .then(response => {
            console.log("mint response: ", response)
        }).catch(error => {
            console.log("mintToken error: ", error);
            console.log("mintToken error response: ", error.response);
        });
};

accepteToken = (e, token) => {

    e.preventDefault();
    this.clearStatusMsg();

    this.setState({ isLoading: true });

    this.setState({ isLoading: false });
}

async clearStatusMsg() {
    await this.setState({
        hasError: false,
        errorMsg: '',
        isLoading: false,
    });
}
