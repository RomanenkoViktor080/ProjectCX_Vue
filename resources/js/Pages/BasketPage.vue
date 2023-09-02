<template>
    <div :class="$style.basket">
        <div :class="$style.content">
            <div :class="$style.basketHeader">
                Корзина {{ basketProductQuantity }}
            </div>
            <div :class="$style.basketBody">
                <div v-for="product in basketProducts" :class="$style.basketItem" :key="product.id">
                    <div :class="$style.basketItemImage">
                        <img :src="product?.frontImage" loading="lazy" alt="Товар">
                    </div>
                    <div :class="$style.basketItemMainBlock">
                        <div :class="$style.basketItemInfo">
                            <div :class="$style.basketItemTitle">
                                {{ product.title }}

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
                                <!--<LikeComponent propClass={classes.basketItemActionIcon}/>-->
                                <font-awesome-icon icon="fa-solid fa-trash" :class="$style.basketItemActionIcon"
                                                   @click="basketDeleteProduct(product.id)"/>
                            </div>
                            <div :class="$style.basketItemActionsLeft">
                                <!--<CounterComponent product={product} initialQuantity={product.quantity}/>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.basketASideContainer">
            <div :class="$style.basketASide">
                <ButtonComponent :class-wrapper="$style.orderButton">Оформить заказ</ButtonComponent>
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
import useBasketDeleteProduct from "../hooks/BasketHooks/useBasketDeleteProduct.js";

const store = useStore();
const basketProducts = computed(() => store.state.basket.basketProducts);
const basketFullPrice = computed(() => store.getters.basketFullPrice);
const basketProductQuantity = computed(() => store.getters.basketProductQuantity);
const basketDeleteProduct = useBasketDeleteProduct();

axios.post('/api/basket-data').then((response) => {
    store.dispatch('changeBasketProductReload', response.data)
});

</script>

<style module>
@import "BasketPage.module.scss";
</style>
