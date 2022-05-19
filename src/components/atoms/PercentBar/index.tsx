import React, { useState } from 'react'

import { createStyles, makeStyles, Theme, withStyles, alpha } from "@material-ui/core/styles";
import LinearProgress from '@material-ui/core/LinearProgress';
import Popover from '@material-ui/core/Popover';

import {numberToFixed} from './../../../utils/Helper';

import styles from './index.module.scss';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'rgba(0, 66, 53, 0.1)',
      borderColor: theme.palette.text.disabled,
      borderWidth: '1px',
      borderStyle: 'solid'
    },
    popover: {
      background: alpha(`${theme.syscolor.dark}`, 0.9)
    }
  })
);

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      borderRadius: '6px',
      borderColor: theme.palette.text.disabled,
      borderWidth: '1px',
      borderStyle: 'solid',
    },
    colorPrimary: {
      background: 'rgba(0, 66, 53, 0.1)',
    },
    bar: {
      borderRadius: 5,
      margin: '2px',
      background: 'linear-gradient(270deg, #007B64 0%, #005E69 100%) !important'
    },
  }),
)(LinearProgress);

type Props = {
  children: React.ReactNode,
  className?: string,
  info: {total: number, current: number},
  attr: string
}

const PercentBar = (props: Props) => {
  const { children, className, info, attr } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const percentage = numberToFixed((info.current / info.total), 2) * 100;
  return <>
          <BorderLinearProgress 
            variant="determinate" 
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            value={percentage} 
            onMouseEnter={handlePopoverOpen} 
            onMouseLeave={handlePopoverClose}
            className={`${styles.root} ${classes.root}`}
          />

          <Popover 
            style={{
              pointerEvents: 'none'
            }}
            open={open}
            onClose={handlePopoverClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            disableRestoreFocus
          >
            <div
                className={`d-flex align-items-center justify-content-center ${styles.popover} ${classes.popover}`}
            >
              {`${attr}: ${info.current}/${info.total} (${percentage}%)`}
            </div>
          </Popover>
        </>
}

export default PercentBar;
