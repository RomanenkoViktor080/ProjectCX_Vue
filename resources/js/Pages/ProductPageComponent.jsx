import React, {useEffect, useState} from 'react';
import classes from "./ProductPageComponent.module.scss";
import {Link, useParams} from "react-router-dom";
import StarsRatingComponent from "../components/UI/Raiting/StarsRatingComponent";
import ShowMoreOrLessProductDescriptionComponent
    from "../components/UI/ShowMoreOrLess/ShowMoreOrLessProductDescriptionComponent";
import ShowMoreOrLessProductCharacteristicsComponent
    from "../components/UI/ShowMoreOrLess/ShowMoreOrLessProductCharacteristicsComponent";
import ButtonComponent from "../components/UI/Buttons/ButtonComponent";
import SwiperAdvertisementProductsComponent from "../components/Sliders/SwiperAdvertisementProductsComponent";
import SwiperProductPageComponent from "../components/Sliders/SwiperProductPageComponent";
import ProductRatingComponent from "../components/Content/Product/ProductRatingComponent";
import ProductCommentComponent from "../components/Content/Product/ProductCommentComponent";
import axios from "axios";
import useBasketAddItem from "../hooks/BasketHooks/useBasketAddItem";

const ProductPageComponent = () => {
    const [userActivityContent, setUserActivityContent] = useState(true);
    const {productId} = useParams();
    const addItemToBasket = useBasketAddItem()
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`/api/product/${productId}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((response) => {
                console.log(response.data);
            })
    }, [productId]);


    return (
        <div className={classes.productPage}>
            <div className={classes.productContent}>
                <div className={classes.productHeader}>
                    <div className={classes.productTitle}>
                        {product.title}
                    </div>
                    <div className={classes.productActions}>
                        <ul className={classes.list}>
                            <li className={classes.item}><StarsRatingComponent
                                maxStars={5} readOnly={true} startRating={4} cursorPointer={true}/></li>
                            <li className={classes.item}><Link className={classes.link}>Коментарии</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={classes.swiperWrapper}>
                    <SwiperProductPageComponent classNavWrapper={classes.navSlider} classNavSlide={classes.slide}
                                                classMainSlide={classes.slide} classMainWrapper={classes.mainSlider}
                                                images={product.images}/>
                </div>
                <div className={classes.productShortInfo}>
                    <ShowMoreOrLessProductDescriptionComponent titleClass={classes.descriptionShortTitle}
                                                               title={"Описание"}
                                                               wrapperClass={classes.descriptionShort} link={true}>
                        {product.description}
                    </ShowMoreOrLessProductDescriptionComponent>
                    <ShowMoreOrLessProductCharacteristicsComponent titleClass={classes.characteristicsShortTitle}
                                                                   title={"Характеристики"}
                                                                   wrapperClass={classes.characteristicsShort}
                                                                   link={true}/>
                </div>
                <div className={classes.aSideBlock}>
                    <div className={classes.productASide}>
                        <div className={classes.productPrices}>
                            <div className={classes.productPriceLower}>
                                21 103 ₽
                            </div>
                            <div className={classes.productPriceOld}>
                                20 s ₽
                            </div>
                        </div>
                        <ButtonComponent classWrapper={classes.button} onClick={() => addItemToBasket(productId)}>В корзину</ButtonComponent>
                    </div>
                </div>
            </div>
            <div className={classes.productMain}>
                <div className={classes.productInfo}>
                    <ShowMoreOrLessProductCharacteristicsComponent title={"Характеристики"}
                                                                   titleClass={classes.characteristicsTitle}/>
                    <div>
                        <ShowMoreOrLessProductDescriptionComponent title={"Описание"}
                                                                   titleClass={classes.descriptionTitle}>
                            {product.description}
                        </ShowMoreOrLessProductDescriptionComponent>
                    </div>
                </div>
                <div>
                    <SwiperAdvertisementProductsComponent title={"Похожее"}/>
                    <SwiperAdvertisementProductsComponent title={"Реклама"}/>
                </div>
            </div>
            <div className={classes.mobileOrderBlock}>
                <div className={classes.productPrices}>
                    <div className={classes.productPriceLower}>21 103 ₽</div>
                    <div className={classes.productPriceOld}>20 103 ₽</div>
                </div>
                <ButtonComponent classWrapper={classes.button} onClick={() => useAddItemToBasket(productId)}>В корзину</ButtonComponent>
            </div>
            <div className={classes.userActivityAndRating}>
                <div className={classes.userActivityBlock}>
                    <div className={classes.userActivityHeader}>
                        <div
                            className={[classes.headerTitle, userActivityContent && classes.headerTitleActive].filter(Boolean).join(" ")}
                            onClick={() => !userActivityContent && setUserActivityContent(true)}>Отзывы
                        </div>
                        <div
                            className={[classes.headerTitle, !userActivityContent && classes.headerTitleActive].filter(Boolean).join(" ")}
                            onClick={() => userActivityContent && setUserActivityContent(false)}>Вопросы
                        </div>
                    </div>
                    <div className={classes.userActivityBody}>
                        {
                            userActivityContent ?
                                <><ProductCommentComponent/></>
                                : <><ProductCommentComponent/><ProductCommentComponent/><ProductCommentComponent/></>
                        }
                    </div>
                </div>
                <ProductRatingComponent classWrapper={classes.rating}/>
            </div>
        </div>
    );
};

export default ProductPageComponent;
