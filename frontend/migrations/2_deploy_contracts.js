const EtherWallet = artifacts.require("EtherWallet");

module.exports = function(deployer, accounts) {
  deployer.deploy(EtherWallet, accounts[0]);
};
