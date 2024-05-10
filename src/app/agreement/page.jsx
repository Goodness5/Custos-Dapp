/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import CustomCard from "./components/card";
import Modal from "react-modal";
import AgreementModal from "./components/createAgrement";
import { baseSepolia } from "thirdweb/chains";
import { getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import abi from "@/utils/agreementAbi.json";
import { client } from "@/utils/thirdwebclient";
import SignAgreementModal from "./components/signagreementmodal";

function AgreementList() {
  const [loading, setLoading] = useState(true);
  const [agreements, setAgreements] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showagreementModal, setShowagreementModal] = useState(false);

  const filteragreement = () => {
    // const filteredagreement = agreements.filter(firstpartyaddress||secondpartyaddress => Wallet.address)
    // setAgreements(filteredagreement)
    // filter diaplayed agreements based on firstpartyaddress and secondparty address
  };

  const contract = getContract({
    client,
    chain: baseSepolia,
    address: "0x726c51fcAC027fF7C9eAaF830f88daF12199ddC5",
    abi: abi,
  });

  // for (let i = 0; i < Number(detail); i++) {
  //   id.push(i);
  // }

  // const eachAgreement = id.map((id) => {
  //   const { data, isLoading } = useReadContract({
  //     contract,
  //     method: "getAgreementDetails",
  //     params: [id],
  //   });
  // });

  // let id = [];
  // let agree;
  // console.log(id);

  // for (let i = 1; i < id.length; i++) {
  //   agree = id[i];
  // }

  // const { data: detail, isLoading: loadDetail } = useReadContract({
  //   contract,
  //   method: "agreementCount",
  // });

  // for (let i = 0; i <= Number(detail); i++) {
  //   id.push(i);
  // }

  // const { data, isLoading } = useReadContract({
  //   contract,
  //   method: "getAgreementDetails",
  //   params: [id],
  // });

  // console.log(id);
  // console.log(agree);

  const toggleAgreementModal = () => {
    setShowagreementModal(!showagreementModal);
  };
  const toggleSignModal = () => {
    setshowSignModal(!showagreementModal);
  };

  useEffect(() => {
    const mockAgreements = [
      {
        id: 1,
        creator: "Alice",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        secondPartyAddress: "0x123456789...",
      },
      {
        id: 2,
        creator: "Bob",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        secondPartyAddress: "0x987654321...",
      },
      {
        id: 2,
        creator: "Bob",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        secondPartyAddress: "0x987654321...",
      },
      {
        id: 2,
        creator: "Bob",
        content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        secondPartyAddress: "0x987654321...",
      },
    ];
    setAgreements(mockAgreements);

    // Simulate loading delay
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust delay time as needed
    setIsAdmin(true);
  }, []);

  // console.log(agreements);
  // console.log(eachAgreement);
  // console.log(Number(detail));

  return (
    <div className="w-full">
      <Navbar />

      <Modal
        isOpen={showagreementModal}
        onRequestClose={() => setShowagreementModal(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        contentLabel="Create New Agreement"
        style={{
          content: {
            width: "40%",
            height: "fit-content",
            margin: "auto",
            padding: "0px",
            borderRadius: "5px",
          },
        }}
      >
        <AgreementModal />
      </Modal>

      <h1 className="text-3xl text-center font-bold text-[#c92eff] my-4">
        My Agreements
      </h1>
      <div className="flex p-4 items-center justify-end gap-8">
        {/* Conditionally render buttons based on user's role */}
        {isAdmin ? (
          // If user is an admin with a wallet, show "Show All Agreements" button
          <button className="bg-[#1c0624] border border-[#c92eff] hover:bg-[#461853] text-white font-bold py-2 px-4 rounded">
            Sign agreement
          </button>
        ) : (
          <button className="bg-[#1c0624] border border-[#c92eff] hover:bg-[#461853] text-white font-bold py-2 px-4 rounded">
            Validate Agreement
          </button>
        )}

        <button
          className="bg-[#461853] hover:bg-[#1c0624] text-white font-bold py-2 px-4 rounded border-[#c92eff] border hover:border-none"
          onClick={toggleAgreementModal}
        >
          Create New Agreement
        </button>
      </div>

      <div className="w-full">
        {loading ? (
          // Show loading indicator if agreements are loading
          <div className="text-center py-8">
            <div className="loader ease-linear rounded-full border-8 border-t-8 bg-[#130316] border-gray-200 h-16 w-16 mx-auto"></div>
            <p className="mt-2">Loading agreements...</p>
          </div>
        ) : agreements.length === 0 ? (
          <div className="w-full">
            <p className="text-gray-600">No agreements found.</p>
            <button
              className="bg-[#461853] hover:bg-[#1c0624] text-white font-bold py-2 px-4 rounded border-[#c92eff] border hover:border-none"
              onClick={toggleAgreementModal}
            >
              Create New Agreement
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto w-[90%] mb-8">
            {agreements.map((agreement) => (
              <div key={agreement.id} className="">
                <CustomCard agreement={agreement} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AgreementList;
