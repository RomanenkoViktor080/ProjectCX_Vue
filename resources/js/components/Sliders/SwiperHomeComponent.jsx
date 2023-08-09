import React from 'react';
import classes from "./SwiperHomeComponent.module.scss";
import {Autoplay} from "swiper";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css/bundle';


const SwiperHomeComponent = ({productImages = ["https://images.wbstatic.net/bners1/big_celebrate_1_12_22585856.jpg", 'https://images.wbstatic.net/bners1/2new_big_9_12_22.jpg', 'https://images.wbstatic.net/bners1/newbig_elki_9_12_22.jpg']}) => {
    return (
        <Swiper
            grabCursor={true}
            loop={true}
            direction={"horizontal"}
            modules={[Autoplay]}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false
            }}
            className={classes.swiperWrapper}
        >
            {
                productImages.map((image) =>
                    <SwiperSlide className={classes.slide}><img src={image} alt=""/></SwiperSlide>
                )
            }
        </Swiper>
    );
};

export default SwiperHomeComponent;
