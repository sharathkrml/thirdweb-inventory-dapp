import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAddress, useDisconnect, useNFTDrop } from "@thirdweb-dev/react";
import Navbar from "../components/Navbar";
import Modal from "react-modal";
import ModalComponent from "../components/ModalComponent";
import { CONTRACTADDRESS } from "../constants";

Modal.setAppElement("#root");
function PreviewNFT() {
  const router = useRouter();
  const { nftId } = router.query;
  const address = useAddress();
  const [isOpen, setIsOpen] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");
  const nftContract = useNFTDrop(CONTRACTADDRESS);
  const [NFT, setNFT] = useState();
  const [loading, setLoading] = useState(true);
  const [disableInput, setDisableInput] = useState();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const transferNFT = async () => {
    try {
      setDisableInput(true);
      const res = await nftContract.transfer(transferAddress, nftId);
      setDisableInput(false);
    } catch (error) {
      console.log(error);
    }
    getNFT();
  };
  const getNFT = async () => {
    try {
      const res = await nftContract.get(nftId);
      console.log(res);
      setNFT(res);
    } catch (error) {
      console.log(error);
      setNFT({});
    }
  };
  useEffect(() => {
    if (address) {
      setIsOpen(false);
    }
  }, [address]);
  useEffect(async () => {
    setLoading(true);
    getNFT();
    setLoading(false);
  }, [nftId]);

  const disconnectButton = useDisconnect();
  return (
    <>
      <Navbar
        address={address}
        disconnectButton={disconnectButton}
        toggleModal={toggleModal}
        nftId
      />
      <section id="root">
        <div className="mainComponent">
          <>
            {loading && (
              <div className="flex items-center justify-center min-h-mine">
                <h1 className="text-center">Loading</h1>
              </div>
            )}
          </>
          <>
            {NFT && (
              <div className="nft-component">
                <img src={NFT.metadata.image} />
                <h1 className="text-center">Name: {NFT.metadata.name}</h1>
                <p className="text-center">
                  Description: {NFT.metadata.description}
                </p>
                <p className="text-center">
                  Owner: {NFT.owner === address ? "You" : NFT.owner}
                </p>
              </div>
            )}
          </>
          <>
            {NFT && address === NFT.owner && (
              <div className="transfer flex flex-row justify-center my-8">
                <input
                  type="text"
                  placeholder="address"
                  className="border-2 border-blue-700 p-1 rounded-xl"
                  onChange={(e) => setTransferAddress(e.target.value)}
                  disabled={disableInput ? "disabled" : ""}
                />
                <button
                  onClick={transferNFT}
                  className="p-2 bg-blue-700 rounded-xl mx-5"
                >
                  Transfer
                </button>
              </div>
            )}
          </>
        </div>
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

export default PreviewNFT;
