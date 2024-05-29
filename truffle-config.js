const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

// Exponential backoff formula: 2^attempt * 1000 (milliseconds)
const exponentialBackoff = (attempt) => {
  return Math.pow(2, attempt) * 1000;
};

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    sepolia: {
      provider: () => {
        const options = {
          mnemonic: process.env.MNEMONIC,
          providerOrUrl: `https://sepolia.infura.io/v3/${process.env.INFURA_ENDPOINT}`,
          pollingInterval: 10000, // Adjust polling interval to reduce request frequency
          numberOfRetries: 5,
          retryDelay: exponentialBackoff
        };

        const provider = new HDWalletProvider(options.mnemonic, options.providerOrUrl, 0, 1, true, "m/44'/60'/0'/0/", options.pollingInterval);

        // Attach an error handler
        provider.engine.on('error', (error) => {
          if (error.message.includes('Too Many Requests')) {
            const attempt = provider.engine.attempt || 0;
            provider.engine.attempt = attempt + 1;

            if (provider.engine.attempt <= options.numberOfRetries) {
              const delay = exponentialBackoff(provider.engine.attempt);
              console.log(`Too many requests. Retrying in ${delay / 1000} seconds...`);
              setTimeout(() => provider.engine.start(), delay);
            } else {
              console.error('Max retries reached. Exiting.');
              process.exit(1);
            }
          } else {
            console.error('Unhandled error:', error);
            process.exit(1);
          }
        });

        return provider;
      },
      network_id: 11155111,
      gas: 4500000,
      gasPrice: 10000000000, // 10 gwei
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",
    }
  },
};
