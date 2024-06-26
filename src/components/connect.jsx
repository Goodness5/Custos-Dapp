"use client";
import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "../utils/thirdwebclient";

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const ConnectButtoncomponent = () => {
  return (
    <div className="hover:cursor-pointer">
      <ConnectButton client={client} wallets={wallets} />
    </div>
  );
};

export default ConnectButtoncomponent;
