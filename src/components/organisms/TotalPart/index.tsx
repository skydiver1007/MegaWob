import * as React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import type { LinkProps } from "react-router-dom";

import * as anchor from '@project-serum/anchor';
import { useConnection, useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { getImg } from "../../../utils/Helper";

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    }
  })
)

type Props = {
  children: any,
  className?: string,
  onClaimAll: any,
  totalStaked: any,
  totalCollected: any,
  totalNFT: any,
  stakeCount: any,
  unstakeCount: any,
  walletCollectedAmount: any
}

const TotalPart = (props: Props) => {
  const { children, onClaimAll, totalStaked, totalCollected, totalNFT, stakeCount, unstakeCount, walletCollectedAmount } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} sm={12}>
        <div className={`totalState ${styles.totalState}`}>
          <div className={`${styles.totalFurrsol}`}>
            <div className={`font-quick ${styles.totalCount}`}>{totalStaked}</div>
            <div className={`font-quick ${styles.totalPercent}`}>STAKED FURRSOLS</div>
            <div className={`font-quick ${styles.totalPercent}`}>{totalStaked}/1750 ({((totalStaked / 1750) * 100).toFixed(2)}%)</div>
          </div>
          <div className={`${styles.totalFluff}`}>
            <div className={`${styles.boxFluffCount}`}>
              <img className={`font-quick ${styles.fluffImage}`} src="/images/fluff.png" />
              <div className={`font-quick ${styles.totalCount}`}>{totalCollected.toFixed(2)}</div>
            </div>
            <div className={`font-quick ${styles.totalPercent}`}>COLLECTED $FLUFF</div>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={6} sm={12}>
        <div className={`walletState ${styles.walletState}`}>
          <div className={`${styles.walletFurrsol}`}>
            <div className={`font-quick ${styles.totalCount}`}>
              <span className={`${styles.activeText} ${styles.largeText}`}>{stakeCount}</span>
              <span className={`${styles.activeText} ${styles.normalText}`}>/{totalNFT}</span></div>
            <div className={`font-quick ${styles.totalPercent}`}>STAKED FURRSOLS</div>
          </div>
          <div className={`${styles.unstakeFurrsol}`}>
            <div className={`font-quick ${styles.totalCount}`}>
              <span className={`${styles.disableText} ${styles.largeText}`}>{unstakeCount}</span>
              <span className={`${styles.disableText} ${styles.normalText}`}>/{totalNFT}</span></div>
            <div className={`font-quick ${styles.totalPercent}`}>UNSTAKED FURRSOLS</div>
          </div>
          <div className={`${styles.totalFluff}`}>
            <div className={`${styles.boxFluffCount}`}>
              <img className={`font-quick ${styles.fluffImage}`} src="/images/fluff.png" />
              <div className={`font-quick ${styles.activeText} ${styles.largeText}`}>{walletCollectedAmount}</div>
            </div>
            <div className={`font-quick ${styles.totalPercent}`}>UNCLAIMED $FLUFF</div>
            <div className={`font-quick ${styles.btnClaim}`} onClick={onClaimAll}>COLLECT ALL</div>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default TotalPart;
