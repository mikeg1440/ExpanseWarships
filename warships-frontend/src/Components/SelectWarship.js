import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS, transformWarshipData } from '../constants';

import ExpanseWarships from '../utils/ExpanseWarships.json';

export default function SelectWarship({ setWarshipNFT }) {

  const [ warships, setWarships ] = useState([]);
  const [ contract, setContract ] = useState(null);

  const mintWarshipNFTAction = async (warshipId) => {
    try {
      if (contract) {
        const tx = await contract.mintShipNFT(warshipId);
        await tx.wait();
        
        console.log(`[+] Successfully minted Warship NFT with id ${warshipId}\nTxnHash: ${tx.hash}`);
      }
    }catch(error){
      console.warn(`[-] Error minting Warship NFT!\nError: ${error}`);
    }
  };

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ExpanseWarships.abi,
        signer
      );

      setContract(gameContract);
      
    }else {
      console.log('[-] No Ethereum Object found!');
    }
  }, []);

  useEffect(() => {
    const getWarships = async () => {
      try {
        console.log('[+] Getting warships to mint...');

        const warshipsTxn = await contract.getAllDefaultShips();
        console.info(`[+] warshipsTxn: ${warshipsTxn}`);

        // // transform data to be used in the UI
        // const warships = warshipsTxn.map((warshipData) => {
        //   return transformWarshipData(warshipData);
        // });

        // transform data to be used in the UI
        const warships = warshipsTxn.map((warshipData) => transformWarshipData(warshipData));

        // set all warships to the state
        setWarships(warships);
      } catch(error){
        console.log(`[-] Error fetching Warships!\n Error: ${error}`);
      }
    }

    if (contract){
      getWarships();
    }
  }, [contract])

  const renderWarships = () => warships.map((warship, index) => (
    <ShipItem key={warship.name}>
      <ShipName>{warship.name}</ShipName>

      <ShipImage src={warship.imageURI} />

      <MintButton onClick={() => alert('mintWarshipNFTAction(index)')} >{`Mint ${warship.name}`}</MintButton>
    </ShipItem>
  ));

  return (
    <SelectContainer>
      <div>Choose your ship wisely!</div>
      <ShipsContainer>
        {warships.length > 0 && renderWarships()}
      </ShipsContainer>
    </SelectContainer>

  )
}

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 1rem;
`

const ShipsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 15px; 
`

const ShipItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

const ShipName = styled.div`
  font-size: 1.5rem;
  position: absolute;
  padding-top: 1rem;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const ShipImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius-top-left: 10px;
  border-radius-top-right: 10px;
`

const MintButton = styled.button`
  background-color: #00ff00;
  padding: 1rem;
  width: 100%;
  border: none;
  color: white;
  border-radius-bottom-left: 10px;
  border-radius-bottom-right: 10px;
`