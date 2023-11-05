const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory('Upload')
  const upload = await Upload.deploy()

  await upload.waitForDeployment();

  console.log(`CONTRACT DEPLOYED AT ADDRESS : ${upload.target}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
