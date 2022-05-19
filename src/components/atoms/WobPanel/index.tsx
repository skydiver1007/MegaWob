import * as React from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import { getImg } from "../../../utils/Helper";

import styles from './index.module.scss';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // background: `#000000`,
      borderColor: theme.syscolor.light,
      color: `#EE0707`,
      marginBottom: '10px',
      pointerEvents: 'none',
      '&:hover': {
        // background: theme.syscolor.dark,
      },
      '&:disabled': {
        background: alpha(`${theme.syscolor.semi}`, 0.1),
        color: alpha(`${theme.syscolor.light}`, 0.1),
        borderColor: alpha(`${theme.syscolor.light}`, 0.1)
      }
    }
  })
)

type Props = {
  children: React.ReactNode,
  enabled?: boolean,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const WobPanel = (props: Props) => {
  const { children, enabled, className, onClick } = props;
  const classes = useStyles();
  return  <Button 
            variant="contained"
            className={`${className} ${styles.root} ${classes.root}`}
            disabled={enabled == undefined ? false : !enabled}
            onClick={onClick}
          >
            { children }
          </Button>
}

export default WobPanel;
