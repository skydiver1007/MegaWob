import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useResize } from "./../../../utils/Helper";
import { useNavigate } from "react-router-dom";
import {
    WalletMultiButton,
  } from '@solana/wallet-adapter-react-ui';

import WobLogo from './../../../assets/images/wob_logo.png'

import styles from './index.module.scss';

const Navbar = () => {
    const [isOpen, SetisOpen] = useState(false);
    const ToggleMenu = () => {
        SetisOpen(!isOpen);
    }

    const navigate = useNavigate();
    const { isMobile, isResponsive } = useResize();
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navlink_area}>
                    <a onClick={ToggleMenu}>
                        <i className="fa fa-bars" style={{ cursor: 'pointer', fontSize: '40px' }}></i>
                    </a>
                    {isOpen ?
                        <div className={styles.navMenu}>
                            <a className={styles.navbarLink} onClick={() => navigate('/account')}>MY ACCOUNT</a>
                            <a className={styles.navbarLink} onClick={() => navigate('/mothership')}>MOTHERSHIP</a>
                            <a className={styles.navbarLink} onClick={() => navigate('/stake')}>NFT STAKING</a>
                            <a className={styles.navbarLink} onClick={() => navigate('/wobmart')}>WOBMART</a>
                            <a className={styles.navbarLink} onClick={() => navigate('/wobblesynth')}>WOBBLESYNTH</a>
                        </div>
                        :
                        <div></div>
                    }
                
                    <WalletMultiButton className={styles.custom_btn} startIcon={<img src={WobLogo} />} ></WalletMultiButton>    
                </div>
            </div>
        </>
    )
}
export default Navbar;




