/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";
import PingPongPepeABI from './../contractConfig/PingPongPepeABI.json';

export const PingPongPepeContractConfig = {
    // address: '0x02e48490A8A51F09843D812804fd04d24EF6CA0f',
    address:'0xAf6a3E68eD68C310c67848F52ADD41fA46bd8Cd3',
    abi: PingPongPepeABI,
} as const

const deployedContracts = {
    84532: {
        PingPongPepe: {
            ...PingPongPepeContractConfig
        },
    },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;