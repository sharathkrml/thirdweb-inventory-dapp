import React from "react";
import { useRouter } from "next/router";
function Navbar({ address, disconnectButton, toggleModal, nftId }) {
  const router = useRouter();
  return (
    <nav
      className={`flex ${nftId ? "justify-between" : "justify-end"}`}
      id="root"
    >
      {nftId && (
        <div className="px-2 py-2 rounded-lg border-2 mr-4 mt-4 bg-slate-800 text-white">
          <button onClick={() => router.back()}>Back</button>
        </div>
      )}
      <div>
        {address ? (
          <div className="px-2 py-2 rounded-lg border-2 mr-4 mt-4 bg-slate-800 text-white">
            {address.substring(0, 9)}...
            <button onClick={disconnectButton} className="text-red-500 ml-6">
              X
            </button>
          </div>
        ) : (
          <button
            onClick={toggleModal}
            className="px-10 py-2 rounded-lg border-2 mr-4 mt-4 bg-slate-800 text-white"
          >
            Connect to wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
