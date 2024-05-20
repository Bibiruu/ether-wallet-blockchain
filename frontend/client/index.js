import Web3 from 'web3';
import EtherWallet from '../contracts/EtherWallet.json'

let web3;
let etherWallet;

const initWeb3 = () => {
    return new Promise((resolve, reject) => {
      if(typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        window.ethereum.enable()
          .then(() => {
            resolve(
              new Web3(window.ethereum)
            );
          })
          .catch(e => {
            reject(e);
          });
        return;
      }
      if(typeof window.web3 !== 'undefined') {
        return resolve(
          new Web3(window.web3.currentProvider)
        );
      }
      resolve(new Web3('http://localhost:9545'));
    });
  };

  const initContract = () => {
    const deploymentKey = Object.keys(CrudSmartContract.networks)[0];
    return new web3.eth.Contract(
      EtherWallet.abi,
      EtherWallet
        .networks[deploymentKey]
        .address
    );
  };

  const initApp = () => {

  };

  document.addEventListener('DOMContentLoaded', () => {
    initWeb3()
      .then(_web3 => {
        web3 = _web3;
        return initContract();
      }) .then(_etherWallet => {
        etherWallet = _etherWallet;
        initApp();
      })
      .catch(error => console.log(error.message));
  });
