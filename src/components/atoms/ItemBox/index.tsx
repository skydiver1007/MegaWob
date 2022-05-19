import * as React from "react";

import { createStyles, makeStyles, Theme, alpha } from "@material-ui/core/styles";

import { getImg } from "../../../utils/Helper";

import styles from './index.module.scss';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: alpha(`${theme.syscolor.light}`, 0.02),
      borderColor: alpha(`${theme.syscolor.light}`, 0.1),
      borderWidth: '2px',
      borderStyle: 'solid',
      '&:hover': {
        background: alpha(`${theme.syscolor.light}`, 0.1),
        borderColor: alpha(`${theme.syscolor.light}`, 0.1),
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
        cursor: 'pointer'
      },
      
    }
  })
)

type Props = {
  children: React.ReactNode,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const BrightButton = (props: Props) => {
  const { children, className } = props;
  const classes = useStyles();

  return  <div 
            className={`${className} ${styles.root} ${classes.root}`}
          >
            { children }
          </div>
}

export default BrightButton;
