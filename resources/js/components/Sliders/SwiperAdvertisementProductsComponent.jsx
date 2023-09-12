import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import ProductCardComponent from "../Content/Product/ProductCardComponent.vue";
import classes from "./SwiperAdvertisementProductsComponent.module.scss";
import {Link} from "react-router-dom";
import SwiperNextSlideButton from "./SwiperNextSlideButton.vue";
import SwiperPrevSlideButton from "./SwiperPrevSlideButton.vue";

const SwiperAdvertisementProductsComponent = ({title = null, products = [1, 2, 3 , 4, 6, 8, 2, 3 , 4, 5, 9], slideClass = null, sliderClass = null}) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.header}>
                <div className={classes.title}>
                    {title}
                </div>
                <Link to={"/error404"} className={classes.link}>
                    Показать все
                </Link>
            </div>
                <Swiper
                    spaceBetween={5}
                    slidesPerView={'auto'}
                    className={classes.swiperBody}
                >
                    <SwiperNextSlideButton buttonClass={classes.nextSlideButton}/>
                    <SwiperPrevSlideButton buttonClass={classes.prevSlideButton}/>

                    {
                        products.map((product) =>
                            <SwiperSlide className={classes.slider}><ProductCardComponent product={product} /></SwiperSlide>
                        )
                    }
                </Swiper>
        </div>
    );
};

export default SwiperAdvertisementProductsComponent;
