const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("dd");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("web3hacker", {
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await txn.wait();
  console.log("Minted domain web3hacker.dd");

  txn = await domainContract.setRecord(
    "web3hacker",
    "Am I a web3hacker or a dd??"
  );
  await txn.wait();
  console.log("Set record for web3hacker.dd");

  const address = await domainContract.getAddress("web3hacker");
  console.log("Owner of domain web3hacker:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
