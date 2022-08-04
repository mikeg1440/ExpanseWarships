import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ethers } from 'ethers';

import Card from '@mui/material/Card';

import { CONTRACT_ADDRESS, transformWarshipData } from '../constants';
import ExpanseWarships from '../utils/ExpanseWarships.json';


export default function Arena({ warshipNFT, setWarshipNFT }) {
    const [ contract, setContract ] = useState(null);
    const [ bossShip, setBossShip ] = useState(null);
    const [ attackState, setAttackState ] = useState('');

    const runAttackAction = async () => {
        try {
            if (contract){
                setAttackState('attacking');
                console.log('[+] Player attacking boss ship... ');
                const attackTx = await contract.attackBoss();
                await attackTx.wait();

                console.log('AttackTx: ', attackTx);
                setAttackState('hit');
            }
            
        } catch (error) {
            console.log('[-] Error running attack action!\nError: ', error);
            setAttackState('');
        }
            
    }

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

      const onAttackComplete = (from, newBossHp, newPlayerHp) => {
        const bossHp = newBossHp.toNumber();
        const playerHp = newPlayerHp.toNumber();
        const sender = from.toString();

        console.log(`[+] Attack Complete!\nBoss HP: ${bossHp}\nPlayer HP: ${playerHp}\nSender: ${sender}`);

        if (warshipNFT === sender.toLowerCase()){
            
            setBossShip((prevState) => {
                return { ...prevState, hp: bossHp }
            });

            setWarshipNFT((prevState) => {
                return { ...prevState, hp: playerHp }
            });
        } else {
            setBossShip((prevState) => {
                return { ...prevState, hp: bossHp }
            });
        }
      }

      if (contract){
        fetchBoss();
        contract.on('AttackComplete', onAttackComplete);
      }

      return () => { 
        if (contract){
          contract.off('AttackComplete', onAttackComplete);
        }
      }
    
    }, [contract])
    

    return (
        <ArenaContainer>
            <AppHeader>
                Arena
            </AppHeader>
            {!!bossShip && (
                <>
                    <ShipCard className={attackState}>
                        {bossShip.name}

                        <ShipImage src={bossShip.imageURI} alt={bossShip.name} />

                        <HealthBar>
                            <progress value={bossShip.hp} max={bossShip.maxHp} />
                            <p>{ `${bossShip.hp} / ${bossShip.maxHp}` }</p>
                        </HealthBar>
                    </ShipCard>
                    <AttackButton 
                        onClick={runAttackAction}
                        disabled={attackState === 'attacking'}
                        >
                            Attack {bossShip.name}
                    </AttackButton>
                </>
            )}
        

            {warshipNFT && (
                <ShipCard>
                    {warshipNFT.name}

                    <ShipImage src={warshipNFT.imageURI} alt={warshipNFT.name} />

                    <HealthBar>
                        <progress value={warshipNFT.hp} max={warshipNFT.maxHp} />
                        <p>{ `${warshipNFT.hp} / ${warshipNFT.maxHp}` }</p> 
                    </HealthBar>

                </ShipCard>
            )}

        </ArenaContainer>
    )
}

const shakeAnimation = keyframes`
    10%,
    90% { transform: translate3d(-1px, 0, 0);}
    20%,
    90% { transform: translate3d(2px, 0, 0);}
    30%,
    50%,
    70% { transform: translate3d(-4px, 0, 0);}
    40%,
    60% { transform: translate3d(4px, 0, 0);}
    `

const hitBounceAnimation = keyframes`
    0% { transform: scale(1) translateY(0); }
    10% { transform: scale(1.2) translateY(0.6); }
    30% { transform: scale(.8, 1.1) translateY(-10px); }
    50% { transform: scale(1) translateY(0); }
    100% { transform: translateY(0); }
`

const ArenaContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    .attacking {
        animation: ${shakeAnimation} 1.2s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
        transform: translate3d(0, 0, 0);
    }
    .hit {
        animation: ${hitBounceAnimation} 1s ease;
    }

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
    background-color: rgb(0, 108, 204);
    padding: 1vw;
    width: 25vw;
    max-width: 200px;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 2vh;
    margin-top: 1vw;
    margin-bottom: 1vw;
    :hover {
        cursor: pointer;
        filter: brightness(1.3);
    }
`

const AppHeader = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: cyan;
  padding: 1rem;
`