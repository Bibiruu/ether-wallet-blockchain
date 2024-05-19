const EtherWallet= artifacts.require("EtherWallet");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(EtherWallet, accounts[0]);
};
