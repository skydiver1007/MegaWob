import './styles/normalize.css';
import './styles/fonts.css';
import './styles/utils.css';
import './styles/app.css';

import { useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { getPhantomWallet, getSolflareWallet } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

import ThemeProvider from "@material-ui/styles/ThemeProvider";

import CONFIG from './configs';

import MuiTheme from "./components/theme"
import StakePage from "./pages/StakePage";
import Unstakepage from "./pages/UnstakePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('@solana/wallet-adapter-react-ui/styles.css');

const { CLUSTER_API } = CONFIG;

const App = () => {
  const wallets = useMemo(
    () => [getPhantomWallet(), getSolflareWallet()],
    []
  );
  return (
    <Provider store={store}>
      <ThemeProvider theme={MuiTheme}>
        <ConnectionProvider endpoint={CLUSTER_API}>
          {/* <WalletProvider wallets={wallets} autoConnect={true}> */}
          <WalletProvider wallets={wallets}>
            <WalletModalProvider>
              <BrowserRouter>
                <ToastContainer
                  autoClose={5000}
                  pauseOnFocusLoss={false}
                />
                <Routes>
                  <Route path="/" element={<StakePage />} />
                  <Route path="/unstake" element={<Unstakepage />} />
                  <Route path='/*' element={<StakePage />} />
                </Routes>
              </BrowserRouter>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </ThemeProvider>
    </Provider>
  )
}
export default App;