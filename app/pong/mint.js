// export const ANCHOR_PROVIDER_URL = ''
const ANCHOR_PROVIDER_URL="https://api.devnet.solana.com"
const anchor = require("@project-serum/anchor");
const {
    SystemProgram,
    PublicKey,
    Transaction,
    Keypair,
} = require("@solana/web3.js");
const {
    TOKEN_PROGRAM_ID,
    // Token,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    createAssociatedTokenAccountInstruction,
} = require("@solana/spl-token");
const idl = require("../../contractConfig/ping_pong.json");
const fs = require("fs");

// Connection to the cluster
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const PROGRAMID = "7qXzPfYDn3XzHdqhRQorZ7aUXxweyqKatKFnFAMdE5xp";
const program = new anchor.Program(idl, PROGRAMID);

async function mintToken() {
console.log("provider",provider);

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

    // The config account should already exist and contain the address of the token_mint
    const config = await program.account.config.fetch(configPDA);
    const tokenMint = new PublicKey(config.tokenMint);

    const treasury = new PublicKey(config.treasury); // Treasury address from config
    console.log("Treasury is: ", treasury);
    const evm_address = "0x157205ecC9e990aFc0AAeD40588e3456f58097E3";

    // The associated token account for the wallet
    const tokenATA = await getAssociatedTokenAddress(
        tokenMint,
        treasury,//
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
    console.log("TokenATA: ", tokenATA);

    // Ensure ATA exists or create if not
    let ataInfo = await provider.connection.getAccountInfo(tokenATA);
    console.log("ATAInfo: ", ataInfo);

    try {
        // Call the mintToken function from your Anchor program
        const tx = await program.methods
            .mintToken(evm_address)
            .accounts({
                wallet: treasury.publicKey,//
                config: configPDA,
                tokenMint: tokenMint,
                tokenAta: tokenATA,
                programAsSigner: programAsSignerPDA,
                mintState: mintStatePDA,
                treasury: treasury.publicKey,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
            })
            .signers([treasury]) // Sign transaction with wallet
            .rpc()
            .then((txId) => {
                console.log("Transaction succeeded with ID:", txId);
                return txId; // Return the transaction ID
            })
            .catch((error) =>
                console.error("Error initializing the program:", error)
            );

        console.log("Transaction successful, signature:", tx);
    } catch (error) {
        console.error("Error minting token:", error);
    }
}

mintToken().then(() => console.log("Mint token process complete."));
