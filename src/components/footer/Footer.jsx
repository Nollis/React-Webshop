import React from 'react'
import css from './Footer.module.css'
import Logo from "../../assets/logo.png";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

function Footer() {
  return (
    <div className={css.cFooterWrapper}>
        <hr/>

        <div className={css.cFooter}>
            <div className={css.logo}>
                <img src={Logo} alt="" />
            </div>

            <div className={css.block}>
                <div className={css.detail}>
                    <span>Contact us</span>
                    <span className={css.pngLine}>
                        <LocationOnIcon className={css.icon}/>
                        <span>111 north Orlando, FL 32801</span>
                    </span>

                    <span className={css.pngLine}>
                        <PhoneIcon className={css.icon}/>
                        <a href="tel:0111-545454">0111-545454</a>
                    </span>

                    <span className={css.pngLine}>
                        <MailIcon className={css.icon}/>
                        <a href="mailto:info@candystore.com">info@candystore.com</a>
                    </span>
                </div>
            </div>

            <div className={css.block}>
                <div className={css.detail}>
                    <span>Account</span>
                    <span className={css.pngLine}>
                        <LoginIcon className={css.icon}/>
                        Sign In
                    </span>
                </div>
            </div>

            <div className={css.block}>
                <div className={css.detail}>
                    <span>Company</span>
                    <span className={css.pngLine}>
                        <PersonIcon className={css.icon}/>
                        <a href="/about">
                            <p>About us</p>
                        </a>
                    </span>
                </div>
            </div>

            <div className={css.block}>
                <div className={css.detail}>
                    <span>Resources</span>
                    <span className={css.pngLine}>
                        <InsertLinkIcon className={css.icon}/>
                            <p>Safety Privacy  & Terms</p>
                    </span>
                </div>
            </div>
        </div>

        <div className={css.copyright}>
            <span>Copyright @2022 by Niklas Bergh, Inc.</span>
            <span>All rights reserved.</span>
        </div>
    </div>
  )
}

export default Footer