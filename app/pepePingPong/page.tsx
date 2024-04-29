"use client";

import { useEffect, useState } from "react";
import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import BigNumber from "bignumber.js";
import Progress from "~~/components/Progress";
import { PingPongPepeContractConfig } from "~~/contracts/deployedContracts";
import { ethers } from "ethers";
import { notification } from "~~/utils/scaffold-eth";

const PepePingPong = () => {
 
 const [solanaAddress, setSolanaAddress] = useState("");
  const [fee, setFee] = useState<bigint>(0n);
  const [totalMints, setTotalMints] = useState<bigint>(0n);
  const [totalSupply, setTotalSupply] = useState<bigint>(0n);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: any) => {
    setSolanaAddress(e.target.value);
  };
  const handleMint = async () => {
    if (solanaAddress === "") {
      notification.info("Please input solana wallet address!")
      return
    }
    const res = await writeContract({
      ...PingPongPepeContractConfig,
      functionName: "mint",
      args: [solanaAddress],
      value: fee,
    });
    return res.hash;
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const hash = await handleMint();
      const res = await waitForTransaction({ hash } as any);
      if(res.transactionHash){
        notification.success("Success!")
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);

  };
  const read = async () => {
    const currFee = (await readContract({
      ...PingPongPepeContractConfig,
      functionName: "currFee",
    })) as bigint;
    console.log("currFee", currFee);

    const totalMints = (await readContract({
      ...PingPongPepeContractConfig,
      functionName: "totalMints",
    })) as bigint;
    console.log("totalMints", totalMints);

    const totalSupply = (await readContract({
      ...PingPongPepeContractConfig,
      functionName: "totalSupply",
    })) as bigint;
    setTotalSupply(totalSupply)
    

    const EARLY_BIRD_FEE = (await readContract({
      ...PingPongPepeContractConfig,
      functionName: "EARLY_BIRD_FEE",
    })) as bigint;
    console.log("EARLY_BIRD_FEE", EARLY_BIRD_FEE);
    const num1 = new BigNumber(totalMints.toString());
    const num2 = new BigNumber("10000");
    setTotalMints(totalMints);
    const comparison = num1.comparedTo(num2);

    if (comparison <= 0) {
      setFee(EARLY_BIRD_FEE);
    } else {
      setFee(currFee);
    }
  };

  useEffect(() => {
    read();
  }, []);

  return (
    <div className="min-w-[874px] w-full px-[18%]">
        <div className="my-[20px] rounded-lg py-[40px] px-[15px] bg-white/20 w-full">
          <Progress></Progress>
        </div>
       
        <div className="font-medium text-[20px] text-right my-[20px]">
          <div className="mb-[10px]">Total Supply: {ethers.formatEther(totalSupply)}</div>
          <div>Total mints: {totalMints.toString()}</div>
        </div>
        <button 
          className={`btn cursor-pointer w-full h-[52px] bg-[#FCB335] hover:bg-[#fca635ee] border-0 text-[20px] font-medium 
          ${loading ? 'btn-disabled' : ''}`}
          onClick={handleSubmit} >
            <span className={`${loading ? 'loading loading-spinner' : ''}`}></span>
            Forge Pingpong
        </button>
    </div>
  );
}

export default PepePingPong
