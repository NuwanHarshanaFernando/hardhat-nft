const { ethers } = require("hardhat");

const networkConfig = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    vrfCoordinatorV2: "0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B",
    mintFee: "10000000000000000", // 0.01 ETH
    gasLane:
      "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
    subscriptionId:
      "7399647949254324747313642538347699474131487154543094178533628410601050572543",
    callbackGasLimit: "500000", // 500,000
  
  },
  31337: {
    name: "hardhat",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
   mintFee: "10000000000000000", // 0.01 ETH
    gasLane:
      "0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae",
    callbackGasLimit: "500000", // 500,000

  },
};

const DECIMALS = "18"
const INITIAL_PRICE = "200000000000000000000"

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_PRICE
};
