'use client'
import { waitForTransaction, writeContract, readContract } from "@wagmi/core";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { PingPongPepeContractConfig } from "~~/contracts/deployedContracts";

const Ping = () => {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [end, setEnd] = useState(false);

    const [solanaAddress, setSolanaAddress] = useState("");
    const [fee, setFee] = useState<bigint>(0n);
  

    const read = async()=>{
        
        const currFee = await readContract({
            ...PingPongPepeContractConfig,
            functionName: 'currFee',
        }) as bigint
        console.log("currFee",currFee);

        const totalMints = await readContract({
            ...PingPongPepeContractConfig,
            functionName: 'totalMints',
        }) as bigint
        console.log("totalMints",totalMints);

        const EARLY_BIRD_FEE = await readContract({
            ...PingPongPepeContractConfig,
            functionName: 'EARLY_BIRD_FEE',
        }) as bigint
        console.log("EARLY_BIRD_FEE",EARLY_BIRD_FEE);
        const num1 = new BigNumber(totalMints.toString());
        const num2 = new BigNumber('10000');

        const comparison = num1.comparedTo(num2);

        if (comparison <= 0) {
            setFee(EARLY_BIRD_FEE);
        } else {
            setFee(currFee);

        }
    }

    useEffect(()=>{
        read()
    },[])



    

    // setTimeout(() => {
    //     setLoading1(false)
    //     setLoading2(true)

    // }, 5000)

    const handleMint = async()=>{
        if(solanaAddress===""){
            return ""
        }
        const res = await writeContract({
            ...PingPongPepeContractConfig,
            functionName: 'mint',
            args: [solanaAddress],
            value: fee
        })
        return res.hash;
    }

    const handleSubmit = async() => {
        setLoading1(true);
        try {
            const hash = await handleMint();
            if(hash!==""){
                const res = await waitForTransaction({hash});

                setLoading1(false);
                setLoading2(true);
                setTimeout(()=>{
                    setLoading2(false);
                    setEnd(true);
                },3000)
                
            }
       
        } catch (error) {
        }
    }
    const handleChange = (e: any)=>{
        setSolanaAddress(e.target.value)
    }
    return (
        <div className="flex flex-col gap-6 justify-center w-full">
            <div className="flex gap-2 items-center justify-center">
                1000 Ping
                {
                    loading1 ?
                        <div>
                            <progress className="progress progress-success w-56" ></progress> <span className="ml-[-140px] mb-4  absolute">minting...</span>

                        </div>
                        :
                        <progress className="progress progress-success w-56" value={loading2||end?"100":"0"} max="100"></progress>
                }

                5000 Pong
                {
                    loading2 ?
                        <div>
                            <progress className="progress progress-success w-56" ></progress> <span className="ml-[-140px] mb-4  absolute">minting...</span>

                        </div>
                        :
                        <progress className="progress progress-success w-56" value={end?"100":"0"}  max="100"></progress>
                }
                10000 Ping
            </div>
            <div className="flex justify-center">
                <input type="text" className="input" onChange={handleChange}/>
                <button onClick={handleSubmit} className="btn w-36">Mint</button>
            </div>
        </div>

    )
}
export default Ping;