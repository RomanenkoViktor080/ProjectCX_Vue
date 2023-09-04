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
                    <template v-if="inBasket">
                        <CounterComponent :initial-quantity="inBasket.quantity" :product="inBasket"/>
                        <font-awesome-icon icon="fa-solid fa-trash" :class="$style.actionIcon"
                                           @click="removeFromBasket(product.id)"
                        />
                    </template>
                    <ButtonComponent v-else :class-wrapper="$style.productButton"
                                     @click="() => addToBasket(product.id)">
                        В корзину
                    </ButtonComponent>
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

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});
const store = useStore();
const basketProduct = computed(() => store.state.basket.basketProducts);
const inBasket = computed(() => basketProduct.value.find(basketItem => Number(basketItem.id) === Number(props.product.id)));
const addToBasket = useBasketAddItem();
const removeFromBasket = useBasketRemoveProduct();
</script>
<style module>
@import "ProductCardComponent.module.scss";
</style>
