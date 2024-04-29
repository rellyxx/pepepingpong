import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';
import { useFeeData } from 'wagmi'
import { TokenAddress } from '~~/contractConfig';
import { useGlobalState } from '~~/services/store/store';
import { formatBigintToString } from '~~/utils/scaffold-eth/common';

const Gas = ()=>{
    const assetsPrice = useGlobalState(state => state.assetsPrice);

    const result =  useFeeData({
        formatUnits: 'gwei',
    })
    console.log('fee1',result);

    const getUsed = ()=>{
        console.log("assetsPrice",assetsPrice);
        
        const ethUsdRate = assetsPrice.find((item)=>item.id===(TokenAddress as any).WBTC.toLocaleLowerCase())?.priceInEth;
        console.log("ethUsdRat1e",ethUsdRate);
        
        const gasPrice = ethers.formatUnits(result.data?.gasPrice ?? 0n,18);
        const gasCost = BigNumber(gasPrice.toString()).times(126208).toString();
        const gasCostUsd = BigNumber(parseFloat(gasCost)).times(BigNumber(formatBigintToString(ethUsdRate??0n,8)))
        console.log("gasCostUsd",gasCostUsd.toString());
        return gasCostUsd.toFixed(2)
        
    }
    
    return (
        <div>${getUsed()}</div>
    )
}
export default Gas;