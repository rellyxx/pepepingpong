import { useEffect, useState } from "react";
import TokenIcon from "./TokenIcon";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { readContract } from "@wagmi/core";
import { PoolContractConfig } from "~~/contracts/deployedContracts";
import { zeroAddress } from "viem";
import { useAccount } from "wagmi";
import { formatBigintToString } from "~~/utils/scaffold-eth/common";
import { useGlobalState } from "~~/services/store/store";

const options = [
    {
        label:"Bitcoin Market",
        value:0,
        type:"btc"
    },

    {
        label:"Ethereum Market",
        value:1,
        type:"eth"
    },
]

const SelectMarketCard = ()=>{
    const { address, isConnecting, isDisconnected } = useAccount();
    const [userAccountData,setUserAccountData] = useState<bigint[]>([]);
    const freshTime = useGlobalState(state => state.freshTime);

    const getUserAccountData = async()=>{
        const data:any = await readContract({
            ...PoolContractConfig,
            functionName: 'getUserAccountData',
            args: [address as `0x${string}` ?? zeroAddress],
        })
        setUserAccountData(data);
    }

    console.log("userAccountData",userAccountData);

    useEffect(()=>{
        getUserAccountData();
    },[address,freshTime])
  

    const [selected,setSelected] = useState(options[0]);

    const handleOption = (item:any)=>{
        console.log(item);
        setSelected(item);
    }
    return (
        <div className="min-h-[12.5rem] bg-black text-white px-16 pt-10 pb-20 mb-[-4.25rem] ">
            <div className="dropdown">
                <div tabIndex={0}  className="m-1 btn bg-inherit text-white text-lg border-[0px] hover:bg-inherit">
                    <TokenIcon type={selected.type}/>
                    {selected.label}
                    <div className="badge badge-xs text-[.5625rem] mb-2 border-[0px] text-white bg-gradient-to-r from-[#E600A6] to-[#FFC850]">V1</div>
                     <ExpandMoreIcon/>
                     </div>
                <ul tabIndex={0}  className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 text-black">
                    {
                        options.map((item)=>{
                            return  <li onClick={()=>handleOption(item)} key={item.value}><span>{item.label}</span></li>
                        })
                    }
                </ul>
            </div>
            <section className="flex gap-4 px-5">
                <div className="flex flex-col">
                    <span className="text-gray-400 text-[.75rem]">Net worth</span>
                    <strong>$10.00K</strong>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400 text-[.75rem]">Net APY</span>
                    <strong>-0.16%</strong>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400 text-[.75rem]">Health factor</span>
                    
                    <strong className="text-[#F89F1A] flex items-center gap-2">{formatBigintToString(userAccountData[5]??0n)}
                    <div className="badge badge-xs rounded-sm text-[.5625rem] border-[0px] text-white bg-gray-700">RISK DETAILS</div>
                    </strong>
                </div>

            </section>
        </div>
    )
}
export default SelectMarketCard;