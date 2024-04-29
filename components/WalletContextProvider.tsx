import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js'
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    // const wallets = [new walletAdapterWallets.PhantomWalletAdapter()]
    const endpoint = web3.clusterApiUrl("devnet");
      // 配置支持的钱包
      const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];

    console.log("wallets",wallets);
    

  
          return (
            <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets} autoConnect={true}>
                <WalletModalProvider>
                  {children}
                </WalletModalProvider>
              </WalletProvider>
            </ConnectionProvider>
          );
}

export default WalletContextProvider