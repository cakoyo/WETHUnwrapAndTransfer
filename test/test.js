const { expect } = require("chai");
const { ethers } = require("hardhat");

// Set test evm params here
network.provider.send("evm_setIntervalMining", [1000]);

describe("Unwrap and Transfer", function () {
  it("Should unwrap sender's wrapped ethers and transfer to the recipient", async function () {
    const WETHMainnetAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"; // forking mainnet
    const WETH = await ethers.getContractAt(
      "IWETH", // using artifact
      WETHMainnetAddress
    );
  
    // Wrap ethers
    const amount = ethers.BigNumber.from(10).pow(18);
    const depositResponse = await WETH.deposit({ value: amount });
    await depositResponse.wait();

    // Deploy unwrapper
    const UnwrapperFactory = await ethers.getContractFactory("WETHUnwrapper");
    const unwrapper = await UnwrapperFactory.deploy();
    await unwrapper.deployed();

    // Approve wrapped ethers
    WETH.approve(unwrapper.address, amount);

    const recipient = "0x0000000000000000000000000000000000000000";
    const balanceBefore = await ethers.provider.getBalance(recipient);

    // Unwrap and transfer ethers
    const unwrapResponse = await unwrapper.unwrapAndTransfer(recipient, amount);
    await unwrapResponse.wait();

    const balanceAfter = await ethers.provider.getBalance(recipient);
    expect(balanceAfter.eq(balanceBefore.add(amount)));
  });
});