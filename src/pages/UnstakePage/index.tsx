import React, { useMemo, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

import * as anchor from '@project-serum/anchor';
import { useConnection, useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { toast } from 'react-toastify';

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
// import Grid from '@material-ui/core/Grid';

import CONFIG from '../../configs';
import { METADATA_PROGRAM_ID_PUBLIC_KEY, SolanaClient, SolanaClientProps } from '../../helpers/solana';
import { sendTransactions, sleep } from '../../helpers/solana/connection';
import { getCurrentChainTime, getImg, getProvider, getValueFromTrait, makeATokenAccountTransaction } from '../../utils/Helper';
import { IDL } from '../../constants/megawob_staking';
import { getParsedNftAccountsByOwner } from '@nfteyez/sol-rayz';
import {
  PublicKey, SystemProgram,
} from '@solana/web3.js';

import PrimaryLayout from '../../components/Layout/PrimaryLayout';
import Navbar from "../../components/organisms/Navbar";

import StakeConfirmModal from '../../components/atoms/StakeConfirmModal';
import NftItem from '../../components/molecules/NftItem'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import SwiperCore, {
  Grid,
  Navigation,
  Pagination
} from 'swiper';
import styles from './index.module.scss';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useAppSelector } from '../../redux/hook'
import { useDispatch, useSelector } from "react-redux";
import { getFurrsols } from "../../redux/actions";
const { COMMITMENT, DAYTIME, TOKEN_ACCOUNT, TOKEN_MINT, DECIMAL, REWARD, VAULT } = CONFIG;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    infoList: {
      borderBottomColor: alpha(`${theme.syscolor.light}`, 0.1),
      borderBottomStyle: 'solid',
      borderBottomWidth: '1px'
    },
    info: {
      color: theme.palette.text.primary
    }
  })
)

const UnstakePage = () => {
  const { COLLECTION, UPDATE_AUTHORITY, PROGRAM_ID, CLUSTER_API, CREATOR_ADDRESS } = CONFIG;
  const classes = useStyles();
  const wallet = useAnchorWallet();
  const dispatch = useDispatch()
  const solanaClient = new SolanaClient({ rpcEndpoint: CLUSTER_API } as SolanaClientProps);

  const { connection } = useConnection();
  const store = useAppSelector((state) => state.global);
  const stakedFurrsols = store?.stakedFurrsols;
  const unstakedFurrsols = store?.unstakedFurrsols;
  const totalCollected = store.totalCollected;
  const walletCollected = store.walletCollected;
  const totalStaked = store.totalStaked;
  const totalNFT = store.totalNFT;
  const list = store.list;
  const dayEarning = store.dayEarning;
  const earnedFluff = store.earnedFluff;
  const [lengthStaked, setlengthStaked] = useState(0);
  const [lengthUnstaked, setLengthUnstaked] = useState(0);
  const [open, setOpen] = useState(false);
  const [curIndex, setCurIndex] = useState(0);
  const [curFur, setCurFur] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [loading, setLoading] = useState(false);
  const [timerID, setTimerID] = useState(0);
  const [walletNft, setWalletNft] = useState<any[]>([]);
  const [stakedNFT, setStakedNFt] = useState<any[]>();

  useEffect(() => {
    (async () => {
      if (!wallet) return;
      if (stakedFurrsols.length === 0 && unstakedFurrsols.length === 0) {
        setLoading(true);
        setLoadingText('Loading...');
        await getWalletNft();
        await getStakedNft();
        await timer();
        setLoading(false);
      }
    })()
  }, [wallet]);

  const timer = async () => {
    window.clearInterval(timerID)
    const timerId = window.setInterval(async () => {
      await getWalletNft()
      await getStakedNft();
    }, 180000);
    setTimerID(timerId);
  }

  const clearAllIntervals = (id: number) => {
    for (let i = 0; i < id; i++) window.clearInterval(i);
  }

  const getAllNftData = async (pubkey: string, name: string, creators: string[]) => {
    if (!wallet) return
    try {
      const nfts = await getParsedNftAccountsByOwner({
        publicAddress: pubkey,
        connection: connection
      });
      return nfts.filter((nft: any) => {
        if (nft.data !== undefined) {
          if (nft.data.creators !== undefined) {
            if (creators.indexOf(nft.data.creators[0].address) !== -1) {
              return true
            }
          }
        }
        return false;
      });
    } catch (error: any) {
      console.log(error);
      toast.error(`${error.message}`, { theme: 'dark' });
      setLoading(false)
    }
  }

  const getWalletNft = async () => {
    if (!wallet) return;
    const pubkey = wallet.publicKey.toString();
    try {
      const provider = getProvider();
      const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
      let [poolSignerAddr, _nonce_signer] = await anchor.web3.PublicKey.findProgramAddress(
        [Buffer.from('furrsol signer'), wallet.publicKey.toBuffer()],
        new PublicKey(program.programId)
      );
      const vaultKey = poolSignerAddr.toString();
      const walletNFTs = await getAllNftData(pubkey, COLLECTION, CREATOR_ADDRESS);
      const vaultNFTs = await getAllNftData(vaultKey, COLLECTION, CREATOR_ADDRESS);
      let totalNFTCount = (walletNFTs?.length || 0) + (vaultNFTs?.length || 0);
      setLengthUnstaked((vaultNFTs?.length || 0));
      setlengthStaked((walletNFTs?.length || 0))
      dispatch({
        type: 'GET_TOTAL_NFT',
        totalNFT: totalNFTCount,
      })
      let walletNft: any = [];
      walletNFTs?.map((nft: any) => {
        walletNft.push(
          {
            name: nft.data.name,
            mint: new PublicKey(nft.mint),
            uri: nft.data.uri
          }
        )
      })
      let walletNFT: any = [];
      let result = await solanaClient.getAllCollectiblesWithCreator([pubkey], CREATOR_ADDRESS)
      const currentTime = await getCurrentChainTime(connection);
      if (result[pubkey]) {
        for (let i = 0; i < result[pubkey].length; i++) {
          let nft = result[pubkey][i];
          let [pool, nonce] = await anchor.web3.PublicKey.findProgramAddress([
            Buffer.from('furrsol pool'), wallet.publicKey.toBuffer(), new PublicKey(nft.mint).toBuffer()
          ], program.programId);
          const info = await connection.getAccountInfo(pool);
          let day = 0;
          if (info !== null) {
            const poolInfo = await program.account.Pool.fetch(pool);
            day = (currentTime! - poolInfo.endTime) / DAYTIME;
          }
          const trait = nft.attributes?.find((trait: any) => trait.trait_type === 'Class');
          const passedTime = day;
          walletNFT.push(
            {
              name: nft.name,
              class: trait?.value,
              image: nft.image,
              mint: new PublicKey(nft.mint),
              tokenAccount: new PublicKey(nft.tokenAccount),
              canClaim: false,
              day: passedTime,
              fluff: 0,
              isStaked: false,
              type: 3
            }
          )
        }
      }
      dispatch({
        type: 'GET_UNSTACKED_FURRSOLS',
        unstakedFurrsols: walletNFT,
      })
    } catch (error: any) {
      toast.error(`${error.message}`, { theme: 'dark' });
      setLoading(false);
    }
  }

  const getStakedNft = async () => {
    if (!wallet) return;
    const provider = getProvider();
    const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
    let stakedNFTs: any = [];

    let [poolSignerAddr, _nonce_signer] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from('furrsol signer'), wallet.publicKey.toBuffer()],
      new PublicKey(program.programId)
    );

    let [poolDataAddr, _nonce_data] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from('furrsol data')],
      new PublicKey(program.programId)
    );
    try {
      const data = await program.account.Data.fetch(poolDataAddr);

      let reward = Number.parseFloat(data.reward.toString()) / DECIMAL;
      dispatch({
        type: 'GET_TOTAL',
        totalStaked: data.totalStakedCount,
        totalCollected: reward
      })
      let pubkey = poolSignerAddr.toString();
      let result = await solanaClient.getAllCollectiblesWithCreator([pubkey], CREATOR_ADDRESS)

      if (result[pubkey]) {
        result[pubkey].forEach((nft: any) => {
          const trait = nft.attributes?.find((trait: any) => trait.trait_type === 'Class');
          stakedNFTs.push(
            {
              name: nft.name,
              class: trait?.value,
              image: nft.image,
              mint: new PublicKey(nft.mint),
              tokenAccount: new PublicKey(nft.tokenAccount),
              isStaked: true,
              canClaim: false,
              day: 0,
              lockedDay: 0,
              fluff: 0,
              type: 0
            }
          )
        })
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`${error.message}`, { theme: 'dark' });
      setLoading(false);
    }
    await updateEachReward(stakedNFTs);
  }

  const updateEachReward = async (stakedNFT: any) => {
    if (!wallet) return;
    try {
      let updatedNFT: any = [];
      const provider = getProvider();
      const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
      const currentTime = await getCurrentChainTime(connection);
      let totalAmount: any = 0;
      let fType = 0;
      let sType = 0;
      let thType = 0;
      let myFluff = 0;
      for (let i = 0; i < stakedNFT.length; i++) {
        let nft = stakedNFT[i];
        let [pool, nonce] = await anchor.web3.PublicKey.findProgramAddress([
          Buffer.from('furrsol pool'), wallet.publicKey.toBuffer(), nft.mint.toBuffer()
        ], program.programId)
        const poolInfo = await program.account.Pool.fetch(pool);
        let fluff = 0;
        let index = poolInfo.poolType;
        switch (index) {
          case 0:
            fType++;
            break;
          case 1:
            sType++;
            break;
          case 2:
            thType++;
            break;
          default:
            break;
        }
        myFluff += Number.parseFloat(poolInfo.claimedAmount.toString()) / DECIMAL;
        if (poolInfo.isStaked) {
          let dayPassed = Math.floor((currentTime! - poolInfo.startTime) / DAYTIME);
          if (dayPassed < 0) dayPassed = 0;
          let curTime = currentTime! > poolInfo.endTime ? poolInfo.endTime : currentTime!;
          fluff = Math.floor(REWARD[index] * (curTime - poolInfo.lastUpdateTime) / DAYTIME);
          fluff = fluff > 0 ? fluff : 0;
          totalAmount += fluff;
          nft = {
            ...nft,
            fluff: fluff,
            day: dayPassed,
            canClaim: (dayPassed > 0 && fluff > 0),
            type: index
          }
        }
        updatedNFT.push(nft);
      }
      const dayEarning = fType * 5 + sType * 10 + thType * 17;
      let list: any[] = [fType, sType, thType];

      console.log("walletCollected: ", totalAmount);
      dispatch({
        type: 'GET_STACKED_FURRSOLS',
        stakedFurrsols: updatedNFT,
        walletCollected: totalAmount,
        dayEarning: dayEarning,
        list: list,
        earnedFluff: myFluff
      })

    } catch (error: any) {
      console.log(error);
      toast.error(`${error.message}`, { theme: 'dark' });
      setLoading(false);
      return;
    }
  }

  const onStake = async (nft: any, selType: number) => {
    if (!wallet) {
      return;
    }
    setLoading(true);
    setLoadingText('Staking...')
    clearAllIntervals(timerID);
    let nftAddress = nft.mint.toString();
    console.log("mint:", nftAddress);
    const provider: any = getProvider();
    const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
    let instructionSet: any = [];
    let signerSet: any = [];
    let instructions: any = [];
    let signers: any = [];
    let [poolSigner, nonce_signer] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol signer'), wallet.publicKey.toBuffer()
    ], program.programId);

    let [pool, nonce_pool] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol pool'), wallet.publicKey.toBuffer(), new PublicKey(nftAddress).toBuffer()
    ], program.programId);
    console.log("pool: ", pool.toString());
    let [poolData, nonce_data] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol data')
    ], program.programId);

    let [metadata, bumpMetadata] = await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
        nft.mint.toBytes()
      ],
      METADATA_PROGRAM_ID_PUBLIC_KEY
    );

    try {
      let result: any = await connection.getAccountInfo(poolSigner);
      if (result === null) {
        const instruction = await program.instruction.createPoolsigner(nonce_signer, {
          accounts: {
            poolSigner: poolSigner,
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId
          }
        });

        instructions.push(instruction);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`${error.message}`, { theme: 'dark' });
      setLoading(false)
    }

    try {
      let result = await connection.getAccountInfo(pool);
      if (result === null) {
        const instruction = await program.instruction.createPool(nonce_pool, {
          accounts: {
            pool: pool,
            user: wallet.publicKey,
            systemProgram: SystemProgram.programId,
            mint: new PublicKey(nftAddress)
          }
        });
        instructions.push(instruction);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`${error.message}`, { theme: 'dark' });
      setLoading(false)
    }
    let makeNftFromTokenAccount = await makeATokenAccountTransaction(connection, wallet.publicKey, wallet.publicKey, new PublicKey(nftAddress));
    if (makeNftFromTokenAccount.instructions.length !== 0) {
      instructions = [...instructions, ...makeNftFromTokenAccount.instructions];
      signers = [...signers, ...makeNftFromTokenAccount.signers];
    }

    let nftFrom = makeNftFromTokenAccount.tokenTo;

    let makeNftToTokenAccount = await makeATokenAccountTransaction(connection, wallet.publicKey, poolSigner, new PublicKey(nftAddress));

    if (makeNftToTokenAccount.instructions.length !== 0) {
      instructions = [...instructions, ...makeNftToTokenAccount.instructions];
      signers = [...signers, ...makeNftToTokenAccount.signers];
    }
    let nftTo = makeNftToTokenAccount.tokenTo;
    let index = selType;
    if (index === -1) {
      console.log("select right locktype");
      setLoading(false)
      return;
    }
    instructions.push(program.instruction.stake(index, {
      accounts: {
        user: wallet.publicKey,
        pool: pool,
        data: poolData,
        nftFrom: nftFrom,
        nftTo: nftTo,
        metadata: metadata,
        mint: new PublicKey(nftAddress),
        tokenProgram: TOKEN_PROGRAM_ID
      }
    }));

    instructionSet.push(instructions);
    signerSet.push(signers);
    console.log(timerID);
    window.clearInterval(timerID);
    try {
      const tx = await sendTransactions(connection, wallet, instructionSet, signerSet);
      if (tx.success) {
        let newStakedFurrsol = {
          ...nft,
          isStaked: true,
          type: index
        }
        let unstaked = unstakedFurrsols.filter((furrsol: any) => furrsol.mint !== nft.mint)
        let type = index;
        let newList = [];
        for (let i = 0; i < 3; i++) {
          if (i === type) newList.push((list[i] + 1));
          else newList.push(list[i]);
        }
        dispatch({
          type: 'STAKE',
          stakedFurrsols: [...stakedFurrsols, newStakedFurrsol],
          unstakedFurrsols: unstaked,
          totalStaked: totalStaked + 1,
          list: newList
        })
        toast.success("Staking Success", { theme: 'colored' });
        setLoading(false)
        window.clearInterval(timerID);
      } else {
        toast.error(`Staking Failed`, { theme: 'dark' });
        setLoading(false)
        window.clearInterval(timerID);
      }
    } catch (error) {
      toast.error(`Staking Failed`, { theme: 'dark' });
      setLoading(false)
      window.clearInterval(timerID);
    }
  }

  const onClaimAll = async () => {
    if (!wallet) return;
    setLoading(true);
    setLoadingText('Claiming all...')
    clearAllIntervals(timerID);
    const provider = getProvider();
    const program = new anchor.Program(IDL, new PublicKey(PROGRAM_ID), provider);
    let instructionSet: any = [];
    let signerSet: any = [];
    let instructions: any = [];
    let signers: any = [];



    let [poolData, nonce_data] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol data')
    ], program.programId);

    let [vault, nonce_vault] = await anchor.web3.PublicKey.findProgramAddress([
      Buffer.from('furrsol vault')
    ], program.programId);
    let makeRewardAtaTx: any;

    try {
      makeRewardAtaTx = await makeATokenAccountTransaction(connection, wallet.publicKey, wallet.publicKey, new PublicKey(TOKEN_MINT));
      if (makeRewardAtaTx.instructions.length !== 0) {
        instructions = [...makeRewardAtaTx.instructions];
        signers = [...makeRewardAtaTx.signers];
      }
    } catch (error: any) {
      console.log(error);
      toast.error(`${error.message}`, { theme: 'dark' });
      setLoading(false)

      return
    }
    instructionSet.push(instructions);
    signerSet.push(signers);
    instructions = [];
    signers = [];
    let tokenTo = makeRewardAtaTx.tokenTo;
    let tokenFrom = new PublicKey(TOKEN_ACCOUNT);
    let txCount = 0;

    for (let i = 0; i < stakedFurrsols.length; i++) {
      let furrsol = stakedFurrsols[i];
      if (furrsol.canClaim) {
        txCount++;
        let [pool, nonce_pool] = await anchor.web3.PublicKey.findProgramAddress([
          Buffer.from('furrsol pool'), wallet.publicKey.toBuffer(), furrsol.mint.toBuffer()
        ], program.programId);
        let [metadata, bumpMetadata] = await PublicKey.findProgramAddress(
          [
            Buffer.from('metadata'),
            METADATA_PROGRAM_ID_PUBLIC_KEY.toBytes(),
            furrsol.mint.toBytes()
          ],
          METADATA_PROGRAM_ID_PUBLIC_KEY
        );
        instructions.push(program.instruction.claim(nonce_vault, {
          accounts: {
            user: wallet.publicKey,
            pool: pool,
            data: poolData,
            vault: vault,
            tokenFrom: tokenFrom,
            tokenTo: tokenTo,
            metadata: metadata,
            tokenProgram: TOKEN_PROGRAM_ID
          }
        }));
        if (i % 4 === 3) {
          instructionSet.push(instructions);
          signerSet.push([]);
          instructions = [];
          signers = [];
        }
      }
    }

    if (instructions.length !== 0) {
      instructionSet.push(instructions);
      signerSet.push(signers);
    }
    if (instructionSet.length !== 0 && txCount > 0) {
      try {
        const tx = await sendTransactions(connection, wallet, instructionSet, signerSet);
        if (tx.success) {
          let claimed = 0;
          let newStaked = stakedFurrsols.map((furrsol: any) => {
            claimed += furrsol.fluff
            return {
              ...furrsol,
              canClaim: false,
              fluff: 0
            }
          })

          dispatch({
            type: 'CLAIM',
            stakedFurrsols: newStaked,
            walletCollected: walletCollected - claimed,
            totalCollected: totalCollected + claimed
          })
          toast.success(`Claim success`, { theme: 'colored' });
          setLoading(false)
          window.clearInterval(timerID);
          return
        }
      } catch (error: any) {
        console.log(error);
        toast.error(`${error.message}`, { theme: 'dark' })
        setLoading(false);
        return

      }
    } else {
      console.log("no furrsol to claim");
      toast.warn("Can't claim", { theme: 'dark' });

      setLoading(false)
      window.clearInterval(timerID);
      return;
    }
  }

  const getProvider = () => {
    if (wallet)
      return new anchor.Provider(connection, wallet as anchor.Wallet, COMMITMENT as anchor.web3.ConfirmOptions);
  }

  const onHandleClose = () => {
    setOpen(false);
  }

  const onHandleOpen = (selType: number, index: number) => {
    setOpen(true);
    setCurIndex(selType);
    setCurFur(index);
  }

  const onHandleConfirm = async () => {
    let curFurrsol = curFur;
    let furrsol = unstakedFurrsols[curFurrsol];
    setOpen(false);
    console.log('furrsol', furrsol)
    console.log('curFurrsol', curFurrsol)
    await onStake(furrsol, curIndex)
  }
  return (
    <>
      {/* {
        loading ?
          <div id="preloader">
            {<div style={{ paddingTop: '150px', fontSize: '50px' }}>{loadingText}</div>}
          </div> :
          <div id="preloader" style={{ display: 'none' }}></div>
      }
      {true && */}
      <PrimaryLayout>
        <Navbar></Navbar>
        <div className={styles.title}>STAKING FOR $WOB</div>
        {/* <WalletMultiButton></WalletMultiButton> */}
        <StakeConfirmModal open={open} onClose={onHandleClose} info={unstakedFurrsols[curFur]} index={curIndex} onConfirm={onHandleConfirm} />

        <Swiper
          spaceBetween={25}
          // slidesPerView={5}
          breakpoints={{
            700: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1100: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1366: {
              slidesPerView: 5,
              spaceBetween: 25,
            },
            1600: {
              slidesPerView: 6,
              spaceBetween: 25,
            },
            1800: {
              slidesPerView: 7,
              spaceBetween: 25,
            },
            2000: {
              slidesPerView: 8,
              spaceBetween: 25,
            },
            2200: {
              slidesPerView: 9,
              spaceBetween: 25,
            },
          }}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <>
            {unstakedFurrsols.map((nft: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <NftItem
                    info={nft}
                    onOpen={(selType: number) => onHandleOpen(selType, index)}
                    onClicks={[async (selType: number) => await onStake(nft, selType)]}
                  />
                </SwiperSlide>
              )
            }
            )}
          </>
        </Swiper>
      </PrimaryLayout>

      {/* } */}
    </>

  )
}

export default UnstakePage;
