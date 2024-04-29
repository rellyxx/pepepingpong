"use client";

import { Suspense, useEffect, useState } from "react";
import WalletContextProvider from "./WalletContextProvider";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useAsetsPrice } from "~~/hooks/scaffold-eth/useAsetsPrice";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";

const myStyle = {
  flexDirection: "column !important",
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  // const price = useNativeCurrencyPrice();
  // const assetsPrice = useAsetsPrice();
  // const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // const setAssetsPrice = useGlobalState(state => state.setAssetsPrice);

  // useEffect(() => {
  //   if (assetsPrice.length > 0) {
  //     setAssetsPrice(assetsPrice)
  //   }
  //   console.log("assetsPrice222", assetsPrice);

  // }, [assetsPrice])

  // useEffect(() => {
  //   if (price > 0) {
  //     setNativeCurrencyPrice(price);
  //   }
  // }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col min-h-screen  w-full homeBg bg-white">
          <Header />
          <main className="relative flex flex-1 w-full  justify-center">{children}</main>
          {/* <Footer /> */}
        </div>
      </div>

      <Toaster />
    </>
  );
};

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WalletContextProvider>
      <WagmiConfig config={wagmiConfig}>
        <ProgressBar />
        <RainbowKitProvider
          chains={appChains.chains}
          avatar={BlockieAvatar}
          theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
        >
          <Suspense fallback={<ProgressBar />}>
            <ScaffoldEthApp>{children}</ScaffoldEthApp>
          </Suspense>
        </RainbowKitProvider>
      </WagmiConfig>
    </WalletContextProvider>
  );
};
