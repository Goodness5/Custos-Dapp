/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { baseSepolia } from "thirdweb/chains";
import abi from "../../../utils/agreementAbi.json";
import { client } from "@/utils/thirdwebclient";
import { createWallet } from "thirdweb/wallets";
import { useSendTransaction } from "thirdweb/react";
import {
  getContract,
  sendTransaction,
  waitForReceipt,
  prepareContractCall,
} from "thirdweb";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Modal } from "@mui/material";
import SignAgreementModal from "./signagreementmodal";
import { useActiveWallet } from "thirdweb/react";
 

export default function CustomCard({ agreement }) {
  const [showSignModal, setshowSignModal] = useState(false);
  const [isSigner, setIsSigner] = useState(false);
  const [isValidator, setIsValidator] = useState(false);

  const contract = getContract({
    client,
    chain: baseSepolia,
    address: "0x726c51fcAC027fF7C9eAaF830f88daF12199ddC5",
    abi: abi,
  });

  const validatesignature = prepareContractCall({
    contract,
    method: "validateSignature",
    params: agreement.id,
  });
  const toggleSignModal = () => {
    setshowSignModal(!showSignModal);
  };


  const wallet = useActiveWallet();

  useEffect(() => {
    
    validateCheck();
 
  }, [])
  
  const validateCheck = () => {
    if (agreement.firstParty === wallet?.getAccounts().address) {
      setIsSigner(false);
      setIsValidator(true);
    } else if (agreement.secondParty === wallet?.getAccounts().address) {
      setIsValidator(false);
      setIsSigner(true);
    } else {
      setIsSigner(false);
      setIsValidator(false);
    }
  };

  const handleValidate = ()=>{

  }


  return (
    <Card
      sx={{
        border: "2px solid #20071c",
        background: "#130316",
        transition: "transform 0.4s",
        borderRadius: "10px",
        "&:hover": { border: "2px solid purple", background: "#130319" },
      }}
    >
      <Modal
        isOpen={showSignModal}
        onRequestClose={() => setshowSignModal(false)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        contentLabel="Sign Agreement"
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
        <SignAgreementModal agreementid={agreement.id} />
      </Modal>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ color: "white" }}
          >
            Agreement ID: {agreement.id}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            Creator: {agreement.creator}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            Content: {agreement.content}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ color: "white" }}
          >
            Second Party Address: {agreement.secondPartyAddress}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "center" }}>
      <Button
  onClick={isSigner ? toggleSignModal : isValidator ? handleValidate : null}
  size="small"
  className={`bg-[#461853] hover:bg-[#1c0624] text-white font-bold py-2 px-4 rounded border-[#c92eff] border ${
    isSigner || isValidator ? "hover:border-none" : "opacity-50 cursor-not-allowed"
  }`}
  disabled={!isSigner && !isValidator}
>
  {isSigner ? "Sign Agreement" : isValidator ? "Validate" : "Disabled"}
</Button>

        <Button size="small" color="primary">
          Print
        </Button>
      </CardActions>
    </Card>
  );
}
