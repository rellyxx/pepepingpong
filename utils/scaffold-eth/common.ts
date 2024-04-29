// To be used in JSON.stringify when a field might be bigint

import BigNumber from "bignumber.js";
import { ethers } from "ethers";
import { TokenAddress } from "~~/contractConfig";

// https://wagmi.sh/react/faq#bigint-serialization
export const replacer = (_key: string, value: unknown) => (typeof value === "bigint" ? value.toString() : value);

export const formatBigintToString = (value: bigint | BigNumber,decimals=18) => {
    return parseFloat(ethers.formatUnits(value.toString(),decimals)).toString()
};

export const formatTokenToUSD = (tokenBanlance: number,price:bigint) => {
    return BigNumber(tokenBanlance).times(BigNumber(ethers.formatUnits(price,8))).toString()
};

export const formatTokenToPlaceUSD = (tokenBanlance: number,price:bigint) => {
    return BigNumber(tokenBanlance).times(BigNumber(ethers.formatUnits(price,8))).decimalPlaces(2).toFormat();
};


export const formatUSDDispaly = (value:string) => {
    if(value.includes('e')){
        return value
    }
    return BigNumber(value).decimalPlaces(2).toFormat();
};


export const formatTokenDispaly = (value:string) => {
    if(value.includes('e')){
        return value
    }
    return BigNumber(value).decimalPlaces(9).toFormat();
};

export const formatBigToRate = (value: number) => {
    const rate = parseFloat(ethers.formatUnits(value.toString(),27));
    if(rate<0.0001){
        return "<0.01%"
    }
    return `${(rate*100).toFixed(2)}%`
};