import Web3 from 'web3';
import EtherWallet from '../contracts/EtherWallet.json'

let web3;
let etherWallet;

const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      //authorizing metamask
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
    if (typeof window.web3 !== 'undefined') {
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
  const $deposit = document.getElementById('deposit');
  const $depositResult = document.getElementById('deposit-result');
  const $send = document.getElementById('send');
  const $sendResult = document.getElementById('send-result');
  const $balance = document.getElementById('balance');

  //getting account from metamask
  let accounts = [];
  web3.eth.getAccounts()
    .then(_accounts => {
      accounts = _accounts;
    });

  $deposit.addEventListener('submit', error => {
    error.preventDefault();
    const amount = e.target.elements[0].value;
    etherWallet.methods
      .deposit()
      .send({from: accounts[0], value: amount})
      .then( result => {
        $depositResult.innerHTML = `Depositing wei amount of ${amount} was successfull`
      })
      .catch( _e => {
        $depositResult.innerHTML = `Oops, theres was an problem while 
        trying to make the deposit.`;
      });
  });
};

$send.addEventListener('submit', error => {
  error.preventDefault();
  const amount = e.target.elements[0].value;
  etherWallet.methods
    .call({ from: accounts[1] })
    .send({ from: accounts[0], value: amount})
    .then(() => {
      
    })
    .catch( _e => {

    });
});

document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    }).then(_etherWallet => {
      etherWallet = _etherWallet;
      initApp();
    })
    .catch(error => console.log(error.message));
});

