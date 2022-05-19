import React, { useMemo, useEffect, useRef, useState } from "react";
import type { LinkProps } from "react-router-dom";

import * as anchor from '@project-serum/anchor';
import { useConnection, useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { getImg } from "../../../utils/Helper";

import BrightButton from "../../atoms/BrightButton"

import styles from './index.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      
    },
    filterTitle: {
      color: theme.palette.text.primary
    },
    filterList: {

    }
  })
)

type Props = {
  children: React.ReactNode,
  option: {title: string, filters: {name: string, value: string, enabled: boolean}[]},
  className?: string
}

const FilterItem = (props: Props) => {
  const { option } = props;
  const classes = useStyles();
  
  const [filterValue, setFilterValue] = useState('all');

  return (
      <div className={`col-12 mb-16`}>
          <p className={`${styles.filterTitle} ${classes.filterTitle}`}>{option.title}</p>
          <div className={`d-flex align-item-center mt-4 ${styles.filterList}`}>
            {option.filters.map((filter, index) => {
              return <BrightButton
                        enabled={filter.enabled}
                        className={`mr-4 mb-4 ${filter.value != filterValue && 'active'}`}
                        onClick={() => setFilterValue(filter.value)}
                        key={index}
                      >
                        {filter.name}
                      </BrightButton>
            })}
          </div>
      </div>
  )
}

export default FilterItem;
