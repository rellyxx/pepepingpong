import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import WalletContextProvider from "~~/components/WalletContextProvider";
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : `http://localhost:${process.env.PORT}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "PingPongPePe",
    template: "%s | PingPongPePe",
  },
  description: "Built with 🏗 PingPongPePe",
  openGraph: {
    title: {
      default: "PingPongPePe",
      template: "%s | PingPongPePe",
    },
    description: "Built with 🏗 PingPongPePe",
    images: [
      {
        url: imageUrl,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [imageUrl],
    title: {
      default: "PingPongPePe",
      template: "%s | PingPongPePe",
    },
    description: "Built with 🏗 PingPongPePe",
  },
  icons: {
    icon: [{ url: "/favicon.png", sizes: "32x32", type: "image/png" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        {children}
    </div>
  );
};

export default ScaffoldEthApp;
