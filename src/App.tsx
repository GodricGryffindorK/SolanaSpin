/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Slider from "./Components/Slider/Slider2";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { getPhantomWallet } from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import { useMemo } from "react";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import "@solana/wallet-adapter-react-ui/styles.css";
import Admin from "./screens/admin/Admin";

function App() {
  // mainnet
  // const network = WalletAdapterNetwork.Mainnet;
  // const endpoint = useMemo(() => "https://prettiest-indulgent-surf.solana-mainnet.quiknode.pro/b905f878a379dc3ae916cc6f0bc31c153d1a1b3a/", [network]);
  // devnet
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl("devnet"), [network]);

  const wallets = useMemo(() => [getPhantomWallet()], []);

  return (
    <Router>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div className="backgound-custom">
              <Navbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Banner />
                      <Slider />
                    </>
                  }
                />
                <Route path="/admin" element={<Admin />} />
              </Routes>
              <Footer />
            </div>
            <NotificationContainer />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  );
}

export default App;
