require("@nomicfoundation/hardhat-toolbox");

const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const url = process.env.ALCHEMY_SEPOLIA_URL
const pvt_key = process.env.ACCOUNT_PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `${url}`,
      accounts: [`${pvt_key}`]
    }
  },
  paths: {
    artifacts: "./src/artifacts"
  }
};
