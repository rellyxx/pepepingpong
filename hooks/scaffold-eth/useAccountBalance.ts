import { useCallback, useEffect, useState } from "react";
import { useTargetNetwork } from "./useTargetNetwork";
import { Address } from "viem";
import { useBalance } from "wagmi";
import { useGlobalState } from "~~/services/store/store";

export function useAccountBalance(address?: Address) {
  const [isEthBalance, setIsEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const price = useGlobalState(state => state.nativeCurrencyPrice);
  const { targetNetwork } = useTargetNetwork();
  console.log("targetNetwork",targetNetwork);
  console.log("price",price);
  

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useBalance({
    address,
    watch: true,
    chainId: targetNetwork.id,
  });

  const onToggleBalance = useCallback(() => {
    if (price > 0) {
      setIsEthBalance(!isEthBalance);
    }
  }, [isEthBalance, price]);

  useEffect(() => {
    console.log("fetchedBalanceData",fetchedBalanceData);
    
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted));
    }
  }, [fetchedBalanceData, targetNetwork]);

  return { balance, price, isError, isLoading, onToggleBalance, isEthBalance };
}
