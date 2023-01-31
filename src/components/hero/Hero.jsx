import React from 'react'
import css from './Hero.module.css'
import HeroImg from '../../assets/candy_splash.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
//import {motion} from 'framer-motion'

const Hero = () => {
    const transition = {duration: 3,type: "spring"}
  return (
    <div className={css.container}>

        {/* left side */}
        <div className={css.h_side}>
            {/* <span className={css.text1}>Left Hero side</span> */}

            <div className={css.text2}>
                {/* <span>Trendy collection</span>
                <span>Some random text to look at. Adding an extra line of text to make  it longer.</span> */}
            </div>
        </div>
    

        {/* middle side Hero image */}
        <div className={css.wrapper}>
            <div className={css.blueCircle}></div>
            <img src={HeroImg} alt="" width={600} />
            {/* <div className={css.cart2}>
                <ShoppingCartIcon />

                <div className={css.signup}>
                    <span>Best Signup Offers</span>

                    <div>
                        <ArrowForwardIosIcon />
                    </div>
                </div>
            </div> */}
        </div>

        {/* right side */}
        <div className={css.h_side}>
            <div className={css.traffic}>
                    <span>100k</span>
                    <span>Monthly Traffic</span>
            </div>

            <div className={css.customers}>
                <span>100k</span>
                <span>Happy customers</span>
            </div>
        </div>
    </div>

  )
}

export default Hero