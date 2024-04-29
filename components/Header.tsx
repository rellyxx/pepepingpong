"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import CustomModal from "./CustomModal";
import { SolanaWalletConnectButton } from "./SolanaWalletConnectButton";
import { SwitchTheme } from "./SwitchTheme";
import SwitchToken from "./SwitchToken";
import TokenInput from "./TokenInput";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import logo from "~~/public/img/logo.svg";

// type HeaderMenuLink = {
//   label: string;
//   href: string;
//   icon?: React.ReactNode;
// };

// export const menuLinks: HeaderMenuLink[] = [
//   {
//     label: "reserveOverview",
//     href: "/reserve-overview",
//   },
// ];

// export const HeaderMenuLinks = () => {
//   const pathname = usePathname();
//   return (
//     <>
//       {menuLinks.map(({ label, href, icon }) => {
//         const isActive = pathname === href;
//         return (
//           <li key={href}>
//             <Link
//               href={href}
//               prefetch={true}
//               passHref
//               className={`${
//                 isActive ? "bg-secondary shadow-md" : ""
//               } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
//             >
//               {icon}
//               <span>{label}</span>
//             </Link>
//           </li>
//         );
//       })}
//     </>
//   );
// };

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (window !== undefined) {
      router.prefetch("/pong");
    }
  }, []);

  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const pathname = usePathname();

  return (
    <div className="flex justify-center px-[18%] py-[15px]  border-b-[0.5px] border-gray-500 border-opacity-[0.6]">
      <div className="flex items-center justify-between min-w-[874px] w-full">
        <div onClick={()=>router.push("/")} className="flex items-center cursor-pointer">
          
          <Image width={28} src={logo} alt="Logo" />
          <span className=" ml-[10px] text-black">PINGPONGPEPE</span>
        </div>

        <div className="h-full flex gap-1">
        {(pathname === "/pepePing")  && <SolanaWalletConnectButton /> }
        {(pathname === "/pepePong")  && <RainbowKitCustomConnectButton /> }
        {(pathname === "/pepePingPong")  && <SolanaWalletConnectButton /> }
       
        </div>
      </div>
     
    </div>
  );
};
