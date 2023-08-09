import React from 'react';
import {useSwiper} from "swiper/react";
import classes from "./SwiperChangeSlideButton.module.scss";
import {IoIosArrowDown} from "react-icons/io";
const SwiperPrevSlideButton = ({buttonClass = null}) => {
    const swiper = useSwiper()

    return (
        <IoIosArrowDown className={[classes.button, buttonClass].join(" ")} onClick={() => swiper.slidePrev()}/>
    );
};

export default SwiperPrevSlideButton;
