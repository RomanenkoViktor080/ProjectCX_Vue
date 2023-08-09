import React, {useRef, useState} from 'react';
import classes from "./ProductPreviewPopupComponent.module.scss";
import PopupCenterComponent from "../../Popups/PopupCenterComponent";
import {useDispatch, useSelector} from "react-redux";
import {changeProductPreviewPopupState} from "../../../store/reducers/productReducer";
import {Swiper, SwiperSlide} from "swiper/react";
import {IoIosArrowDown} from "react-icons/io";
import {Link} from "react-router-dom";
import StarsRatingComponent from "../../UI/Raiting/StarsRatingComponent";
import {Navigation, Thumbs} from "swiper";


const ProductPreviewPopupComponent = () => {
    const productPreviewPopupState = useSelector(state => state.productReducer.popupState)
    const product = useSelector(state => state.productReducer.productData)
    const dispatch = useDispatch();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)
    console.log(product);

    function setProductPreviewPopupState(state) {
        dispatch(changeProductPreviewPopupState(state));
    }

    return (
        <PopupCenterComponent classWrapper={classes.popupWrapper} classBody={classes.popupBody}
                              active={productPreviewPopupState}
                              setActive={setProductPreviewPopupState}>
            <div className={classes.wrapper}>
                <Swiper

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
                    className={classes.navSlider}
                >
                    <i className={classes.prevSlideButton} ref={navigationPrevRef}><IoIosArrowDown
                        style={{display: "block"}}/></i>
                    <i className={classes.nextSlideButton} ref={navigationNextRef}><IoIosArrowDown
                        style={{display: "block"}}/></i>
                    {
                        product.images.map((image) =>
                            <SwiperSlide key={image.id} className={classes.slide}><img src={image.path} alt=""/></SwiperSlide>
                        )
                    }

                </Swiper>
                <Swiper
                    direction={"vertical"}
                    modules={[Thumbs, Navigation]}
                    thumbs={{swiper: thumbsSwiper}}
                    slidesPerView={1}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    className={classes.mainSlider}
                >
                    {
                        product.images.map((image) =>
                            <SwiperSlide key={image.id} className={classes.slide}><img src={image.path} alt=""/></SwiperSlide>
                        )
                    }
                </Swiper>

                <div className={classes.productContent}>
                    <Link to={`/item/${product.id}`} onClick={() => setProductPreviewPopupState(false)}
                          className={classes.title}>{product.title}</Link>
                    <StarsRatingComponent startRating={4}/>
                    <div className={classes.productPrices}>
                        <span className={classes.productPriceLower}>{product.price} ₽</span>
                        <span className={classes.productPriceOld}>{product.price} ₽</span>
                    </div>
                    {/*<div className={classes.actions}>
                        <ButtonComponent>В корзину</ButtonComponent>
                        <LikeComponent propClass={classes.like}/>
                    </div>*/}
                </div>
            </div>
        </PopupCenterComponent>
    );
};

export default ProductPreviewPopupComponent;
