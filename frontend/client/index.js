import Web3 from 'web3';
import EtherWallet from '../../build/contracts/EtherWallet.json'

let web3;
let etherWallet;

//authorizing metamask
const initWeb3 = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.ethereum !== 'undefined') {
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
    if (typeof window.web3 !== 'undefined') {
      return resolve(
        new Web3(window.web3.currentProvider)
      );
    }
    resolve(new Web3('http://localhost:9545'));
  });
};

const initContract = async () => {
  const networkId = await web3.eth.net.getId();
  return new web3.eth.Contract(
    EtherWallet.abi,
    EtherWallet
      .networks[networkId]
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

  const refreshBalance = () => {
    etherWallet.methods
      .balanceOf()
      .call()
      .then(result => {
        $balance.innerHTML = result;
      })
      .catch(_e => {
        $balance.innerHTML = `Oops, theres something wrong in refreshing the balance`;
      });
  };
  refreshBalance();

  $deposit.addEventListener('submit', error => {
    error.preventDefault();
    const amount = e.target.elements[0].value;
    etherWallet.methods
      .deposit()
      .send({ from: accounts[0], value: amount })
      .then(result => {
        $depositResult.innerHTML = `Depositing wei amount of ${amount} was successfull`
      })
      .catch(_e => {
        $depositResult.innerHTML = `Oops, theres was an problem while 
        trying to make the deposit.`;
      });
  });

  $send.addEventListener('submit', error => {
    error.preventDefault();
    const amount = e.target.elements[0].value;
    const to = e.target.elements[1].value;
    etherWallet.methods
      .send({ to, amount })
      .send({ from: accounts[0] })
      .then(result => {
        $sendResult.innerHTML = `Successfully sent wei of the amount of ${amount}, ${to}`;
        refreshBalance();
      })
      .catch(_e => {
        $sendResult.innerHTML = `Oops, there something wrong in sending wei from the contract.`;
      });
  });

};


document.addEventListener('DOMContentLoaded', () => {
  initWeb3()
    .then(_web3 => {
      web3 = _web3;
      return initContract();
    })
    .then(_etherWallet => {
      etherWallet = _etherWallet;
      initApp();
    })
    .catch(error => console.log(error.message));
});

