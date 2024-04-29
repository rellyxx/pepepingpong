import { Divider } from "@mui/material";
import Image from "next/image";
import { parseAbi, zeroAddress } from "viem";
import { erc20ABI, getAccount, readContract } from '@wagmi/core'
import { TokenAddress } from "~~/contractConfig";
import { useAccountBalance } from "~~/hooks/scaffold-eth";
import img1 from "~~/public/img/Group 18878.svg";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { formatBigintToString, formatTokenDispaly } from "~~/utils/scaffold-eth/common";
import { useAccount } from "wagmi";
const YourInfo = () => {

    const [wbtcBalance,setWBTCBalance] = useState('0');
    const { address, isConnecting, isDisconnected } = useAccount();
    
    
    const getWBTCBalance = async()=>{
        const balanceOf = await readContract({ 
            address: '0xe56c67C952c42026bc331Bc9d9725B16ddb21be2',
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address??zeroAddress],
        })
        setWBTCBalance(formatBigintToString(balanceOf));
    }

    useEffect(()=>{
        getWBTCBalance();
    },[])
    
    return (
        <div className="p-4 flex flex-col gap-4">
            <strong>Your Info</strong>
            <div className="flex gap-2">
                <Image src={img1} alt="wallet" />
                <div className="flex flex-col">
                    <span className="text-gray-400">Wallet balance</span>
                    <span >{formatTokenDispaly(wbtcBalance)} WBTC</span>
                </div>
            </div>
            <Divider className="w-full" />
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <div className="text-gray-400 text-sm flex gap-1 items-center">
                        Available to supply 
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <circle cx="5.5" cy="5.5" r="5" stroke="black" />
                                <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round" />
                            </g>
                        </svg>
                    </div>
                    <div>0.3900000 WBTC</div>
                    <div className="text-gray-400 text-xs">$28,300.00</div>
                </div>
                <button className="btn btn-primary btn-sm text-white">Supply</button>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <div className="text-gray-400 text-sm flex gap-1 items-center">
                        Available to borrow 
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <circle cx="5.5" cy="5.5" r="5" stroke="black" />
                                <path d="M5.5 2.5V3.5M5.5 5V8.5" stroke="black" strokeLinecap="round" />
                            </g>
                        </svg>
                    </div>
                    <div>0.3900000 WBTC</div>
                    <div className="text-gray-400 text-xs">$28,300.00</div>
                </div>
                <button className="btn btn-primary btn-sm text-white">Borrow</button>
            </div>
        </div>
    )
}

export default YourInfo;