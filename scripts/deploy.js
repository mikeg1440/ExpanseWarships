const {shipsData} = require('./utils/data.js');

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('ExpanseWarShips');
  const gameContract = await gameContractFactory.deploy(...shipsData);
  
  await gameContract.deployed();
  console.log(`[+] Contract Address: ${gameContract.address}`);
  
  let txn;
  txn = await gameContract.mintShipNFT(2);
  await txn.wait();
  
  // let returnedTokenUri = await gameContract.tokenURI(1);
  // console.log(`[+] Token URI: ${returnedTokenUri}`);

  console.log("[+] Contract deployed to ", gameContract.address);
  
  txn = await gameContract.attackBoss();
  let resp = await txn.wait();
  
  txn = await gameContract.attackBoss();
  resp = await txn.wait();
  
  // await gameContract.deployed();
  
  // console.log(`[+] Contract Address: ${gameContract.address}`);
  
  // let txn;
  
  // for (let i=1; i <= 3; i++){
  //   const shipId = randomShipNumber();
  
  //   txn = await gameContract.mintShipNFT(shipId);
  //   await txn.wait();
    
  //   console.log(`[+] Minted NFT #${i}`);
  // }
  
  // let tokenURI = await gameContract.tokenURI(1);
  // console.log(`[+] TokenURI: ${tokenURI}`);
  
}

// const randomShipNumber = () => {
//   const maxShips = 3;
  
//   return Math.floor(Math.random() * maxShips);
// }


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
