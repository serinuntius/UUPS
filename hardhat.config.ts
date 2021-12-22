import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";

import { HardhatUserConfig } from "hardhat/config";

import '@openzeppelin/hardhat-upgrades';

const config: HardhatUserConfig = {
    solidity: "0.8.4",
    defaultNetwork: "localhost",
    networks: {
        localhost: {
            url: "http://localhost:8545",
        },
    },
};

export default config;