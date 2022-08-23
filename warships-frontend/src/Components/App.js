import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ReactLoading from 'react-loading';

import SelectWarship from './SelectWarship';
import Landing from './Landing';
import Arena from './Arena';

import { CONTRACT_ADDRESS, transformWarshipData } from '../constants';

function App() {

  const [ account, setAccount ] = useState(null);
  const [ warshipNFT, setWarshipNFT ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

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

    setIsLoading(false);
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
    if (account !== null && isLoading) {
      return (
        <section>
          <article>
            <ReactLoading type='spinningBubbles'></ReactLoading>
          </article>
        </section>
      )
    } else if (account === null){
      return (
        <>
          <Landing />
          <ConnectButton onClick={ConnectWalletAction}>
            Connect to Wallet
          </ConnectButton>
        </>
      )
    }else if (account !== null && !warshipNFT ) {
      return (
        <>
          <Landing />
          <SelectWarship setWarshipNFT={setWarshipNFT} />
        </>
      )
    }else if ( account && warshipNFT ){
      return(
        <Arena warshipNFT={warshipNFT} setWarshipNFT={setWarshipNFT} />
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

    setIsLoading(false);
  }


  useEffect(() => {
    setIsLoading(true);
    checkNetwork().then(checkIfWalletConnected())
  }, []);

  useEffect(() => {
    fetchNFTMetadata();
  }, [account]);

  return (
    <AppContainer>
      <Card>
        <CardContent >


          <BodyContainer>
            

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

  background: url(space.gif) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
`



const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`

const Card = styled.div`
  border-radius: 10px;
  margin-top: 2rem;
  max-width: 800px;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #1d1d1d;
  color: white;
  filter: drop-shadow(0px 0px 10px rgba(21, 211, 255, 0.5));
  @media(max-width: 688px){
    width: 85%;
    overflow: hidden;
  }
`

const CardContent = styled.div`
  padding: 16px 16px 24px 16px;
`


const ConnectButton = styled.button`
  background-color: rgb(226, 112, 8);
  border: none; 
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  :hover {
    cursor: pointer;
    filter: brightness(150%);
  }
`