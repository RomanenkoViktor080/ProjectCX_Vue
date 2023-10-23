<template>
    <div :class="$style.productCard">
        <div :class="$style.productImage">
            <router-link :to="{name: 'product', params: {productId: product.id}}">
                <img :src="product?.frontImage" loading="lazy" alt="Товар">
                <span :class="$style.productCardImageSale">-40%</span>
            </router-link>
            <button :class="$style.productPreview"
                    @click="openProductPreviewPopup(product.id)">
                Подробнее
            </button>
        </div>

        <div :class="$style.productCardBody">
            <div :class="$style.productHeader">
                <div :class="$style.productTitle">{{ product?.title }}</div>

                <div :class="$style.productPrices">
                    <span :class="$style.productPriceNew">{{ product?.price }} ₽</span>
<!--                    <span :class="$style.productPriceOld">{{ product?.price }} ₽</span>-->
                </div>
            </div>
            <div :class="$style.productFooter">
                <StarsRatingComponent/>
                <div :class="$style.actions">
                    <ProductBasketActionsComponent :product="product"/>
                    <LikeComponent :prop-class="$style.actionIcon"/>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import LikeComponent from "../../UI/LikeComponent/LikeComponent.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import CounterComponent from "../../UI/Counter/CounterComponent.vue";
import ButtonComponent from "../../UI/Buttons/ButtonComponent.vue";
import useBasketAddItem from "../../../hooks/BasketHooks/useBasketAddItem.js";
import useBasketRemoveProduct from "../../../hooks/BasketHooks/useBasketRemoveProduct.js";
import StarsRatingComponent from "../../UI/Raiting/StarsRatingComponent.vue";
import ProductBasketActionsComponent from "./ProductBasketActionsComponent.vue";

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});
const store = useStore();

async function openProductPreviewPopup(id) {
    try {
        const response = await axios.get(`/api/product-preview/${id}`)
        store.commit('setProductPreviewData', response.data)
        store.commit('setProductPreviewPopupState', true)
    } catch (error) {
        console.log(error)
    }
}
</script>
<style module>
@import "ProductCardComponent.module.scss";
</style>
