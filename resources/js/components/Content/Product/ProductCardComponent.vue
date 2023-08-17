<template>
    <div :class="$style.productCard">
        <div :class="$style.productImage">
            <router-link to="#">
                <img :src="product?.frontImage" loading="lazy" alt="Товар">
                <span :class="$style.productCardImageSale">-40%</span>
            </router-link>
            <button :class="$style.productPreview">
<!--                    onClick={()=> openProductPreviewPopup()}-->
                Подробнее
            </button>
            <!--            <button :class="$style.productPreview"
                    onClick={()=> openProductPreviewPopup()}>Подробнее
            </button>-->
        </div>

        <div :class="$style.productCardBody">
            <div :class="$style.productHeader">
                <div :class="$style.productTitle">{{ product?.title }}</div>

                <div :class="$style.productPrices">
                    <span :class="$style.productPriceNew">{{ product?.price }}</span>
                    <span :class="$style.productPriceOld">{{ product?.price }}</span>
                </div>
            </div>
            <div :class="$style.productFooter">
                <!--                <StarsRatingComponent readOnly={true}/>-->
                <div :class="$style.actions">
                    <!--                        {
                                            BasketProductControls
                                            }-->
                    <!--                        <LikeComponent propClass={classes.actionIcon}/>-->

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>
<style module>
@import "ProductCardComponent.module.scss";
</style>
<!--
import React, {useEffect, useMemo, useState} from 'react';
import classes from "./ProductCardComponent.module.scss";
import StarsRatingComponent from "../../UI/Raiting/StarsRatingComponent";
import ButtonComponent from "../../UI/Buttons/ButtonComponent.vue";
import {Link} from "react-router-dom";
import LikeComponent from "../../UI/LikeComponent/LikeComponent";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import useBasket from "../../../hooks/BasketHooks/useBasket";
import CounterComponent from "../../UI/Counter/CounterComponent";
import {FiTrash} from "react-icons/fi";
import {changeProductPreviewPopupData} from "../../../store/reducers/productReducer";
import {LazyLoadImage} from "react-lazy-load-image-component";

const ProductCardComponent = ({product}) => {
const dispatch = useDispatch();
const [basketData, basketAddItem, changeQuantity, removeItemFromBasket] = useBasket();
const [basketProduct, setBasketProduct] = useState(null);
const isAuth = useSelector(state => state.userReducer.isAuth)
useEffect(() => {
setBasketProduct(basketData.basketItems.find(basketItem => Number(basketItem.id) === Number(product.id)));
}, [isAuth])


const BasketProductControls = useMemo(() => {
return (
basketProduct ?
<>
<CounterComponent product={basketProduct} initialQuantity={basketProduct.quantity}/>
<FiTrash className={classes.actionIcon}
         onClick={()
=> removeFromBasket(product)}/>
</>
:
<ButtonComponent classWrapper={classes.productButton} onClick={() => addToBasket(product.id)}>
В корзину</ButtonComponent>
)
}, [basketProduct]);

function openProductPreviewPopup() {
axios.get(`/api/productPreview/${product.id}`).then((response) => {
dispatch(changeProductPreviewPopupData(response.data))
})
}

function addToBasket(id) {
if (!basketProduct) {
basketAddItem(id);
setBasketProduct({...product, quantity: 1})
}
}

function removeFromBasket(product) {
removeItemFromBasket(product)
setBasketProduct(null)
}

return (
<div className={classes.productCard}>
<div className={classes.productImage}>
    <Link to={`/item/${product.id}`}>
        <LazyLoadImage src={product?.frontImage} alt={'картинка товара
        '}/>
        <span className={classes.productCardImageSale}>-40%</span>
    </Link>
    <button className={classes.productPreview}
            onClick={()
    => openProductPreviewPopup()}>Подробнее
    </button>
</div>

<div className={classes.productCardBody}>
    <div className={classes.productHeader}>
        <div className={classes.productTitle}>{product?.title}</div>

        <div className={classes.productPrices}>
            <span className={classes.productPriceNew}>{product.price}</span>
            <span className={classes.productPriceOld}>{product.price}</span>
        </div>
    </div>
    <div className={classes.productFooter}>
        <StarsRatingComponent readOnly={true}/>
            <div className={classes.actions}>
                {
                BasketProductControls
                }
                <LikeComponent propClass={classes.actionIcon}/>

            </div>
    </div>
</div>
</div>
);
};

export default ProductCardComponent;
-->
