import TokenIcon from "./TokenIcon";
import img1 from "~~/public/img/Group 18702.svg";
import clear from "~~/public/img/clear.svg";

import Image from 'next/image';
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { erc20ABI, readContract } from "@wagmi/core";
import { formatBigintToString, formatTokenDispaly, formatTokenToUSD } from "~~/utils/scaffold-eth/common";
import { Balance } from "./scaffold-eth";
import { TokenAddress, TokenInfo } from "~~/contractConfig";
import { useAccount } from "wagmi";
import { useGlobalState } from "~~/services/store/store";

export type TokenType = 'USDT' | 'DAI' | 'USDC' | 'WETH' | 'WBTC' | 'BLEND';

interface NumericInputProps {
    style?: React.CSSProperties;
    value?: string;
    defaultValue?:string;
    onChange?: (value: any) => void;
    disabled?: boolean;
    tokenType: TokenType;
    hideBalance?: boolean;
    hideLabel?:boolean;
    balanceText?:string;
    balanceValue?:string
}

const TokenInput = (props: NumericInputProps)=>{
    const { defaultValue, onChange, value : valued, tokenType, hideBalance=false, hideLabel=false,balanceText="Wallet balance",balanceValue } = props;
    const [value, setValue] = useState<string>(defaultValue||valued||"");
    const { address, isConnecting, isDisconnected } = useAccount();
    const [loading,setLoading] = useState<boolean>(false);
    const [balance,setBalance] = useState('0');
    const [inputUSDValue,setInputUSDValue] = useState('0');
    const assetsPrice = useGlobalState(state => state.assetsPrice);
    
    const getUSDTBalance = async()=>{
        const balanceOf = await readContract({ 
            address: '0xc3b634a9884F29850e94f22cda72F95Db3C4A62f',
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address as `0x${string}`],
        })
        setBalance(formatBigintToString(balanceOf,(TokenInfo as any)[`${tokenType}`].decimals));
    }

    const getDAIBalance = async()=>{
        const balanceOf = await readContract({ 
            address: '0xe56c67C952c42026bc331Bc9d9725B16ddb21be2',
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address as `0x${string}`],
        })
        setBalance(formatBigintToString(balanceOf));
    }

    const getUSDCBalance = async()=>{
        const balanceOf = await readContract({ 
            address: '0xd2cc425451D4273cce1fFf3320F2b0AC20793D17',
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address as `0x${string}`],
        })
        setBalance(formatBigintToString(balanceOf,(TokenInfo as any)[`${tokenType}`].decimals));
    }

    const getWETHBalance = async()=>{
        const balanceOf = await readContract({ 
            address: '0x16844215913179e413d312ea7D03BbEfF4150C02',
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address as `0x${string}`],
        })
        setBalance(formatBigintToString(balanceOf));
    }
    const getWBTCBalance = async()=>{
        const balanceOf = await readContract({ 
            address: '0xe56c67C952c42026bc331Bc9d9725B16ddb21be2',
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address as `0x${string}`],
        })
        setBalance(formatBigintToString(balanceOf));
    }

    const getBLENDBalance = async()=>{
        const balanceOf = await readContract({ 
            address: '0x0D823cCfe7f70ac1Ff0Da1B943E9E043aBCFBEfD',
            abi: erc20ABI,
            functionName: 'balanceOf',
            args: [address as `0x${string}`],
        })
        setBalance(formatBigintToString(balanceOf));
    }
    
    const handleGetBalance = async()=>{
        setLoading(true)
        if(tokenType==='USDT'){
            await getUSDTBalance();
        }
        if(tokenType==='DAI'){
            await getDAIBalance();
        }
        if(tokenType==='USDC'){
            await getUSDCBalance();
        }
        if(tokenType==='WETH'){
            await getWETHBalance();
        }
        if(tokenType==='WBTC'){
            await getWBTCBalance();
        }
        if(tokenType==='BLEND'){
            await getBLENDBalance();
        }
        setLoading(false)

    }

    useEffect(()=>{
        if(balanceValue){
            setBalance(balanceValue)
        }else{
            handleGetBalance();
        }
    },[])
    

    useEffect(()=>{
      setValue(defaultValue||valued||"")
    },[valued,defaultValue])
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  
      const { value: inputValue } = e.target;
      console.log(inputValue);
    
  
  
      if(inputValue==='.'){
          setValue("0.")
          onChange&&onChange("0.")
          return
      }
      if(parseFloat(inputValue) > parseFloat(balance)){
          setValue(balance)
          onChange&&onChange(balance)
          return
      }
  
      if(inputValue==='-'){
          setValue("0")
          onChange&&onChange("0")
          return
      }
  
      const reg = /^-?\d*(\.\d*)?$/;
      if (reg.test(inputValue) || inputValue === '') {
            setValue(inputValue);
            onChange&&onChange(inputValue);
           
      }
    };

    useEffect(()=>{
        if(value){
            const usd =  formatTokenToUSD(parseFloat(value),assetsPrice?.find((item)=>(TokenAddress as any)[`${tokenType}`].toLowerCase()===item.id)?.priceInEth??0n)
            setInputUSDValue(usd)
        }else{
            setInputUSDValue('0')
        }
     
    },[value])
  
    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
      let valueTemp = value || '';
  
      if (value.toString().charAt(value.length - 1) === '.' || value === '-') {
        valueTemp = value.slice(0, -1);
      }
      const val = valueTemp.toString().replace(/0*(\d+)/, '$1')
      setValue(val);
      onChange&&onChange(val)
    };

    const handleClear = ()=>{
        setValue("")
        onChange&&onChange("")

    }
  
    return (
        <div>
            <p style={{display:hideLabel?'none':''}}  className="text-gray-500 flex items-center gap-1">Amount <Image src={img1} alt=''/></p>
            <div className="outline outline-1 outline-gray-300 rounded-md border-gray-300 py-[.375rem]">
            
            <label className="input input-sm flex items-center gap-2 px-2 rounded-none border-none focus:outline-none focus-within:outline-none">
                <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
                defaultValue={defaultValue}
                autoFocus type="text" className="grow h-full text-xl" placeholder="0.00"/>
                <div className="flex gap-1">
                    <Image onClick={handleClear} style={{display:value?'':'none'}} className="cursor-pointer" src={clear} alt='clear'/>
                    <div>
                        <TokenIcon height={24} width={24} type={tokenType}/>
                    </div>
                    <strong className="text-base">{tokenType.toUpperCase()}</strong>
                </div>
            </label>
            <div className="flex justify-between items-center px-2 text-gray-400">
                <span className="text-[.8125rem]">${inputUSDValue}</span>
                <div style={{display:hideBalance?'none':''}}>
                    <span className="mr-4 text-[.8125rem]">{balanceText} <span className={`rounded-sm opacity-100 ${loading?'skeleton':''}`}>{formatTokenDispaly(balance)} </span></span>
                    <span onClick={()=>{
                        setValue(balance)
                        onChange&&onChange(balance);
                    }} className="cursor-pointer">MAX</span>
                </div>
            </div>
        </div>
        </div>
      
    )
}
export default TokenInput;