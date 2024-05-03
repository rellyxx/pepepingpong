'use client'
import { ethers } from "ethers";
import Progress from "~~/components/Progress";
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
  createAssociatedTokenAccount,
} from "@solana/spl-token";
import { notification } from "~~/utils/scaffold-eth";
import Button from "~~/components/Button";
import WalletContextProvider from "~~/components/WalletContextProvider";


// 配置连接到Solana集群
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');

// 请替换成你的程序 ID
const programID = new PublicKey('Axs9AjAtK7uvfU5nXnZP5CgSQRXZ6N9UWZgZhQsKR3HS');

const PINGMINT = process.env.PINGMINT;
const PONGMINT = process.env.PONGMINT;
const PINGPONGMINT = process.env.PINGPONGMINT;

const PepePing = () => {

  const [address, setAddress] = useState("");
  const [fee, setFee] = useState<bigint>(0n);
  const [totalMints, setTotalMints] = useState<bigint>(0n);
  const [totalSupply, setTotalSupply] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pingBalance, setPingBalance] = useState<number>(0);

  const [pingpongLoading, setPingPongLoading] = useState<boolean>(false);

  const wallet = useWallet();
  const [program, setProgram] = useState<Program<Idl> | null>(null);

  
  const [provider, setProvider] = useState<any>();


  useEffect(() => {
    if (wallet.connected) {
      const network = "https://api.devnet.solana.com";
      const connection = new Connection(network, "processed");
      const provider = new AnchorProvider(connection, wallet as any, {
        preflightCommitment: 'processed'
      });
      setProvider(provider);
      const programInstance = new Program<Idl>(idl as Idl, programID, provider);
      setProgram(programInstance);
    }
  }, [wallet.connected]);

  useEffect(() => {
    getMintState()
  }, [program])


  const getMintState = async () => {
    try {
      if (program && wallet.publicKey) {
        const [mintStatePDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("counter")],
          program.programId
        );
        const data = await program?.account.mintState.fetch(mintStatePDA);
        console.log('Total Mints:', data?.totalMints.toString());
        console.log('Fee:', data?.fee.toString());
        console.log('data:', data);
        setFee(data?.fee.toString());
        setTotalMints(data?.totalMints.toString());

        const [configPDA] = PublicKey.findProgramAddressSync(
          [Buffer.from("config")],
          program.programId
        );
        const config = await program.account.config.fetch(configPDA);
        const tokenMint = new PublicKey(config.pingMint);
        const supply = await connection.getTokenSupply(tokenMint);
        console.log('Total Supply:', supply.value.amount);
        setTotalSupply(parseInt(supply.value.amount))

      }

    } catch (error) {
      console.error('Failed to fetch MintState:', error);
    }
  }

  const handleChange = (e: any) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(ethers.isAddress(address));

    if (!ethers.isAddress(address)) {
      notification.info("Please enter a valid base wallet address.")
      return
    }
    setLoading(true);
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
        const config = await program.account.config.fetch(configPDA);

        const tokenMint = new PublicKey(config.pingMint);
        const evm_address = address;

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
          setLoading(false)
          notification.success("Success!")
        }

      } catch (error) {
        setLoading(false)
        console.error("Error in mintToken:", error);
      }

    }
  }


  const handleSubmitMintPingPong = async () => {

    // if (!ethers.isAddress(address)) {
    //   notification.info("Please enter a valid base wallet address.")
    //   return
    // }
    setPingPongLoading(true);
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
        const config = await program.account.config.fetch(configPDA);

        const tokenMint = new PublicKey(config.pingMint);
        const evm_address = address;
        
        const pingMint = new PublicKey("CB1mfdr1yyaqJWj57AQVmncCV2TmZuDFGHS8k5z6edqz");
        const pongMint = new PublicKey("ESNZThSNz6CuAq36yqbYeJK1tibzDr3CKHoFGi1XAbsE");
        const pingpongMint = new PublicKey("8j8tJHStnG6gSPUycTYvkJJTNZJvCCLJNaTRDFHDe8Qx");



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


        // The associated token account for the wallet
        const pingMintATA = await getAssociatedTokenAddress(
          pingMint,
          wallet.publicKey,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );
        console.log("PingMint TokenATA: ", pingMintATA);

        // The associated token account for the wallet
        const pongMintATA = await getAssociatedTokenAddress(
          pongMint,
          wallet.publicKey,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );
        console.log("PongMint TokenATA: ", pongMintATA);

        // The associated token account for the wallet
        const pingpongMintATA = await getAssociatedTokenAddress(
          pingpongMint,
          wallet.publicKey,
          false,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );
        console.log("PingPongMint TokenATA: ", pingpongMintATA);

          // Ensure ATA exists or create if not
        let pingAtaInfo = await provider.connection.getAccountInfo(pingMintATA);
        console.log("Ping ATAInfo: ", pingAtaInfo);
        let pongAtaInfo = await provider.connection.getAccountInfo(pongMintATA);
        console.log("Pong ATAInfo: ", pongAtaInfo);
        let pingpongAtaInfo = await provider.connection.getAccountInfo(
          pingpongMintATA
        );
        console.log("Ping Pong ATAInfo: ", pingpongAtaInfo);

        

        const instruction = await program.methods
          .mintPingpong()
          .accounts({
            wallet: wallet.publicKey,
            config: configPDA,
            pingMint: pingMint,
            pongMint: pongMint,
            pingpongMint: pingpongMint,
            pingTokenAta: pingMintATA,
            pongTokenAta: pongMintATA,
            pingpongTokenAta: pingpongMintATA,
            programAsSigner: programAsSignerPDA,
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
          setPingPongLoading(false)
          notification.success("Success!")
        }

      } catch (error) {
        setPingPongLoading(false)
        console.error("Error in mintToken:", error);
      }

    }
  }

  const getTokenBalance = async()=>{
    try {
      // 查询账户信息
    if(wallet.publicKey){

      const pingMint = new PublicKey("CB1mfdr1yyaqJWj57AQVmncCV2TmZuDFGHS8k5z6edqz");
      const pongMint = new PublicKey("ESNZThSNz6CuAq36yqbYeJK1tibzDr3CKHoFGi1XAbsE");
      const pingpongMint = new PublicKey("8j8tJHStnG6gSPUycTYvkJJTNZJvCCLJNaTRDFHDe8Qx");
      let ataAddrForPing = await getAssociatedTokenAddress(
        pingMint, // mint
        wallet.publicKey // owner
      );
      console.log(`ATA address: ${ataAddrForPing.toBase58()}`);
      let ataAddrForPong = await getAssociatedTokenAddress(
        pongMint, // mint
        wallet.publicKey // owner
      );
      console.log(`ATA address: ${ataAddrForPong.toBase58()}`);
      let ataAddrForPingPong = await getAssociatedTokenAddress(
        pingpongMint, // mint
        wallet.publicKey // owner
      );

      const accountInfo1 = await connection.getTokenAccountBalance(ataAddrForPing);
      // const accountInfo2 = await connection.getTokenAccountBalance(ataAddrForPong);
      // const accountInfo3 = await connection.getTokenAccountBalance(ataAddrForPingPong);

      console.log('accountInfo1',accountInfo1);
      setPingBalance(accountInfo1.value.uiAmount??0)
      // console.log('accountInfo2',accountInfo2);
      // console.log('accountInfo3',accountInfo3);

      
    }

  } catch (error) {
      console.error('Error fetching token balance:', error);
  }
  }


  useEffect(()=>{
    if(wallet.publicKey){
      getTokenBalance()
    }
  },[wallet.publicKey])



  return (
    <div className="min-w-[874px] w-full px-[18%]">
      <div className="my-[20px] rounded-lg py-[40px] px-[15px] bg-white/20 w-full">
        <Progress></Progress>
      </div>
      <div className="flex justify-between text-[20px] font-medium leading-[50px]">
        <div className="flex-1 bg-white  rounded-lg flex px-[20px] py-[30px] w-full">
          <div className=" border-r-2 border-[#e4e4e4] h-[50px] pr-[20px] mr-[20px]">Price:{ethers.formatUnits(fee, 10)} Sol</div>
          <div>Base wallet address</div>
          <div className="ml-[10px] w-1/2">
            <input
              autoFocus
              value={address}
              onChange={handleChange}
              placeholder="0x1a2b...3c4d"
              type="text"
              className="input-xs text-[16px] w-full leading-none border-b-2 border-black focus:outline-none"
            />
          </div>
        </div>
        {/* <div className="bg-white rounded-lg  flex px-[20px] py-[30px]">Total Price: 0.01 Solana</div> */}
      </div>
      <div className="font-medium text-[20px] text-right my-[20px]">
        <div className="mb-[10px]">Total Supply: {totalSupply}</div>
        <div className="mb-[10px]">Total mints: {totalMints.toString()}</div>
        <div >Ping Balance: {pingBalance}</div>
      </div>
      {/* <button 
          className={`btn cursor-pointer w-full h-[52px] bg-[#FCB335] hover:bg-[#fca635ee] border-0 text-[20px] font-medium 
          ${loading ? 'btn-disabled' : ''}`}
          onClick={handleSubmit} >
            <span className={`${loading ? 'loading loading-spinner' : ''}`}></span>
            Start Mint
        </button> */}


      <div className="flex flex-col gap-2">
        {/* <Button loading={loading} onClick={handleSubmit} text="Mint Ping"/> */}
        <button
          className={`btn cursor-pointer w-full h-[52px] bg-[#FCB335] hover:bg-[#FCB335] border-0 text-[20px] font-medium 
                  ${loading ? 'btn-disabled' : ''}`}
          onClick={handleSubmit} >
          <span className={`${loading ? 'loading loading-spinner' : ''}`}></span>
          Mint Ping
        </button>

        <button
          className={`btn cursor-pointer w-full h-[52px] bg-[#FCB335] hover:bg-[#FCB335] border-0 text-[20px] font-medium 
                  ${pingpongLoading ? 'btn-disabled' : ''}`}
          onClick={handleSubmitMintPingPong} >
          <span className={`${pingpongLoading ? 'loading loading-spinner' : ''}`}></span>
          Mint PingPong
        </button>
      </div>


    </div>
  );
}

export default PepePing
