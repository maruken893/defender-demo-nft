const ABI = [`function safeMint(address to) public`];

const ADDRESS = ""; // ERC-721's contract address
const RECIPIENT = ""; // Realy address etc.

const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");

//Mints an NFT for a recipient
async function main(signer, recipient) {
  const nft = new ethers.Contract(ADDRESS, ABI, signer);
  const tx = await nft.safeMint(recipient);
  console.log(`Minted an NFT for ${recipient} in ${tx.hash}`);
}

// Entrypoint for the Autotask
exports.handler = async function (params) {
  const provider = new DefenderRelayProvider(params);
  const signer = new DefenderRelaySigner(params, provider, { speed: "fast" });
  console.log(`Using relayer ${await signer.getAddress()}`);
  await main(signer, RECIPIENT);
};
