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
      background: 'none',
    },

    filter: {
      background: 'rgba(0,0,0,0.1)'
    },

    mainContent: {
      background: '#151515',
      minHeight: '540px',
      height: '540px',
      marginBottom: '50px',
      width: '100%',
      '@media (max-width: 1000px)': {
        height: 'unset',
      },
    }
  })
)

type Props = {
  children: any,
  className?: string
}

const HeaderPart = (props: Props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <main>
      <Grid container direction="row" justifyContent="space-between" className={`${styles.root} ${classes.root}`}>

        <Grid item md={12} className={`pl-24 pr-24 pt-32 pb-24 ${styles.mainContent} ${classes.mainContent}`}>
          {children}
        </Grid>
      </Grid>
    </main>
  )
}

export default HeaderPart;
