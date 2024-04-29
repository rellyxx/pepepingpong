"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import { Program, web3, AnchorProvider } from '@project-serum/anchor';
import idl from '../../contractConfig/ping_pong.json';
import { Idl } from '@project-serum/anchor';

import {
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
} from "@solana/spl-token";

// 配置连接到Solana集群
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

// 请替换成你的程序 ID
const programID = new PublicKey('EACyW9Kfsob4PDdAv9XWMCSZHagGFes5Y28FzgfED8oQ');

const MintTokenComponent: React.FC = () => {
    const wallet = useWallet();
    const [program, setProgram] = useState<Program<Idl> | null>(null);
    useEffect(() => {
        if (wallet.connected) {
            const network = "https://api.devnet.solana.com";
            const connection = new Connection(network, "processed");
            const provider = new AnchorProvider(connection, wallet as any, {
                preflightCommitment: 'processed'
            });
            const programInstance = new Program<Idl>(idl as Idl, programID, provider);
            setProgram(programInstance);
        }
    }, [wallet.connected]);

    const mintToken = useCallback(async () => {

        if (program && wallet.publicKey) {
            try {
                const [configPDA] = PublicKey.findProgramAddressSync(
                    [Buffer.from("config")],
                    program.programId
                );

                const [mintStatePDA] = PublicKey.findProgramAddressSync(
                    [Buffer.from("counter")],
                    program.programId
                );

                const [programAsSignerPDA] = PublicKey.findProgramAddressSync(
                    [Buffer.from("signer")],
                    program.programId
                );

                async function getConfig() {
                    const configAccount = await program?.account.config.fetch(configPDA);
                    return configAccount?.treasury.toString();
                }

                const treasury = await getConfig()


                // const tokenMint = new PublicKey("AYusn7ZW9w29iD2UcUxGinEWVMdfx1KcY25dX7MGPKhF");

                const config = await program.account.config.fetch(configPDA);
                console.log("config",config);
                
                const tokenMint = new PublicKey(config.pingMint);
                
                console.log("tokenMint",tokenMint);


                const evm_address = "0x157205ecC9e990aFc0AAeD40588e3456f58097E3";

                const tokenATA = await getAssociatedTokenAddress(
                    tokenMint,
                    wallet.publicKey,
                    false,
                    TOKEN_PROGRAM_ID,
                    ASSOCIATED_TOKEN_PROGRAM_ID
                );

                const seed = Buffer.from("lastmint");
                const [lastMintTimePDA, _] = PublicKey.findProgramAddressSync(
                    [seed, wallet.publicKey.toBuffer()],
                    program.programId
                );

                console.log({
                    wallet: wallet.publicKey,
                    lastMintTime: lastMintTimePDA,
                    config: configPDA,
                    pingMint: tokenMint,
                    tokenAta: tokenATA,
                    programAsSigner: programAsSignerPDA,
                    mintState: mintStatePDA,
                    treasury: treasury,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                });
                


                

                const instruction = await program.methods
                    .mintPing(evm_address)
                    .accounts({
                        wallet: wallet.publicKey,
                        lastMintTime: lastMintTimePDA,
                        config: configPDA,
                        pingMint: tokenMint,
                        tokenAta: tokenATA,
                        programAsSigner: programAsSignerPDA,
                        mintState: mintStatePDA,
                        treasury: treasury,
                        tokenProgram: TOKEN_PROGRAM_ID,
                        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                        systemProgram: SystemProgram.programId,
                    }).instruction();




                // 创建交易对象
                const transaction = new web3.Transaction().add(instruction);


                transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
                transaction.feePayer = wallet.publicKey;
                console.log(await connection.simulateTransaction(transaction));
                if (typeof wallet.signTransaction === 'function') {
                    let signedTx = await wallet.signTransaction(transaction);
                    const signature = await connection.sendRawTransaction(signedTx.serialize());
                    console.log("signature ====>", signature);
                }

                // // 签名并发送交易
                // let signature = await web3.sendAndConfirmTransaction(
                //     connection,
                //     transaction,
                //     [wallet.publicKey],  // 这里假设钱包已加载，并且是交易的签名者
                //     { commitment: 'confirmed' }
                // );
            
                // console.log('Transaction signature', signature);

                // const signature = await sendTransaction(transaction, connection);
                // await connection.getTransaction(signature, { commitment: 'confirmed' });




                // // 发送交易
                // const { blockhash } = await program.provider.connection.getLatestBlockhash();
                // transaction.recentBlockhash = blockhash;
                // transaction.feePayer = wallet.publicKey;

                // // 确认钱包适配器支持签名
                // if (typeof wallet.signTransaction === 'function') {
                //     const signedTransaction = await wallet.signTransaction(transaction);
                //     const signature = await program.provider.connection.sendRawTransaction(signedTransaction.serialize());

                //     // 确认交易
                //     await program.provider.connection.confirmTransaction(signature, 'processed');
                //     console.log("Transaction confirmed with signature:", signature);
                // } else {
                //     console.error("Error: Wallet does not support signTransaction");
                // }

            } catch (error) {
                console.error("Error in mintToken:", error);
            }
        }
    }, [program, wallet.publicKey]);

    return (
        <div>
            <button onClick={mintToken} disabled={!wallet.connected}>
                Mint Token
            </button>
        </div>
    );
};

export default MintTokenComponent;
