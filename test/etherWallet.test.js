const EtherWallet = artifacts.require('EtherWallet')

contract('EtherWallet', (accounts) => {

    let etherWallet = null;

    before(async () => {
        etherWallet = await EtherWallet.deployed();
    });
    it('it should check the value of accounts[0] as owner', async () => {
        const owner = await etherWallet.owner();
        assert(owner === accounts[0]);
    });
    it('it should deposit ether', async () => {
        await etherWallet.deposit({
            from: accounts[0],
            value: 100
        });
        const balance = await web3.eth.getBalance(etherWallet.address);
        assert(parseInt(balance) === 100);
    });
    it('it should return the balance of the contract', async () => {
        const balanceRecipientBefore = await web3.eth.getBalance(accounts[1]);
        const balance = await etherWallet.balanceOf();
        assert(parseInt(balance) === 100);
    });
    it('it should send ether to another address', async () => {
        const balanceRecipientBefore = await web3.eth.getBalance(accounts[1]);
        //send ether to second address:accounts[1] amount: 50wei 
        await etherWallet.send(accounts[1], 50, { from: accounts[0] });
        //checking the balance DEcreased for 50 wei
        const walletBalance = await web3.eth.getBalance(etherWallet.address);
        assert(parseInt(walletBalance) === 50);
        //checking the before and after difference
        const balanceRecipientAfter = await web3.eth.getBalance(accounts[1]);
        const finalBalance = web3.utils.toBN(balanceRecipientAfter);
        const initialBalance = web3.utils.toBN(balanceRecipientBefore);
        assert(finalBalance.sub(initialBalance).toNumber() === 50);
    });
    it('it should NOT transfer ether if NOT the owner', async () => {
        try {
            await etherWallet.send(accounts[1], 50, {from: accounts[1]});
        } catch(error) {
            assert(error.message.includes('sender is not allowed'));
            return;
        }
        assert(false);
    });
});