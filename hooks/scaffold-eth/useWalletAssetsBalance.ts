import { useEffect, useState } from "react";
import { useTargetNetwork } from "./useTargetNetwork";
import { useInterval } from "usehooks-ts";
import scaffoldConfig from "~~/scaffold.config";
import { erc20ABI, useAccount } from "wagmi";
import { Address, readContract } from "@wagmi/core";
import { formatBigintToString } from "~~/utils/scaffold-eth/common";
import { zeroAddress } from "viem";

const enablePolling = true;

export const useWalletAssetsBalance = (tokenAddress:Address,decimals:number=18) => {
    const { targetNetwork } = useTargetNetwork();
    const [balance,setBalance] = useState('0');
    const { address, isConnecting, isDisconnected } = useAccount();
    

    const getBalance = async () => {
        const balanceOf = await readContract({
            address: tokenAddress,
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address as `0x${string}` ?? zeroAddress],
        })
        setBalance(formatBigintToString(balanceOf,decimals));
    }


    useEffect(() => {
        getBalance()
    }, [targetNetwork])

    // useInterval(
    //     async () => {
    //         getBalance();
    //     },
    //     enablePolling ? scaffoldConfig.pollingInterval : null,
    // );

    return balance;
};
