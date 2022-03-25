import { useNFTDrop, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { CONTRACTADDRESS, OPENSEAURL } from "../constants";
import ModalComponent from "../components/ModalComponent";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { constants } from "ethers";
import Navbar from "../components/Navbar";

Modal.setAppElement("#__next");
export default function Home() {
  const nftContract = useNFTDrop(CONTRACTADDRESS);
  const address = useAddress();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [allNFT, setAllNFT] = useState();
  const [myNFT, setMyNFT] = useState();
  const [loading, setLoading] = useState(true);
  const disconnectButton = useDisconnect();

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const getAllNFTs = async () => {
    try {
      const all = await nftContract.getAll();
      return all;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const renderNFT = (nft, i) => {
    return (
      <div
        key={i}
        onClick={() => router.push(nft.metadata.id.toString())}
        className="nft border-4 rounded-xl cursor-pointer hover:-translate-y-4"
      >
        <img src={nft.metadata.image} alt={nft.metadata.name} />
        <p className="text-center text-xl">{nft.metadata.name}</p>
        <p className="p-2 text-sm">{nft.metadata.description}</p>
        {nft.owner === constants.AddressZero ? (
          <p className="text-center">Not Minted.</p>
        ) : (
          <p className="text-center">
            Owner :{" "}
            {nft.owner === address ? "You" : nft.owner.substring(0, 9) + "..."}
          </p>
        )}
        {nft.owner !== constants.AddressZero && (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              OPENSEAURL + CONTRACTADDRESS + "/" + nft.metadata.id.toString()
            }
          >
            <p className="text-center underline">Check it out on Opensea</p>
          </a>
        )}
      </div>
    );
  };
  useEffect(async () => {
    setLoading(true);
    const res = await getAllNFTs();
    setAllNFT(res);
    setLoading(false);
  }, []);
  useEffect(async () => {
    if (address) {
      // closes the modal
      setIsOpen(false);
      setLoading(true);
      const myNFTs = await nftContract.getOwned(address);
      setMyNFT(myNFTs);
      setLoading(false);
    }
    if (!address) {
      setMyNFT("");
    }
  }, [address]);

  return (
    <>
      <Navbar
        address={address}
        disconnectButton={disconnectButton}
        toggleModal={toggleModal}
      />
      <h1 className="text-6xl text-center underline">
        {myNFT ? "My Inventory" : "Collection"}
      </h1>
      <section>
        <div className="m-10 grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {allNFT &&
            !myNFT &&
            !loading &&
            allNFT.map((nft, i) => {
              return renderNFT(nft, i);
            })}
          {myNFT &&
            !loading &&
            myNFT.map((nft, i) => {
              return renderNFT(nft, i);
            })}
        </div>
        {loading && (
          <div className="flex items-center justify-center min-h-mine">
            <h1 className="text-center">Loading</h1>
          </div>
        )}
      </section>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          content: {
            position: "absolute",
            top: "7rem",
            bottom: "7rem",
            left: "5rem",
            right: "5rem",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <ModalComponent />
      </Modal>
    </>
  );
}
