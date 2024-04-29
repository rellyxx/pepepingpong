import { Address, createPublicClient, http, parseAbi } from "viem";
import { baseSepolia, mainnet } from "viem/chains";
import { PingPongPepeContractConfig } from "~~/contracts/deployedContracts";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

const publicClient = createPublicClient({
  chain: baseSepolia,
//   transport: http(`${mainnet.rpcUrls.alchemy.http[0]}/${scaffoldConfig.alchemyApiKey}`),
  transport: http(`https://base-sepolia.g.alchemy.com/v2/Jq31OoqEHOEznu48spuk8CMrZTzfBVaf`),

});



export const fetchTest = async () => {
    console.log("1111");
 
    const data = await publicClient.readContract({
        ...PingPongPepeContractConfig,
        functionName: "currFee",
    });


    console.log("fetchdata",data);
    
    return data

   
};
