import Web3Modal from "web3modal";
import Web3 from "web3";
import { Button } from "@material-ui/core";
require("dotenv").config();

const providerOptions = {};
const web3Modal = new Web3Modal({
  network: "polygon", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

const connectWallet = async (setWeb3, setAccount) => {
  // clear cache to allow connecting to different wallet
  // if the user wants
  await web3Modal.clearCachedProvider();
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);

  const chainID = await web3.eth.getChainId();
  if (chainID !== 137) {
    alert("Please Switch to Polygon Mainnet to use this DApp");

    const params = {
      chainId: "0x89",
    };

    web3.eth.getAccounts((error, accounts) => {
      window.ethereum
        .request({
          method: "wallet_switchEthereumChain",
          params: [params],
        })
        .then((result) => {
          setWeb3(web3);
          setAccount(accounts[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  } else {
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }
};

const ConnectWallet = ({ setWeb3, setAccount }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        minHeight: "55px",
        maxWidth: "200px",
      }}
      onClick={() => connectWallet(setWeb3, setAccount)}
    >
      Connect Wallet{" "}
    </Button>
  );
};

export default ConnectWallet;
