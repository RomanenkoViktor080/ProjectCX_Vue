import React, {useRef, useState} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Thumbs} from "swiper";
import classes from "./SwiperProductPageComponent.module.scss";
import {IoIosArrowDown} from "react-icons/io";

const SwiperProductPageComponent = ({
                                        classNavWrapper,
                                        classNavSlide,
                                        classMainWrapper,
                                        classMainSlide,
                                        images = []
                                    }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)
    return (
        <>
            <Swiper
                onSlideChange={(e) => console.log(e.activeIndex)}
                spaceBetween={10}
                direction={"vertical"}
                modules={[Thumbs, Navigation]}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                watchSlidesProgress
                onSwiper={setThumbsSwiper}
                slidesPerView={4}
                allowTouchMove={true}
                className={[classNavWrapper, classes.navSlider].join(" ")}
            >
                <i className={classes.prevSlideButton + " fa-solid fa-chevron-down"}
                   ref={navigationPrevRef}><IoIosArrowDown style={{display: "block"}}/></i>
                <i className={classes.nextSlideButton + " fa-solid fa-chevron-down"}
                   ref={navigationNextRef}><IoIosArrowDown style={{display: "block"}}/></i>
                {
                    images.map((image) =>
                        <SwiperSlide className={classNavSlide}><img src={image.path} alt=""/></SwiperSlide>
                    )
                }

            </Swiper>
            <Swiper
                breakpoints={{
                    769: {
                        slidesPerView: 1,
                        direction: "vertical"
                    },
                    425: {
                        direction: "horizontal",
                        slidesPerView: 3,
                    }
                }}
                allowTouchMove={true}
                grabCursor={true}
                direction={"horizontal"}
                modules={[Thumbs, Navigation]}
                thumbs={{swiper: thumbsSwiper}}
                slidesPerView={2}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                spaceBetween={10}
                className={classMainWrapper}
            >
                {
                    images.map((image) =>
                        <SwiperSlide className={classMainSlide}><img src={image.path} alt=""/></SwiperSlide>
                    )
                }
            </Swiper>
        </>
    );
};

export default SwiperProductPageComponent;
