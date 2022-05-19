/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useEffect, useRef, useState } from "react";
import Countdown from 'react-countdown';

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import styles from './index.module.scss';
import { Button, Select, MenuItem } from "@material-ui/core";
import { useConnection } from "@solana/wallet-adapter-react";
import CONFIG from '../../../configs';
// const {PERIOD} = CONFIG;

import { array } from "prop-types";
const  { DAYTIME, PERIOD, REWARD } = CONFIG;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    title: {
      color: theme.palette.text.primary
    },
    nftName: {
      color: theme.palette.text.primary
    },
    nftAttribute: {
      color: theme.palette.text.secondary
    },
    fluff: {
      color: theme.syscolor.light
    },
    remainTime: {
      color: theme.palette.text.primary
    },
    furr: {
      color: theme.palette.text.primary,
      background: alpha(`${theme.syscolor.dark}`, 0.85)
    },
    furrImg: {
      width: '12px !important',
      height: '12px !important'
    }
    , collected: {
      color: '#00ffce'
    },
    lockTime: {
      color: '#00e3ff'
    },
    sel: {
      background: `#1B1B1B`,
      '& > * ': {
        paddingLeft: 5
      }
    }
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  day: number,
  perFurr: number
}

const CalendarItem = (props: any) => {
  const { className, day, perFurr } = props;
  const classes = useStyles();


  return (
    <div className={`${styles.boxCalendar}`}>
      <div className={`${styles.boxItems}`}>
        {
          [...Array(35)].map((ele, index) =>
            index < day ?
              <div className={`${styles.boxItemActive}`}></div>
              :
              index < 31 ?
                <div className={`${styles.boxItem}`}></div>
                :
                <div className={`${styles.boxItemDeactive}`}></div>
          )
        }
      </div>
      <div className={`font-quick ${styles.textTitle}`}>{day} DAYS</div>
      <div className={`font-quick ${styles.textPerFurrsol}`}>+{perFurr} $FLUFF per FurrSol</div>

    </div>
  )
}

export default CalendarItem;
