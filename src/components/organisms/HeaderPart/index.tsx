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

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { getImg } from "../../../utils/Helper";

import styles from './index.module.scss'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    menu: {
      color: theme.palette.text.disabled,
      '&:hover': {
        color: theme.palette.text.primary
      }
    },
    active: {
      color: theme.palette.text.primary
    },
    wallet: {
      fontSize: '1.125rem',
      boxShadow: '0px 4px 0px rgba(0, 0, 0, 0.25)',
      background: theme.syscolor.light,
      color: theme.syscolor.dark,
      borderRadius: '5px',
      letterSpacing: '1.5px'
    }
  })
)

type Props = {
  children: React.ReactNode
  className?: string,
  menu: {node: React.ReactNode | string, url: string}[],
  logo: string
}

const CustomLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const classes = useStyles();

  return (
    <Link
      to={to}
      {...props}
      className={`${classes.menu} font-forward ${match && classes.active}`}
    >
      {children}
    </Link>
  );
}

const HeaderPart = (props: Props) => {
  const {menu, logo } = props;
  const classes = useStyles();

  return (
    <header
      className={`d-flex align-items-center justify-content-between pb-32 pt-48`}
    >
      <div className={`d-flex align-items-center justify-content-between`} >
        <div className={``}>
          <Link to='/'><img src={`./images/logo-primary.png`} className={`${styles.logo}`} /></Link>
        </div>
     
      </div>

      <div className={`d-flex align-items-center justify-content-center`} >
        <WalletMultiButton
          className={`font-quick  ${styles.wallet} ${classes.wallet}`}
        ></WalletMultiButton>
      </div>
    </header>
  )
}

export default HeaderPart;
