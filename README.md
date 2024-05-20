# ether-wallet-blockchain

-manipulation of ether through a smartcontract
-checking the safety of function by the sender comparing it to the owner variable. 

__________________________________________

Testing environment
how to structure tests using the Mocha testing framework.

*Contract Initialization:
-Used artifacts.require('EtherWallet') to load the EtherWallet contract artifact.
-Used the before hook to ensure the EtherWallet contract is deployed before running the tests.

*Ownership Test:
-Verified that the owner of the contract is correctly set to accounts[0].

*Deposit Functionality:
-Tested the deposit function by sending 100 wei from accounts[0] to the contract.
Verified that the contract's balance increased to 100 wei after the deposit.
*Balance Retrieval:
Tested the balanceOf function to ensure it returns the correct balance of the contract.
Verified that the balanceOf function correctly returns 100 wei.

*Ether Transfer:
-Tested the send function to transfer 50 wei from the contract to accounts[1].
-Verified that the contract's balance decreased by 50 wei after the transfer.
-Verified that the balance of accounts[1] increased by 50 wei.

*Unauthorized Transfer Prevention:
-Tested that only the owner can transfer ether from the contract.
-Attempted to transfer ether from the contract using accounts[1] (non-owner) and checked for a failure.
-Verified that an error is thrown with the message including 'sender is not allowed' when a non-owner attempts to transfer ether.

*Working with bigNumber library:
-Calculated and tested through big number library in amount
it can compute. (WEI)
