// Import web3.js library
const Web3 = require('web3');

// Connect to Ethereum blockchain
const web3 = new Web3('http://localhost:8545');

// Import Truffle contract artifacts
const MyToken = require('./build/contracts/MyToken.json');

// Get user account
const accounts = await web3.eth.getAccounts();
const userAccount = accounts[0];

// Create new instance of MyToken contract
const myToken = new web3.eth.Contract(MyToken.abi, MyToken.networks['5777'].address);

// Create a new token
const tokenName = "MyToken";
const tokenSymbol = "MT";
const tokenDecimals = 18;
const tokenSupply = web3.utils.toWei('1000', 'ether');

await myToken.methods.createToken(tokenName, tokenSymbol, tokenDecimals, tokenSupply).send({ from: userAccount });

// Get token balance
const balance = await myToken.methods.balanceOf(userAccount).call();
console.log(`Token balance: ${balance}`);

// Transfer tokens to another account
const recipient = '0x1234567890123456789012345678901234567890';
const amount = web3.utils.toWei('10', 'ether');

await myToken.methods.transfer(recipient, amount).send({ from: userAccount });

// Get updated token balance
const updatedBalance = await myToken.methods.balanceOf(userAccount).call();
console.log(`Updated token balance: ${updatedBalance}`);
