import { Address } from "viem";
import { useWalletAssetsBalance } from "~~/hooks/scaffold-eth/useWalletAssetsBalance";
import { useGlobalState } from "~~/services/store/store";
import { formatTokenDispaly, formatTokenToPlaceUSD, formatTokenToUSD } from "~~/utils/scaffold-eth/common";

interface Props {
    tokenAddress: Address;
    decimals?:number;
}

const WalletAssetBalance = (props:Props)=>{
    const assetsPrice = useGlobalState(state => state.assetsPrice);

    const balance = useWalletAssetsBalance(props.tokenAddress,props.decimals);

    return (
        <>
            {formatTokenDispaly(balance)}
            
            <div className="text-gray-300">${formatTokenToPlaceUSD(parseFloat(balance),assetsPrice?.find((item)=>props.tokenAddress===item.id)?.priceInEth??0n)}</div>
        </>
    )
}

export default WalletAssetBalance
