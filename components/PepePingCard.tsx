"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import pepeping from "~~/public/img/pepeping.svg";

export default function PepePingCard() {
  const router = useRouter();
  return (
    <div className="p-6 bg-gradient-to-b from-blue-500 via-teal-300 to-teal-300 rounded-lg mr-[20px]">
      <Image width={82} src={pepeping} alt="Pepe Ping"></Image>
      <div className="text-[32px] pt-[20px] pb-[10px]">Pepe Ping</div>
      <div className="text-[20px] pb-[20px]"></div>
      <Link prefetch={true} href={'/pepePing'}>
      <button
        className="btn text-[14px] w-[230px] h-[40px] bg-[#FCB335] hover:bg-[#fca635ee] border-0"
      >
          Mint on Solana
      </button>
      </Link>
    </div>
  );
}
