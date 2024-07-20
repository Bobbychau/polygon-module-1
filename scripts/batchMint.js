// Import required libraries
const { ethers } = require("hardhat");
require("dotenv").config();

// Function to batch mint tokens
async function batchMintTokens(privateKey, contractAddress, numTokens) {
  try {
    // Create a provider using the network URL
    const networkAddress = "https://ethereum-sepolia-rpc.publicnode.com";
    const provider = new ethers.providers.JsonRpcProvider(networkAddress);

    // Create a signer from the private key and provider
    const signer = new ethers.Wallet(privateKey, provider);

    // Get the contract factory and attach it to the signer
    const NFT = await ethers.getContractFactory("CuteDog", signer);
    const contract = await NFT.attach(contractAddress);

    // Call the mint function on the contract to mint 'numTokens' tokens
    await contract.mint(numTokens);

    // Log a message to the console to indicate that the tokens have been minted
    console.log(`${numTokens} tokens minted successfully.`);
  } catch (error) {
    console.error("Error minting tokens:", error);
    process.exit(1);
  }
}

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const contractAddress = "0x06902C86dddC02A4C6618FE74a9c4056A8C227d1";

  // Batch mint 5 tokens
  await batchMintTokens(privateKey, contractAddress, 5);
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});