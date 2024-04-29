import { useEffect, useState } from "react";
import { useTargetNetwork } from "./useTargetNetwork";
import { useInterval } from "usehooks-ts";
import { apolloClient } from "~~/graphConfig";
import { gql } from '@apollo/client'
import { TokenInfo } from "~~/contractConfig";
import scaffoldConfig from "~~/scaffold.config";

const enablePolling = true;

export interface AssetsPrice {
  id:string;
  priceInEth:bigint
}


export const useAsetsPrice = () => {
  const { targetNetwork } = useTargetNetwork();
  const [assetsPrice, setAssetsPrice] = useState<AssetsPrice[]>([]);

  const handleGetTokenPrice = () => {
    
    // 定义查询
    const GET_USER_RESERVES = gql`
      query MyQuery {
        priceOracleAssets {
          id
          priceInEth
        }
      }
    `;

    apolloClient.query({
            query: GET_USER_RESERVES,
            fetchPolicy: 'network-only', // 禁用缓存，强制发送网络请求
        })
        .then((data) => {
            setAssetsPrice(data.data.priceOracleAssets);
        })
        .catch((err) => {
            console.log('Error fetching data: ', err)
        })
}


  useEffect(()=>{
    handleGetTokenPrice()
  },[targetNetwork])

  // useInterval(
  //   async () => {
  //     handleGetTokenPrice();
  //   },
  //   enablePolling ? scaffoldConfig.pollingInterval : null,
  // );

  return assetsPrice;
};
