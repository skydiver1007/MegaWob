import React, { useMemo, useEffect, useRef, useState } from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';

import { getImg } from "../../../utils/Helper";

import StakeButton from "../../atoms/StakeButton";

import activedFurr from '../../../assets/images/icons/furrsol-active.png'
import disabledFurr from '../../../assets/images/icons/furrsol-active-disabled.png'

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    content: {
      background: '#0E1B1A',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: alpha(`${theme.syscolor.light}`, 0.1)
    },
    title: {
      color: theme.palette.text.primary
    },
    infoTable: {

    },
    light: {
     color: theme.syscolor.light 
    },
    primary: {
      color: theme.palette.text.primary
    },
    neutral: {
      color: theme.syscolor.neutral 
    },
    menuItem: {
      background: 'none',
      color: theme.syscolor.neutral,
      '&*': {
        background: 'none',
      }
    },
    select: {
      background: 'none',
      color: theme.palette.text.primary
    }
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  openModal: boolean,
  info: {
    image: string,
    title: string,
    fluff: number,
    attr: any,
    remainTime: number,
    spawnState: number
  },
}

const UpgradeModal = (props: Props) => {
  const { className, setOpenModal, openModal, info } = props;
  const classes = useStyles();

  const handleClose = () => {
    setOpenModal(false)
  }
  
  useEffect(() => {
    (async () => {

    })();
  }, []);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={`${styles.root} ${classes.root}`}
    >
      <div className={`${styles.content} ${classes.content}`}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item md={4}>
            <div className={`imageWrapper`}>
                <div className={`imageOver`}>
                  <img src={getImg(info.image)} alt="Right Responsive image" />
                </div>
            </div>

            <div className='d-flex align-items-center col-12 mt-16'>
              <span className={`${classes.primary}`}>Attributes</span>
            </div>

            <div className={`col-12 mt-8`}>
              <table className={`col-12 ${styles.infoTable}`}>
                <tbody>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Hunger</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>110 <span className={`${classes.light}`}>&#8594; 120 </span></td>
                  </tr>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Sleep</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>104<span className={`${classes.light}`}> &#8594; 120</span></td>
                  </tr>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>103</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>104<span className={`${classes.light}`}> &#8594; 120</span></td>
                  </tr>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Fun</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>104<span className={`${classes.light}`}> &#8594; 120</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className='d-flex align-items-center col-12 mt-16'>
              <span className={`${classes.primary}`}>Upgrades (2 of 6)</span>
            </div>

            <div className='d-flex align-items-center col-12 mt-8'>
              <img src={getImg('images/icons/furrsol-active.png')} className={`mr-8 ${styles.upgrade}`} />
              <img src={getImg('images/icons/furrsol-active.png')} className={`mr-8 ${styles.upgrade}`} />
              <img src={getImg('images/icons/furrsol-active-disabled.png')} className={`mr-8 ${styles.upgrade}`} />
              <img src={getImg('images/icons/furrsol-active-disabled.png')} className={`mr-8 ${styles.upgrade}`} />
              <img src={getImg('images/icons/furrsol-active-disabled.png')} className={`mr-8 ${styles.upgrade}`} />
              <img src={getImg('images/icons/furrsol-active-disabled.png')} className={`mr-8 ${styles.upgrade}`} />
            </div>
          </Grid>

          <Grid item md={1}></Grid>

          <Grid item md={6} className="d-flex align-content-center justify-content-between flex-flow-wrap text-center">
            <p className='col-12 white'>
              Select a FurrSol to Devour
            </p>
            <div className='col-12 pt-16'>
              <FormControl fullWidth size="small" variant="outlined">
                <Select
                  value={`315`}
                  className={`${classes.select}`}
                >
                  <MenuItem value={`315`} className={`${classes.menuItem}`}>FurrSols #315</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className='col-12'>
              <p className={`pt-32 ${classes.neutral} ${styles.descript}`}>Attributes Increase: <span className={`${classes.light}`}>9%</span> of attributes from FurrSol selected Required FLUFF: <span className={`${classes.light}`}>3000</span></p>
              <p className={`pt-32 font-700 ${classes.neutral} ${styles.descript}`}>WARNING: FurrSol selected will be burned.</p>
            </div>
            <div className={`col-12 pt-32`}>
              <StakeButton
                  className={`font-sm line-height-1 pt-8 pr-16 pb-8 pl-16`}
                  onClick={() => {}}
                  fullWidth={false}
              >
                CONFIRM UPGRADE
              </StakeButton>
            </div>
          </Grid>

          <Grid item md={1}></Grid>

        </Grid>
        <div className={`mt-16 mr-16 ${styles.close}`}><CloseIcon className={`${classes.primary}`} onClick={handleClose}/></div>
      </div>
    </Modal>
  )
}

export default UpgradeModal;
