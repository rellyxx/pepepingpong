import Image from "next/image"

import btc from "~~/public/img/btc.svg";
import usdt from "~~/public/img/usdt.svg";
import eth from "~~/public/img/eth.svg";
import usdc from "~~/public/img/usdc.svg";
import dai from "~~/public/img/dai.svg";

import weth from "~~/public/img/weth.svg";

import blend from "~~/public/img/Subtract.svg";


interface Props {
    type:string;
    height?:number | string;
    width?:number | string;
}

const TokenIcon = (props:Props)=>{
    const {type,height=30,width=30} = props;

    const img = ()=>{
        if(type.toLowerCase()==="usdt"){
            return <Image  src={usdt} alt={type}/>
        }
        if(type.toLowerCase()==="eth"){
            return <Image  src={eth} alt={type}/>
        }
        if(type.toLowerCase()==="weth"){
            return <Image  src={weth} alt={type}/>
        }
        if(type.toLowerCase()==="btc"){
            return <Image  src={btc} alt={type}/>
        }
        if(type.toLowerCase()==="wbtc"){
            return <Image  src={btc} alt={type}/>
        }
        if(type.toLowerCase()==="blend"){
            return <Image  src={blend} alt={type}/>
        }
        if(type.toLowerCase()==="usdc"){
            return <Image  src={usdc} alt={type}/>
        }
        if(type.toLowerCase()==="dai"){
            return <Image  src={dai} alt={type}/>
        }
        return <Image  src={btc} alt="type"/>
    }
    return (
        <div style={{height:height,width:width}}>
            {img()}
        </div>
    )
}
export default TokenIcon