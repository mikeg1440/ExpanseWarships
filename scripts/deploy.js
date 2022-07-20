const {shipsData} = require('./utils/data.js');

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('ExpanseWarShips');
  const gameContract = await gameContractFactory.deploy(...shipsData);
  
  await gameContract.deployed();
  console.log(`[+] Contract Address: ${gameContract.address}`);
  
  console.log("[+] Contract deployed to ", gameContract.address);
}



const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(`[-] runMain Error\n Error: ${err}`);
    process.exit
  }
}


runMain();
