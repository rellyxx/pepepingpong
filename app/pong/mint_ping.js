const anchor = require("@project-serum/anchor");
const { SystemProgram, PublicKey, Transaction, Keypair, Connection } = require("@solana/web3.js");
const {
  TOKEN_PROGRAM_ID,
  Token,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction
} = require("@solana/spl-token");
// const idl = require("../target/idl/ping_pong.json");
const idl = require("../../contractConfig/ping_pong.json");

const fs = require("fs");
require('dotenv').config();

const connection = new Connection("https://api.devnet.solana.com", 'confirmed');
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const PROGRAMID = process.env.PROGRAMID;
const program = new anchor.Program(idl, PROGRAMID);
const PINGMINT = process.env.PINGMINT;
const pingMint = new PublicKey(PINGMINT);

const wallet = Keypair.fromSecretKey(
  Uint8Array.from(
    JSON.parse(fs.readFileSync("/home/ubuntu/.config/solana/id.json", "utf-8"))
  )
);

// Public keys for the PDA accounts
const [configPDA, configBump] = PublicKey.findProgramAddressSync(
  [Buffer.from("config")],
  program.programId
);

const [mintStatePDA, mintStateBump] = PublicKey.findProgramAddressSync(
  [Buffer.from("counter")],
  program.programId
);

const [programAsSignerPDA, programAsSignerBump] =
  PublicKey.findProgramAddressSync(
    [Buffer.from("signer")],
    program.programId
  );

async function getConfig() {
    const configAccount = await program.account.config.fetch(configPDA);
    return configAccount.treasury.toString();
}

const evm_address = "0x157205ecC9e990aFc0AAeD40588e3456f58097E3";

// Define the seeds and find the PDA for LastMintTime
const seed = Buffer.from("lastmint");
const [lastMintTimePDA, _] = PublicKey.findProgramAddressSync(
	  [seed, wallet.publicKey.toBuffer()],
	  program.programId
	);

async function mintPing() {

  const treasury = await getConfig()

  // The associated token account for the wallet
  const tokenATA = await getAssociatedTokenAddress(
    pingMint,
    wallet.publicKey,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  console.log("TokenATA: ", tokenATA);

  // Ensure ATA exists or create if not
  let ataInfo = await provider.connection.getAccountInfo(tokenATA);
  console.log("ATAInfo: ", ataInfo);

  try {
    console.log("Last mint time: ", lastMintTimePDA);
    console.log("Calling wallet: ", wallet.publicKey);
    console.log("Treasury: ", treasury);
    // Call the mintToken function from your Anchor program
    const tx = await program.methods
      .mintPing(evm_address)
      .accounts({
        wallet: wallet,
	lastMintTime: lastMintTimePDA,
        config: configPDA,
        pingMint: pingMint,
	tokenAta: tokenATA,
        programAsSigner: programAsSignerPDA,
        mintState: mintStatePDA,
        treasury: treasury,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      })
      .signers([wallet]) // Sign transaction with wallet
      .rpc()
      .then((txId) => {
      console.log("Transaction succeeded with ID:", txId);
      return txId; // Return the transaction ID
    })
    .catch((error) => console.error("Error in calling mintPing:", error));
  } catch (error) {
    console.error("Error minting token:", error);
  }
}

mintPing().then(() => console.log("Mint token process complete."));
