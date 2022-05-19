import React, { useMemo, useEffect, useRef, useState } from "react";
import Countdown from 'react-countdown';

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';

import { getImg } from "../../../utils/Helper";

import StakeButton from "../../atoms/StakeButton";

import UpgradeModal from './../UpgradeModal';

import activedFurr from '../../../assets/images/icons/furrsol-active.png'
import disabledFurr from '../../../assets/images/icons/furrsol-active-disabled.png'

import styles from './index.module.scss';

interface MintCountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

const renderCountdown = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: MintCountdownRender) => {
  if (completed) {
    return '';
  } else {
    return (
      <>
         {days < 10 ? `0${days}` : days} : {hours < 10 ? `0${hours}` : hours} : {minutes < 10 ? `0${minutes}` : minutes} : {seconds < 10 ? `0${seconds}` : seconds}
      </>
    );
  }
};

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
    remainTime: {
      color: theme.palette.text.primary,
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
  },
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  openModal: boolean
}

const DetailModal = (props: Props) => {
  const { className, setOpenModal, openModal, info } = props;
  const classes = useStyles();

  const [showCount, setShowCount] = useState(false);

  const [openNFTModal, setOpenNFTModal] = useState<boolean>(false)

  const handleClose = () => {
    setOpenModal(false)
  }
  
  useEffect(() => {
    (async () => {
      const now = new Date().getTime();

      if(info.remainTime && (info.remainTime - now) > 0){
        setShowCount(true)
      }
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
          </Grid>

          <Grid item md={8} container direction="row" justifyContent="space-between" className="pl-8">
            <div className={`d-flex align-items-center col-12`}>
              <span className={`${styles.title} ${classes.title}`}>FurrSols #23</span>

              {showCount && 
                <div className={`d-flex ml-8 align-items-center justify-content-center line-height-1 ${styles.remainTime} ${classes.remainTime}`}>
                  <Countdown
                    date={info.remainTime}
                    onComplete={() => {setShowCount(false)}}
                    renderer={renderCountdown}
                  />
                </div>
              }
            </div>

            <div className={`col-12 mt-16`}>
              <table className={`col-12 ${styles.infoTable}`}>
                  <tbody>
                    <tr>
                      <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Class</td>
                      <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>☀ Summer</td>
                    </tr>
                    <tr>
                      <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Breed Count</td>
                      <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>0 out of 3</td>
                    </tr>
                    <tr>
                      <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Owner</td>
                      <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>HECE...DhJx</td>
                    </tr>
                    <tr>
                      <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.light}`}>FLUFF</td>
                      <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.light}`}>5000</td>
                    </tr>
                  </tbody>
              </table>
            </div>

            <div className={`col-12 mt-16`}>
              <StakeButton
                  className={`font-sm line-height-1 pt-8 pr-16 pb-8 pl-16 font-700`}
                  onClick={() => setOpenNFTModal(true)}
                  fullWidth={false}
              >
                UPGRADE FURRSOL
              </StakeButton>
            </div>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent={'space-between'} className="mt-24">
          <Grid item md={4}>
            <div className='d-flex align-items-center col-12'>
              <span className={`${classes.primary}`}>Attributes</span>
            </div>

            <div className={`col-12 mt-8`}>
              <table className={`col-12 ${styles.infoTable}`}>
                <tbody>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Hunger</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>110</td>
                  </tr>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Sleep</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>104</td>
                  </tr>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>103</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>103</td>
                  </tr>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>Fun</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-6 ${classes.primary}`}>113</td>
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

          <Grid item md={8} className="pl-8">
            <div className='d-flex align-items-center col-12'>
              <span className={`${classes.primary}`}>Traits</span>
            </div>

            <div className={`col-12 mt-8`}>
              <table className={`col-12 ${styles.infoTable} ${styles.traitTable}`}>
                <tbody>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Background</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Taiyo Ruins</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}>Sleep +8</td>
                  </tr>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Fur</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Solana</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}>5000</td>
                  </tr>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Eyes</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Chill</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}></td>
                  </tr>
                  <tr>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Mouth</td>
                    <td  className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Bubblegum</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}>Hunger +3</td>
                  </tr>
                  <tr>
                    <td  className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Headgear</td>
                    <td  className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Moshi Hat</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}>Fun +7</td>
                  </tr>
                  <tr>
                    <td  className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Accessory</td>
                    <td  className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Silver Chain</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}>Hygiene +3</td>
                  </tr>
                  <tr>
                    <td  className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Toy</td>
                    <td  className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.primary}`}>Lava Lamp</td>
                    <td className={`text-left pt-8 pr-8 pb-8 pl-8 line-height-1 col-4 ${classes.light}`}>Fun +5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Grid>

        </Grid>
            
        <UpgradeModal 
          setOpenModal={setOpenNFTModal}
          openModal={openNFTModal}
          info={info}
        >

        </UpgradeModal>

        <div className={`mt-16 mr-16 ${styles.close}`}><CloseIcon className={`${classes.primary}`} onClick={handleClose}/></div>
      </div>
    </Modal>
  )
}

export default DetailModal;
