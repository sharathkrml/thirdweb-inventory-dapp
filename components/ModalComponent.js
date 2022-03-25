import React from "react";
import Image from "next/image";
import {
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
} from "@thirdweb-dev/react";
function ModalComponent() {
  const connectMetamask = useMetamask();
  const connectCoinbaseWallet = useCoinbaseWallet();
  const connectWalletConnect = useWalletConnect();
  return (
    <div className="flex flex-col sm:flex-row" style={{ height: "100%" }}>
      <div
        onClick={connectMetamask}
        className="flex-1 border-2 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100"
      >
        <Image src="/metamask.svg" width={95} height={95} alt="metamask" />
        <p className="text-center">Connect using Metamask</p>
      </div>
      <div
        onClick={connectCoinbaseWallet}
        className="flex-1 border-2  flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100"
      >
        <Image src="/Coinbase.svg" width={95} height={95} alt="Coinbase" />
        <p className="text-center">Connect using Coinbase</p>
      </div>
      <div
        onClick={connectWalletConnect}
        className="flex-1 border-2 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100"
      >
        <Image
          src="/walletConnect.svg"
          width={95}
          height={95}
          alt="walletConnect"
        />
        <p className="text-center">Connect using Wallet Connect</p>
      </div>
    </div>
  );
}

export default ModalComponent;
