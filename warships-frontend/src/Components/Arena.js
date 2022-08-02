import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS, transformWarshipData } from '../constants';
import ExpanseWarships from '../utils/ExpanseWarships.json';


export default function Arena({ warshipNFT }) {
    const [ contract, setContract ] = useState(null);
    const [ bossShip, setBossShip ] = useState(null);

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
        console.log('[-] Ethereum object not found')
      }

    }, []);
    
    useEffect(() => {
      const fetchBoss = async () => {
        const bossTx = await contract.getBossShip();
        console.log('[+] Boss tx: ', bossTx);
        setBossShip(transformWarshipData(bossTx))
      }

      if (contract){
        fetchBoss();
      }
    
    }, [contract])
    

    return (
        <ArenaContainer>
            Arena
            <div>
                Boss
            </div>

            <div>
                Player
            </div>

        </ArenaContainer>
    )
}


const ArenaContainer = styled.div`
    display: flex;
    flex-direction: column;
`
