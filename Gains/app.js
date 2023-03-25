// import necessary libraries
const Web3 = require('web3');
const gTradeABI = require('./gtrade-abi.json');
const ERC20ABI = require('./erc20-abi.json');

// create web3 instance
const web3 = new Web3('https://rpc.gainsnetwork.com');

// set up contract instances
const gTradeContract = new web3.eth.Contract(gTradeABI, '0x1234567890123456789012345678901234567890');
const collateralTokenContract = new web3.eth.Contract(ERC20ABI, '0x0987654321098765432109876543210987654321');

// get the available leverage amounts for a trading pair
async function getAvailableLeverage(pair) {
  const availableLeverage = await gTradeContract.methods.getAvailableLeverage(pair).call();
  return availableLeverage;
}

// get the current price for a trading pair
async function getCurrentPrice(pair) {
  const currentPrice = await gTradeContract.methods.getCurrentPrice(pair).call();
  return currentPrice;
}

// get the balance of collateral tokens
async function getCollateralTokenBalance() {
  const collateralTokenBalance = await collateralTokenContract.methods.balanceOf('0x1234567890123456789012345678901234567890').call();
  return collateralTokenBalance;
}

// place a leveraged trade
async function placeTrade(pair, direction, leverage, amount) {
  // approve the gTrade contract to transfer collateral tokens
  await collateralTokenContract.methods.approve(gTradeContract.options.address, amount).send({ from: '0x1234567890123456789012345678901234567890' });

  // place the trade
  await gTradeContract.methods.placeTrade(pair, direction, leverage, amount).send({ from: '0x1234567890123456789012345678901234567890' });
}

// close an open trade
async function closeTrade(tradeId) {
  await gTradeContract.methods.closeTrade(tradeId).send({ from: '0x1234567890123456789012345678901234567890' });
}

// get the list of open trades
async function getOpenTrades() {
  const openTrades = await gTradeContract.methods.getOpenTrades().call({ from: '0x1234567890123456789012345678901234567890' });
  return openTrades;
}

// get the details of a specific trade
async function getTradeDetails(tradeId) {
  const tradeDetails = await gTradeContract.methods.getTradeDetails(tradeId).call({ from: '0x1234567890123456789012345678901234567890' });
  return tradeDetails;
}
