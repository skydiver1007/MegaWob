/* eslint-disable no-lone-blocks */
import {
  PublicKey, SystemProgram,
} from '@solana/web3.js';
import { totalmem } from 'os';

interface IFurrsol {
  name: string,
  class: string,
  image: string,
  mint: PublicKey,
  tokenAccount: PublicKey,
  isStaked: boolean,
  canClaim: boolean,
  day: number,
  lockedDay: number,
  fluff: number,
  type: number
}

// ** Initial State
const initialState = {
  wallet: {
    count: 0,
    staked: 0,
    fluff: 0
  },
  totalStaked: 0,
  totalCollected: 0,
  walletCollected: 0,
  earnedFluff: 0,
  stakedFurrsols: [] as IFurrsol[],
  unstakedFurrsols: [] as IFurrsol[],
  totalNFT: 0,
  dayEarning: 0,
  list: [0, 0, 0],
  event: {
    type: '',
    value: 0,
    message: ''
  },

}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'GET_TOTAL_NFT': {
      return {
        ...state,
        totalNFT: action.totalNFT
      }
    }
    case 'GET_STACKED_FURRSOLS': {
      return {
        ...state,
        stakedFurrsols: action.stakedFurrsols,
        walletCollected: action.walletCollected,
        dayEarning: action.dayEarning,
        list: [...action.list],
        earnedFluff: action.earnedFluff
      }
    }
      break;
    case 'GET_UNSTACKED_FURRSOLS': {
      return {
        ...state,
        unstakedFurrsols: action.unstakedFurrsols
      }
    }
      break;

    case 'STAKE': {
      const dayEarning = 5 * action.list[0] + 10 * action.list[1] + 17 * action.list[2];
      return {
        ...state,
        stakedFurrsols: action.stakedFurrsols,
        unstakedFurrsols: action.unstakedFurrsols,
        totalStaked: action.totalStaked,
        list: action.list,
        dayEarning: dayEarning
      }
    }
    case 'UNSTAKE': {
      const dayEarning = 5 * action.list[0] + 10 * action.list[1] + 17 * action.list[2];
      return {
        ...state,
        stakedFurrsols: action.stakedFurrsols,
        unstakedFurrsols: action.unstakedFurrsols,
        totalCollected: action.totalCollected,
        walletCollected: action.walletCollected,
        totalStaked: action.totalStaked,
        list: action.list,
        dayEarning: dayEarning
      }
    }
      break;
    case 'GET_TOTAL': {
      return {
        ...state,
        totalStaked: action.totalStaked,
        totalCollected: action.totalCollected
      }
    }
    case 'CLAIM': {
      return {
        ...state,
        stakedFurrsols: action.stakedFurrsols,
        totalCollected: action.totalCollected,
        walletCollected: action.walletCollected
      }
    }
      break;
    case 'SET_COLLECTED': {
      return {
        ...state,
        walletCollected: action.walletCollected
      }
    }
    default:
      return state
  }
}

export default reducer
