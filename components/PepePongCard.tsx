"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import pepepong from "~~/public/img/pepepong.svg";

export default function PepePongCard() {
  const router = useRouter();
  return (
    <div className="p-6 bg-gradient-to-b from-blue-400 to-yellow-100 rounded-lg mr-[20px]">
      <Image width={82} src={pepepong} alt="Pepe Pong"></Image>
      <div className="text-[32px] pt-[20px] pb-[10px]">Pepe Pong</div>
      <div className="text-[20px] pb-[20px]"></div>
      <Link prefetch={true} href={'/pepePong'}>
          <button
            className="btn text-[14px] w-[230px] h-[40px] bg-[#FCB335] hover:bg-[#fca635ee] border-0"
            // onClick={() => {
            //   router.push("pepePong");
            // }}
          >
            Mint on Base
          </button>
      </Link>
      
    </div>
  );
}
