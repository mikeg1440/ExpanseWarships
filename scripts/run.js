const {shipsData} = require('./utils/data.js');

const main = async () => {

  const gameContractFactory = await hre.ethers.getContractFactory('ExpanseWarShips');
  const gameContract = await gameContractFactory.deploy(...shipsData);
    
  await gameContract.deployed();
  console.log(`[+] Contract Address: ${gameContract.address}`);
  
  let txn;
  txn = await gameContract.mintShipNFT(1);
  await txn.wait();
  
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log(`[+] Token URI: ${returnedTokenUri}`);
  
  txn = await gameContract.attackBoss();
  let resp = await txn.wait();
  
  console.log(`[*] Attacked Boss! RESP: ${resp}`);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(`runMain Error: ${err}`);
    process.exit(1);
  }
}

runMain();