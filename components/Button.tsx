import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useNetwork } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";
const ReactUIWalletModalButtonDynamic:any = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletModalButton,
    { ssr: false }
);
const Button = ({ loading, onClick, text }: any) => {

    const pathname = usePathname();
    const wallet = useWallet();
    const {chain:c} = useNetwork();

    const [btnText,setBtnText] = useState(text)
    const { isConnected } = useAccount();
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();


    useEffect(() => {
        console.log("wallet",wallet);
        
        if(pathname === "/pepePing" || pathname === "/pepePingPong"){
            console.log("wallet",wallet.connected);
            
            if (!wallet.connected) {
                setBtnText('Select wallet')
            }else{
                setBtnText(text)
            }
        }

        if(pathname === "/pepePong"){
            if (!isConnected) {
                setBtnText('Connect wallet')
            }else{
                setBtnText(text)
            }
        }
    }, [wallet.connected,isConnected])



    const handleClick = () => { 
        console.log('wallet',wallet);
        

        // if(pathname === "/pepePing" || pathname === "/pepePingPonnng"){
        //     if (!wallet.connected) {
        //         wallet.connect()
        //     }else{
        //         console.log('onClick');
        //         onClick()
        //     }
        // }
        
        if(pathname === "/pepePong"){
            if (!isConnected) {
                connect({ connector: connectors[0] })
            }else{
                console.log('onClick');
                onClick()
            }
        }
    }


    return (
        <button
            className={`btn cursor-pointer w-full h-[52px] bg-[#FCB335] hover:bg-[#FCB335] border-0 text-[20px] font-medium 
          ${loading ? 'btn-disabled' : ''}`}
            onClick={handleClick} >
            <span className={`${loading ? 'loading loading-spinner' : ''}`}></span>
           
            {
                (pathname === "/pepePing" || pathname === "/pepePingPonnng")&&!wallet.connected ? <ReactUIWalletModalButtonDynamic style={{height:'36px',background:'#fcb335',color:'black'}}/> : btnText
            }
           
        </button>
    )
}

export default Button;