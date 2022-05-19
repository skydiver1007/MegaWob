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
import Button from '@material-ui/core/Button';

import { getImg } from "../../../utils/Helper";

import FilterItem from "./../../molecules/FilterItem";

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
  })
)

type Props = {
  children: React.ReactNode,
  options: {title: string, filters: {name: string, value: string, enabled: boolean}[]}[],
  className?: string
}

const HeaderPart = (props: Props) => {
  const { children, options } = props;
  const classes = useStyles();

  return (
    <>
      {children}

      {options.map((option, index) => {
        return <FilterItem option={option} key={index}> </FilterItem>
      })}
    </>
  )
}

export default HeaderPart;
