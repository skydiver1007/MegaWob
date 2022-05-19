import * as React from 'react';
import { Box, Button, Typography, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import { useEffect, useState } from 'react';
import styles from './index.module.scss'
import CONFIG from '../../../configs';
const {PERIOD} = CONFIG;
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000000',
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modalDiv: {
      position: 'absolute',
      background: '#0F4339',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      height: 250,
      border: '2px solid #000000',
      color: 'white',
      borderRadius: 5,
      '@media (max-width: 767px)': {
        width: '90%',
        height: 300,
      },

    },
    innerTextDiv: {
      width: 424,
      height: 139,
      marginTop: 29,
      margin: 'auto',
      fontSize: 14,
      '@media (max-width: 767px)': {
        width: '80%',
        height: 180,
      },
    },
    buttonDiv: {
      marginTop: 19,
    },
    cancel: {
      width: 125,
      height: 35,
      background: `#1B1B1B`,
      border: '1px solid #111111',
      boxSizing: 'border-box',
      borderRadius: 3,
      color: '#FFFFFF',
      marginRight: 10,
      cursor: 'pointer'

    },
    confirm: {
      width: 125,
      height: 35,
      background: `#2F9BE9`,
      border: '1px solid #165E94',
      boxSizing: 'border-box',
      borderRadius: 3,
      color: '#FFFFFF',
      cursor: 'pointer'

    }
  })
)

const ModalComponent = (props: any) => {
  const { onClose, info, open, onConfirm } = props;
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  }

  const handleConfirm = () => {
    onConfirm()
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition={true}
      >
        <div className={`${classes.modalDiv} text-center font-quick`}>
          <div className={`${classes.innerTextDiv}`}>
            <p className={`m-auto ${styles.title_text} font-quick`}>
              Unstaking {" "}{info?.name}
            </p>
            <p className='mt-16 font-quick'>
              You are about to unstake your Furrsol.
              This will automatically collect the $FLUFF produced and will be sent to your wallet.
              After unstaking, there will be a 2-day cooldown.

            </p>
            <p className='mt-16 font-quick'>
              Are you sure you want to unstake your FurrSol?
            </p>
          </div>

          <div className={`d-flex justify-content-center ${classes.buttonDiv} font-quick`}>
            <button className={classes.cancel} onClick={handleClose}>CANCEL</button>
            <button className={classes.confirm} onClick={handleConfirm}>CONFIRM</button>
          </div>
        </div>
        {/* <ModalBodyDiv >

        </ModalBodyDiv> */}

      </Modal>
    </div>
  );
}
export default ModalComponent; 
