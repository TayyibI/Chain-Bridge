// import necessary libraries
const Web3 = require('web3');
const ClayStackABI = require('./claystack-abi.json');
const ERC20ABI = require('./erc20-abi.json');

// create web3 instance
const web3 = new Web3('https://rpc.claystack.com');

// set up contract instances
const clayStackContract = new web3.eth.Contract(ClayStackABI, '0x1234567890123456789012345678901234567890');
const stakeableTokenContract = new web3.eth.Contract(ERC20ABI, '0x0987654321098765432109876543210987654321');

// deposit tokens and receive csTokens
async function depositTokens(amount) {
  // approve the ClayStack contract to transfer tokens
  await stakeableTokenContract.methods.approve(clayStackContract.options.address, amount).send({ from: '0x1234567890123456789012345678901234567890' });
  
  // deposit tokens and receive csTokens
  await clayStackContract.methods.deposit(amount).send({ from: '0x1234567890123456789012345678901234567890' });
}

// withdraw tokens and burn csTokens
async function withdrawTokens(amount) {
  // burn csTokens and receive tokens
  await clayStackContract.methods.withdraw(amount).send({ from: '0x1234567890123456789012345678901234567890' });
}

// get balance of csTokens
async function getCsTokenBalance() {
  const csTokenBalance = await clayStackContract.methods.balanceOf('0x1234567890123456789012345678901234567890').call();
  return csTokenBalance;
}

// get balance of stakeable tokens
async function getStakeableTokenBalance() {
  const stakeableTokenBalance = await stakeableTokenContract.methods.balanceOf('0x1234567890123456789012345678901234567890').call();
  return stakeableTokenBalance;
}
