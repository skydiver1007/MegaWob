import * as React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
  })
)

type Props = {
  children: React.ReactNode
  className?: string
}

const PrimaryLayout = (props: Props) => {
  const { children, className } = props;
  const classes = useStyles();
  return (
    <section
      className={`global-padding root ${styles.main}`}
    >

      <>
        {children}
      </>
    </section>
  )
}

export default PrimaryLayout;
