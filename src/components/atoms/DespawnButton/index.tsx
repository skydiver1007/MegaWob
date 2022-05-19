import * as React from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import { getImg } from "../../../utils/Helper";

import styles from './index.module.scss';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'none',
      borderColor: theme.palette.text.primary,
      borderStyle: 'solid',
      borderWidth: '1px',
      color: theme.palette.text.primary,
      '&:hover': {
        background: 'none',
        color: theme.palette.text.disabled,
        borderColor: theme.palette.text.primary,
      },
      '&:disabled': {
        color: alpha(`${theme.palette.text.primary}`, 0.1),
        borderColor: alpha(`${theme.palette.text.primary}`, 0.1)
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

const DespawnButton = (props: Props) => {
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

export default DespawnButton;
