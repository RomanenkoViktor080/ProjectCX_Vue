import React from 'react';
import classes from "./BasketPage.module.scss";
import ButtonComponent from "../components/UI/Buttons/ButtonComponent.vue";
import LikeComponent from "../components/UI/LikeComponent/LikeComponent";
import CounterComponent from "../components/UI/Counter/CounterComponent";
import {FiTrash} from "react-icons/fi";
import {LazyLoadImage} from "react-lazy-load-image-component";
import useBasketDeleteItem from "../hooks/BasketHooks/useBasketDeleteItem";
import {useSelector} from "react-redux";

const BasketPage = () => {
    const basket = useSelector((state) => state.basketReducer);
    const basketDeleteItem = useBasketDeleteItem();
    const products = basket.basketItems;
    const basketPrice = basket.basketFullPrice;
    const basketQuantity = basket.basketProductQuantity;


    return (
        <div className={classes.basket}>
            <div className={classes.content}>
                <div className={classes.basketHeader}>
                    Корзина {basketQuantity}
                </div>
                <div className={classes.basketBody}>
                    {
                        products.map(product =>
                            <div className={classes.basketItem} key={product.id}>
                                <div className={classes.basketItemImage}>
                                    <LazyLoadImage src={product?.frontImage}/>
                                </div>
                                <div className={classes.basketItemMainBlock}>
                                    <div className={classes.basketItemInfo}>
                                        <div className={classes.basketItemTitle}>
                                            {product.title}

                                        </div>
                                        <div className={classes.basketItemPrices}>
                                            <div className={classes.basketItemPriceNew}>
                                                {product.price * product.quantity}
                                            </div>
                                            <div className={classes.basketItemPriceOld}>
                                                {product.price}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.basketItemActions}>
                                        <div className={classes.basketItemActionsRight}>
                                            <LikeComponent propClass={classes.basketItemActionIcon}/>
                                            <FiTrash className={classes.basketItemActionIcon}
                                                     onClick={() => basketDeleteItem(product)}/>
                                        </div>
                                        <div className={classes.basketItemActionsLeft}>
                                            <CounterComponent product={product} initialQuantity={product.quantity}/>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
            </div>
            <div className={classes.basketASideContainer}>
                <div className={classes.basketASide}>
                    <ButtonComponent classWrapper={classes.orderButton}>Оформить заказ</ButtonComponent>
                    <div className={classes.basketASideInfo}>
                        <div className={classes.mainCalculateBlock}><span>Итого</span><span>{basketPrice} ₽</span></div>
                        <div className={classes.defaultCalculateBlock}><span>Товары </span><span>100000 ₽</span></div>
                        <div className={classes.discountCalculateBlock}><span>Скидка </span><span>11000 ₽</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasketPage;
