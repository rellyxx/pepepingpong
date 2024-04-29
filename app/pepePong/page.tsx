"use client";

import { useEffect, useState } from "react";
import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import BigNumber from "bignumber.js";
import Progress from "~~/components/Progress";
import { PingPongPepeContractConfig } from "~~/contracts/deployedContracts";
import { ethers } from "ethers";
import { notification } from "~~/utils/scaffold-eth";
import { web3 } from "@project-serum/anchor";
import { useWalletClient } from "wagmi";
import Button from "~~/components/Button";

const PepePong = () => {
  
 
 const [solanaAddress, setSolanaAddress] = useState("");
  const [fee, setFee] = useState<bigint>(0n);
  const [totalMints, setTotalMints] = useState<bigint>(0n);
  const [totalSupply, setTotalSupply] = useState<bigint>(0n);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (e: any) => {
    setSolanaAddress(e.target.value);
  };


  const isValidSolanaAddress = (address:string)=> {
    try {
      new web3.PublicKey(address);
      return true;
    } catch (err) {
      return false;
    }
  }
  const handleMint = async () => {
   
    console.log();
    
    const res = await writeContract({
      ...PingPongPepeContractConfig,
      functionName: "mint",
      args: [solanaAddress],
      value: fee,
    });
    return res.hash;
  };

  const handleSubmit = async () => {
    if (!isValidSolanaAddress(solanaAddress)) {
      notification.info("Please enter a valid solana wallet address.")
      return
    }
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
        <div className="flex justify-between text-[20px] font-medium leading-[50px]">
          <div className="flex-1 bg-white  rounded-lg flex px-[20px] py-[30px] w-full">
            <div className=" border-r-2 border-[#e4e4e4] h-[50px] pr-[20px] mr-[20px]">Price:{ethers.formatEther(fee)} ETH</div>
            <div>Solana wallet address</div>
            <div className="ml-[10px] w-1/2">
                <input
                autoFocus
                  placeholder="Huvudc...RAbA"
                  value={solanaAddress}
                  onChange={handleChange}
                  type="text"
                  className="input-xs text-[16px] w-full leading-none border-b-2 border-black focus:outline-none"
                />
            </div>
          </div>
          {/* <div className="bg-white rounded-lg  flex px-[20px] py-[30px]">Total Price: 0.01 Solana</div> */}
        </div>
        <div className="font-medium text-[20px] text-right my-[20px]">
          <div className="mb-[10px]">Total Supply: {ethers.formatEther(totalSupply)}</div>
          <div>Total mints: {totalMints.toString()}</div>
        </div>
        {/* <button 
          className={`btn cursor-pointer w-full h-[52px] bg-[#FCB335] hover:bg-[#fca635ee] border-0 text-[20px] font-medium 
          ${loading ? 'btn-disabled' : ''}`}
          onClick={handleSubmit} >
            <span className={`${loading ? 'loading loading-spinner' : ''}`}></span>
            Start Mint
        </button> */}

        <Button loading={loading} onClick={handleSubmit} text="Start mint"/>

    </div>
  );
}

export default PepePong
