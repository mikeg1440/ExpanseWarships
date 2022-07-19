import styled from 'styled-components';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import SelectWarship from './SelectWarship';

import { CONTRACT_ADDRESS } from '../constants';

function App() {

  const [ account, setAccount ] = useState(null);
  const [ warshipNFT, setWarshipNFT ] = useState(null);

  const checkIfWalletConnected = async () => {

    try {
      if (window.ethereum){
        console.log('[+] MetaMask was detected!');
  
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
        if (accounts.length !== 0){
          console.log('[+] Authorized Account detected!');
          setAccount(accounts[0]);
        }else {
          console.log('[-] No Authorized Account was detected!');
        }
      }else {
        console.log('[-] MetaMask was not detected!\nPlease install MetaMask and try again.\nhttps://metamask.io/download/');
      }
    }catch(error){
      console.log(`[-] Error Getting Ethereum Object!\nError: ${error}`);
    }
  }

  const ConnectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('MetaMask is not installed. Please install MetaMask and try again.');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      console.log(`[+] Authorized Account detected!\nAccount: ${accounts[0]}`);
      setAccount(accounts[0]);
    }catch (error){
      console.log(`[-] Error Connecting to Wallet!\nError: ${error}`);
    }
  }

  const renderContent = () => {

    if (account === null){
      return (
        <>
          <ConnectButton onClick={ConnectWalletAction}>
            Connect to Wallet
          </ConnectButton>
        </>
      )
    }else if (account !== null && !warshipNFT ) {
      return (
        <SelectWarship setWarshipNFT={setWarshipNFT} />
      )
    }
  }

  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== '4'){
        alert('Please connect to the Rinkeby Test Network.');
      }
    }catch (error){
      console.log(`[-] Error Checking Network!\nError: ${error}`);
    }
  }

  const fetchNFTMetadata = async () => {
    if (!account) return;

    console.log(`[+] Checking for Warship NFT on Address: ${account}`);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const gameContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      require('../utils/ExpanseWarships.json').abi,
      signer
    );

    const txn = await gameContract.checkIfUserHasNFT();
    if (txn.name){
      console.log('[+] User has Warship NFT!');
      setWarshipNFT(transformWarshipData(txn));
    }else {
      console.log('[-] User does not have Warship NFT!');
    }

  }


  useEffect(() => {
    // checkIfWalletConnected();
    checkNetwork().then(checkIfWalletConnected())
  }, []);

  useEffect(() => {
    fetchNFTMetadata();
  }, [account]);

  return (
    <AppContainer>
      <Card sx={{ marginTop: '1rem' }}>
        <CardContent >
          <HeaderContainer>
            <img src='https://abs.twimg.com/hashflags/TheExpanse_Emoji/TheExpanse_Emoji.png'/>
            <AppHeader>Expanse Warships</AppHeader>
            <RightShip src='https://abs.twimg.com/hashflags/TheExpanse_Emoji/TheExpanse_Emoji.png'/>
          </HeaderContainer>

          <BodyContainer>
            
            <SubHeader>
              Team up to beat the aliens and other team's ships in the Expanse!

            </SubHeader>
            
            <ExpanseGif />

            {renderContent()}
            
          </BodyContainer>  

        </CardContent>
    
      </Card>      
    </AppContainer>
  );
}

export default App;


const AppContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`

const AppHeader = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: cyan;
  padding: 1rem;

`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`

const ExpanseGif = styled.img`
  content: url('https://i.kym-cdn.com/photos/images/original/002/357/452/53c.gif');
  padding: 1rem;
`

const SubHeader = styled.div`
  padding: 1rem;
  font-weight: bold;
`
// Created a styled component for the right ship because we want to orient it the opposite way of the original
const RightShip = styled.img`
  transform: rotate(270deg);
`

const ConnectButton = styled.button`
  background-color: #4caf50;
  border: none; 
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

`