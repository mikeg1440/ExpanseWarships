#!/bin/bash


echo "[+] Deploying Updated Contract to Rinkeby"

npx hardhat run scripts/deploy.js --network rinkeby

cp artifacts/contracts/ExpanseWarShips.sol/ExpanseWarShips.json warships-frontend/src/utils/ExpanseWarships.json

echo "[+] Artifacts file copied to src/utils/ExpanseWarships.json"

echo "[+] Dont forget to update contract address on front end!"
