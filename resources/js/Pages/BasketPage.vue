<template>
    <div :class="$style.basket">
        <div :class="$style.content">
            <div :class="$style.basketHeader">
                Корзина {{ basketProductQuantity }}
            </div>
            <div :class="$style.basketBody">
                <div v-for="product in basketProducts" :class="$style.basketItem" :key="product.id">
                    <router-link :to="{name: 'product', params: {productId: product.id}}" :class="$style.basketItemImage">
                        <img :src="product?.frontImage" loading="lazy" alt="Товар">
                    </router-link>
                    <div :class="$style.basketItemMainBlock">
                        <div :class="$style.basketItemInfo">
                            <div :class="$style.basketItemTitleContainer">
                                <router-link :to="{name: 'product', params: {productId: product.id}}" :class="$style.basketItemTitle">{{ product.title }}</router-link>

                            </div>
                            <div :class="$style.basketItemPrices">
                                <div :class="$style.basketItemPriceNew">
                                    {{ product.price * product.quantity }}
                                </div>
                                <div :class="$style.basketItemPriceOld">
                                    {{ product.price }}
                                </div>
                            </div>
                        </div>
                        <div :class="$style.basketItemActions">
                            <div :class="$style.basketItemActionsRight">
                                <LikeComponent :prop-class="$style.basketItemActionIcon"/>
                                <font-awesome-icon icon="fa-solid fa-trash" :class="$style.basketItemActionIcon"
                                                   @click="basketDeleteProduct(product.id)"/>
                            </div>
                            <div :class="$style.basketItemActionsLeft">
                                <CounterComponent :product="product"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.basketASideContainer">
            <div :class="$style.basketASide">
                <ButtonComponent :class="$style.orderButton">Оформить заказ</ButtonComponent>
                <div :class="$style.basketASideInfo">
                    <div :class="$style.mainCalculateBlock"><span>Итого</span><span>{{ basketFullPrice }} ₽</span></div>
                    <div :class="$style.defaultCalculateBlock"><span>Товары </span><span>100000 ₽</span></div>
                    <div :class="$style.discountCalculateBlock"><span>Скидка </span><span>11000 ₽</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from "../components/UI/Buttons/ButtonComponent.vue";
import {useStore} from "vuex";
import {computed} from "vue";
import useBasketRemoveProduct from "../hooks/BasketHooks/useBasketRemoveProduct.js";
import CounterComponent from "../components/UI/Counter/CounterComponent.vue";
import LikeComponent from "../components/UI/LikeComponent/LikeComponent.vue";
import useBasketProductReload from "../hooks/BasketHooks/useBasketProductReload.js";

const store = useStore();
const basketProducts = computed(() => store.state.basket.basketProducts);
const basketFullPrice = computed(() => store.getters.basketFullPrice);
const basketProductQuantity = computed(() => store.getters.basketProductQuantity);
const basketDeleteProduct = useBasketRemoveProduct();
const reloadBasket = useBasketProductReload();
reloadBasket(); //Удалить? Она и так загружается при загрузке страницы.

</script>

<style module>
@import "BasketPage.module.scss";
</style>
