import { FC, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic';
import { useWallet } from '@solana/wallet-adapter-react';

import localFont from 'next/font/local';
const myFont = localFont({
  src: './../fonts/Cherl2.ttf',
  display: 'swap',
})
const ReactUIWalletModalButtonDynamic:any = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletModalButton,
    { ssr: false }
);

const ReactUIWalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);



export const SolanaWalletConnectButton: FC = () => { 
    const { connected } = useWallet();

    useEffect(() => {
      if (connected) {
        console.log('Wallet is connected');
      }
    }, [connected]);
    return (
        <div className='h-[36px] flex items-center   bg-secondary rounded' >
            {
                connected ? <ReactUIWalletMultiButtonDynamic style={{height:'36px',background:'#212638'}}/> : <ReactUIWalletModalButtonDynamic style={{height:'36px',background:'#212638'}}/>
            }
        </div>
    )
}