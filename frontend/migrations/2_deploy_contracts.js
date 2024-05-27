const EtherWallet = artifacts.require("EtherWallet");

module.exports = function(deployer, _network, accounts) {
  // Function to deploy contracts with retry logic
  async function deployWithRetry() {
    try {
      await deployer.deploy(EtherWallet, accounts[0]);
      console.log("EtherWallet deployed successfully.");
    } catch (error) {
      if (error.message.includes('Too Many Requests')) {
        console.log("Too many requests. Retrying in 5 seconds...");
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
        await deployWithRetry(); // Retry deployment
      } else {
        console.error("Error deploying contracts:", error);
        process.exit(1); // Exit process with error
      }
    }
  }

  // Start deployment with retry logic
  deployWithRetry();
};
