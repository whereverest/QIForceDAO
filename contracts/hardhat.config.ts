import dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/types";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-abi-exporter";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.POLYGON_NODE_URL!,
      },
    },
    polygon: {
      url: process.env.POLYGON_NODE_URL!,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY!],
    },
  },
  mocha: {
    timeout: 200000,
  },
};

export default config;
