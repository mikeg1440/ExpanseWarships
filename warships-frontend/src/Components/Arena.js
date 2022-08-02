import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

import { CONTRACT_ADDRESS } from '../constants';
import ExpanseWarships from '../utils/ExpanseWarships.json';


export default function Arena({ warshipNFT }) {
    const [ contract, setContract ] = useState(null);

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
