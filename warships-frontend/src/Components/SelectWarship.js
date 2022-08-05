import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import ReactLoading from 'react-loading';

import { CONTRACT_ADDRESS, transformWarshipData } from '../constants';

import ExpanseWarships from '../utils/ExpanseWarships.json';

export default function SelectWarship({ setWarshipNFT }) {

  const [ warships, setWarships ] = useState([]);
  const [ contract, setContract ] = useState(null);
  const [ mintingInProgress, setMintingInProgress ] = useState(false);

  const mintWarshipNFTAction = async (warshipId) => {
    try {
      if (contract) {
        setMintingInProgress(true);
        console.log(`[+] Minting Warship NFT in progress...`);
        const tx = await contract.mintShipNFT(warshipId);
        await tx.wait();
        
        setMintingInProgress(false);
        alert("Warship NFT minted successfully!");
        console.log(`[+] Successfully minted Warship NFT with id ${warshipId}\nTxnHash: ${tx.hash}`);
      }
    }catch(error){
      console.warn(`[-] Error minting Warship NFT!\nError: ${error}`);
      alert("There was a problem when minting your Warship NFT.\nPlease contact support.");
      setMintingInProgress(false);
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

        // transform data to be used in the UI
        const warships = warshipsTxn.map((warshipData) => transformWarshipData(warshipData));

        // set all warships to the state
        setWarships(warships);
      } catch(error){
        console.log(`[-] Error fetching Warships!\n Error: ${error}`);
      }
    }

    const onWarshipMint = async (sender, tokenId, warshipId) => {
      console.log(`[+] Received Warship NFT mint event!\nSender: ${sender}\nTokenId: ${tokenId}\nWarshipId: ${warshipId}`);
      alert(`You just minted a Warship NFT!\nSee it Here: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);

      if (contract){
        const warshipNFT = await contract.checkIfUserHasNFT();
        console.log('[+] User has Warship NFTs', warshipNFT);
        setWarshipNFT(transformWarshipData(warshipNFT));
      }
    }

    if (contract){
      getWarships();

      contract.on('ShipNFTMinted', onWarshipMint);
    }

    return () => {
      if (contract){
        contract.off('ShipNFTMinted', onWarshipMint);
      }
    }
  }, [contract]);

  const renderWarships = () => warships.map((warship, index) => (
    <ShipItem key={warship.name}>
      <ShipName>{warship.name}</ShipName>

      <ShipImage src={warship.imageURI} />

      <MintButton onClick={() => mintWarshipNFTAction(index)} >{`Mint ${warship.name}`}</MintButton>
    </ShipItem>
  ));

  return (
    <SelectContainer>
      <div>Choose your ship wisely!</div>
      <ShipsContainer>
        {warships.length > 0 && renderWarships()}
      </ShipsContainer>
      {mintingInProgress && <ReactLoading type={'spin'} color={'#fff'} height={'20px'} width={'20px'} />}
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