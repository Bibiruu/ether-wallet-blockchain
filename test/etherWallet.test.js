const EtherWallet = artifacts.require('EtherWallet')

contract('EtherWallet', (accounts) => {

    let etherWallet = null;

    before(async () => {
        etherWallet = await EtherWallet.deployed();
    });
    it('it should check the value of accounts[0] as owner', async () => {
        const owner = await etherWallet.owner();
        assert( owner === accounts[0]);
    });
    it('it should deposit ether', async () => {
        await etherWallet.deposit({from: accounts[0], 
            value: 100
        });
        const balnce = await web3.eth.getBalance(etherWallet.address);
        assert(parseInt(balance) == 100);
    });
});