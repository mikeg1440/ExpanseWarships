import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

import Card from '@mui/material/Card';

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
            {bossShip && (
                    <ShipCard>
                        {bossShip.name}

                        <ShipImage src={bossShip.imageURI} alt={bossShip.name} />

                        <HealthBar>
                            <progress value={bossShip.hp} max={bossShip.maxHp} />
                            <p>{ `${bossShip.hp} / ${bossShip.maxHp}` }</p>
                        </HealthBar>
                    </ShipCard>
            )}
        
            <AttackButton>Attack {bossShip.name}</AttackButton>

            <div>
                Player
            </div>

        </ArenaContainer>
    )
}


const ArenaContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ShipCard = styled(Card)`
    display: flex;  
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-image: linear-gradient(to right, #2c3e50, #4ca1af);
    padding: .5rem;
    * {
        margin-top: .5rem;
    }
`

const ShipImage = styled.img`
    max-width: 450px;
    @media (max-width: 768px) {
        max-width: 400px;
    }
    @media (max-width: 480px) {
        max-width: 200px;   
    }
`

const HealthBar = styled.div`
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 100%;

    progress[value] {
        width: 100%;
    }
    progress[value]::-webkit-progress-bar {
        background-color: #e5652e;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        overflow: hidden;
    }
    progress[value]::webkit-progress-value {
        background-color: #70cb1b;
    }
    p {
        
        width: 100%;
        font-weight: bold;
        color: black;
        bottom: -10px;
    }
`

const AttackButton = styled.button`
    background-color: #00ff00;
    padding: 1vw;
    width: 25vw;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 2vw;
`