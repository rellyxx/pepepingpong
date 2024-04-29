import React from "react";
import { hardhat } from "viem/chains";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";
import { Divider } from "@mui/material";
import img7 from "~~/public/img/github.svg";
import img8 from "~~/public/img/twitter.svg";
import img9 from "~~/public/img/tg.svg";
import img13 from "~~/public/img/discord.svg";
import Image from 'next/image';

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <Divider className="w-full"/>
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-between items-center text-sm w-full">
            <div className="flex gap-6">
              <a target="_blank" rel="noreferrer" className="cursor-pointer">
                Terms
              </a>
              <a target="_blank" rel="noreferrer" className="cursor-pointer">
              Privacy
              </a>
              <a target="_blank" rel="noreferrer" className="cursor-pointer">
              Docs
              </a>
              <a target="_blank" rel="noreferrer" className="cursor-pointer">
              Send feedback              
              </a>
              <a target="_blank" rel="noreferrer" className="cursor-pointer">
              Manage analytics
              </a>
            </div>
            <div className="flex w-56 gap-2">
                <Image onClick={()=>window.open("https://github.com/PingPongPePe-PingPongPePe/blend-contract")} src={img7} alt=""  className="cursor-pointer h-[31px] w-[31px]"/>
                <Image onClick={()=>window.open("https://twitter.com/ProtocolPingPongPePe")} src={img8} alt="" className="cursor-pointer h-[31px] w-[31px]"/>
                <Image onClick={()=>window.open("https://t.me/protocolblend")} src={img9} alt="" className="cursor-pointer  h-[31px] w-[31px]"/>
                <Image onClick={()=>window.open("https://discord.gg/2vV55UQ4zH")} src={img13} alt="" className="cursor-pointer h-[31px] w-[31px]"/>
            </div>
        
          </div>
        </ul>
      </div>
    </div>
  );
};
