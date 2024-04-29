// import { create } from "zustand";
import { Address } from "viem";
import create from "zustand"
import { TokenType } from "~~/components/TokenInput";
import { AssetsPrice } from "~~/hooks/scaffold-eth/useAsetsPrice";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type TokenData = {
  Asset: TokenType;
  Available?: string;
  APY?: string;
  Collateral?: boolean;
  address?: Address;
  decimals?: number;
  usd?:string;
};

type GlobalState = {
  nativeCurrencyPrice: number;
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
  freshTime:number;
  setFreshTime: (newVal: number) => void;
  assetsPrice:AssetsPrice[];
  setAssetsPrice: (newVal: AssetsPrice[]) => void;
  assetsBorrow:TokenData[];
  setAssetsBorrow: (newVal: TokenData[]) => void;

};

export const useGlobalState = create<GlobalState>(set => ({
  nativeCurrencyPrice: 0,
  setNativeCurrencyPrice: (newValue: number): void => set(() => ({ nativeCurrencyPrice: newValue })),
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
  freshTime:0,
  setFreshTime:(newValue: number): void => set(() => ({ freshTime: newValue })),
  assetsPrice:[],
  setAssetsPrice: (newValue: AssetsPrice[]): void => set(() => ({ assetsPrice: newValue })),
  assetsBorrow:[],
  setAssetsBorrow: (newValue: TokenData[]): void => set(() => ({ assetsBorrow: newValue })),
}));
