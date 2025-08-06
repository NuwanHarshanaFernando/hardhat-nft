const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

const VRF_SUB_FUND_AMOUNT = ethers.parseEther("2") // 30 is super overkill, 2 would work

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // get the IPFS hashes of our images

    // 1. With ourown IPFS node, https://docs.ipfs.io/
    // 2. Pinata https://www.pinata.cloud/


    let vrfCoordinatorV2Address, subscriptionId

    if(developmentChains.includes(network.name)){
        const signer = await ethers.getSigner(deployer)
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2_5Mock")
     vrfCoordinatorV2Address = vrfCoordinatorV2Mock.target
     const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
 const transactionReceipt = await transactionResponse.wait(1)
        console.log(transactionReceipt)

               // Logs from receipt
  const logs = transactionReceipt.logs;

  // Use the contract's interface to parse the logs
  const iface = vrfCoordinatorV2Mock.interface;

  for (const log of logs) {
    try {
      const parsed = iface.parseLog(log);
      console.log(`📤 Event Name: ${parsed.name}`);
      console.log(`📦 Event Args:`, parsed.args);

      if (parsed.name === "SubscriptionCreated") {
        subscriptionId = parsed.args.subId;
        console.log("✅ Subscription ID:", subscriptionId.toString());
      }
    } catch (err) {
      // This log is not from this contract (could be from other internal calls)
     // continue;
    }
}

 const tx = await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, VRF_SUB_FUND_AMOUNT);
    await tx.wait();

    console.log("✅ Funded subscription");

} else {
        vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
        subscriptionId = networkConfig[chainId]["subscriptionId"]
    }

log("--------------------------------------------------")

  const gasLane = networkConfig[chainId]["gasLane"]
  const callbackGasLimit = networkConfig[chainId]["callbackGasLimit"]
  const mintFee = networkConfig[chainId]["mintFee"]

    const args = [
        vrfCoordinatorV2Address,
         gasLane,
          subscriptionId,
           callbackGasLimit,
          // tokenUris,
           mintFee
        ]
}
