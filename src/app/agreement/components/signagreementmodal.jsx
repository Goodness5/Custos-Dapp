/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import {
  getContract,
  sendTransaction,
  waitForReceipt,
  prepareContractCall,
} from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import abi from "../../../utils/agreementAbi.json";
import { client } from "@/utils/thirdwebclient";
import { createWallet } from "thirdweb/wallets";
import { useSendTransaction } from "thirdweb/react";

const SignAgreementModal = ({ agreementid }) => {
  const contract = getContract({
    client,
    chain: baseSepolia,
    address: "0x726c51fcAC027fF7C9eAaF830f88daF12199ddC5",
    abi: abi,
  });

  const [secondPartyValidId, setSecondPartyValidId] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { mutate: sendTransaction, isPending } = useSendTransaction();
    // Logic to submit agreement details
    const signAgreement = prepareContractCall({
      contract,
      method: "signAgreement",
      params: [agreementid, secondPartyValidId],
    });
    sendTransaction({
      signAgreement,
    });
  };

  return (
    <div className="bg-[#130316] w-full h-full py-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            htmlFor="firstPartyValidId"
            className="block text-sm font-medium text-[#c92eff]"
          >
            Signer&apos;s Valid ID
          </label>
          <input
            type="text"
            id="firstPartyValidId"
            name="firstPartyValidId"
            value={secondPartyValidId}
            onChange={(e) => setSecondPartyValidId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#c92eff] text-[#090909] focus:border-[#c92eff] sm:text-sm p-3"
          />
        </div>
        <button
          type="submit"
          className="bg-[#c92eff] w-fit rounded-lg hover:bg-[#090909] text-white font-bold py-2 px-4 border-2 border-[#c92eff] font-san hover:border-[#c92eff] inline-flex justify-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c92eff]"
        >
          {isPending ? "Signing" : "Sign Agreement"}
        </button>
      </form>
    </div>
  );
};

export default SignAgreementModal;
