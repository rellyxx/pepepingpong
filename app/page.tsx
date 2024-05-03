"use client";

import Image from "next/image";
import type { NextPage } from "next";
import PepePingCard from "~~/components/PepePingCard";
import PepePingPongCard from "~~/components/PepePingPongCard";
import PepePongCard from "~~/components/PepePongCard";
import pepeping from "~~/public/img/pepeping.svg";
import pepepong from "~~/public/img/pepepong.svg";

const Home: NextPage = () => {
  return (
      <div>
        <div className="flex flex-col pt-[30px] pb-[20px]">
          <div className="text-[#535353] text-[16px]">Cross Chain Meme coin</div>
          <div className="text-[32px] py-[20px]">Forge your favorite meme coin!</div>
          <div className="text-[24px]">Start here</div>
        </div>
        <div className="flex justify-between w-[880px]">
          <PepePingCard/>
          <PepePongCard/>
          {/* <PepePingPongCard/> */}
        </div>
      </div>
  );
};
export default Home;
