/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useMemo, useEffect, useRef, useState } from "react";
import Countdown from 'react-countdown';

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import { getCurrentChainTime, getImg } from "../../../utils/Helper";

import UnstakeButton from "../../atoms/UnstakeButton"
import StakeButton from "../../atoms/StakeButton"
import CollectButton from "../../atoms/CollectButton"
import DespawnButton from "../../atoms/DespawnButton"
import ReceiveButton from "../../atoms/ReceiveButton"
import PercentBar from "../../atoms/PercentBar"

import DetailModal from './../../../components/molecules/DetailModal/';

import styles from './index.module.scss';
import { Button, Select, MenuItem } from "@material-ui/core";
import { useConnection } from "@solana/wallet-adapter-react";
import CONFIG from '../../../configs';
const { DAYTIME, PERIOD, REWARD } = CONFIG;

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
  info: {
    image: string,
    title: string,
    fluff: number,
    attr: any,
    remainTime: number,
    spawnState: number
  }
}

const NftItem = (props: any) => {
  const { className, info, onClicks } = props;
  const classes = useStyles();
  const { connection } = useConnection()
  const [text, setText] = useState('STAKE');
  const [canUnstake, setCanUnstake] = useState(false);
  const [canStake, setCanStake] = useState(false);
  const [remainDay, setRemainDay] = useState(0);
  const [selType, setSelType] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (info.isStaked) {
        setText('UNSTAKE');
        let day = PERIOD[info.type] - info.day;
        setRemainDay(day);
        if (day <= 0) {
          setCanUnstake(true);
        }
      } else {
        if (info.day === 0 || info.day >= 2) {
          setCanStake(true);
          setRemainDay(0);
        } else if (info.day > 0 && info.day < 2) {
          let remainDay = 2 - Math.floor(info.day);
          setRemainDay(remainDay);
        }
      }
    })();
  }, [props]);

  const handleChange = (e: any) => {
    setSelType(e.target.value)
    setOpen(false);
    if (canStake) {
      setSelType(e.target.value);
    }
  }
  const handleStake = (e: any) => {
    console.log(e);
    e.preventDefault();
    props.onOpen(selType);
  }

  const handleUnstake = (e: any) => {
    console.log(e);
    e.preventDefault();
    props.onOpen();
  }

  const handleSelect = (e: any) => {
    setOpen(!open);
  }
  return (<>
    {
      info.type !== undefined ?

        <div className={'box_image'}>
          <div className={`imageWrapper`}>
            <div className={`imageOver`}>
              <img src={info.image} alt="Furrsol Image" />
            </div>
          </div>

          <div className={`content ${styles.nftContent}`}>
            <p className={`font-quick ${styles.nftName} ${classes.nftName}`}>{info.name}</p>
            <p className={`font-quick ${styles.nftAttribute} ${classes.nftAttribute}`}>Class: {info.class}</p>
            <span className={`font-quick ${styles.nftAttribute} ${classes.nftAttribute}`}>Collected $FLUFF: </span><span className={`font-quick ${classes.collected} ${styles.nftAttribute} ${classes.nftAttribute}`}>{Math.round(info.fluff * 100) / 100}</span>
            <br></br>
            <span className={`font-quick ${styles.nftAttribute} ${classes.nftAttribute}`}>{info.isStaked ? `Locked: ${PERIOD[info.type]} days` : `Staking Cooldown: ${remainDay} days`}</span><span className={`font-quick ${classes.lockTime} ${styles.nftAttribute} ${classes.nftAttribute}`}>{info.isStaked ? (` (${remainDay} remaining)`) : ''}</span>
            {
              info.isStaked ?
                <div className="d-flex  justify-content-between staked_box">
                  <UnstakeButton
                    enabled={canUnstake}
                    fullWidth={false}
                    className={canUnstake ? `${styles.nftClaim}` : `${styles.nftButton}`}
                    onClick={(e) => handleUnstake(e)}
                  >{text}</UnstakeButton>

                  <UnstakeButton
                    enabled={info.canClaim}
                    className={`${styles.nftButton} ${styles.claim_btn}`}
                    onClick={onClicks[1]}
                  >{'COLLECT FLUFF'}</UnstakeButton>
                </div> : info.type && <div className={`"d-flex justify-content-between unstaked_box" ${styles.unstaked_box}`}>
                  <Select className={classes.sel} disabled={!canStake} value={selType} onClick={(e) => handleSelect(e)} onChange={(e) => handleChange(e)} open={open} >
                    <MenuItem value={0}>{'7 days'}</MenuItem>
                    <MenuItem value={1}>{'14 days'}</MenuItem>
                    <MenuItem value={2}>{'21 days'}</MenuItem>
                  </Select>
                  <StakeButton
                    enabled={canStake}
                    fullWidth={false}
                    className={`${styles.nftButton} ml-16`}
                    onClick={(e) => handleStake(e)}
                  >{text}</StakeButton>
                </div>
            }


          </div>

          {/* </Grid> */}
          {/* </Grid> */}
        </div> : <div>
        </div>}
  </>
  )
}

export default NftItem;
