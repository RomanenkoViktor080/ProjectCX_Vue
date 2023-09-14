<template>
    <div v-if="product" :class="$style.productPage">
        <div :class="$style.productContent">
            <div :class="$style.productHeader">
                <div :class="$style.productTitle">
                    {{ product.title }}
                </div>
                <div :class="$style.productActions">
                    <ul :class="$style.list">
                        <li :class="$style.item">
                            <StarsRatingComponent start-rating="4"/>
                        </li>
                        <li :class="$style.item"><span :class="$style.link">Коментарии</span></li>
                        <!-- переход на блок с коментариями -->
                    </ul>
                </div>
            </div>
            <div :class="$style.swiperWrapper">
                <SwiperProductPageComponent :images="product.images" :class-main-slide="$style.slide"
                                            :class-main-wrapper="$style.mainSlider" :class-nav-slide="$style.slide"
                                            :class-nav-wrapper="$style.navSlider"/>
            </div>
            <div :class="$style.productShortInfo">
                                <ShowMoreOrLessProductDescriptionComponent :title-class="$style.descriptionShortTitle"
                                                                           title="Описание"
                                                                           :class="$style.descriptionShort" :link="true">
                                    {{ product.description }}
                                </ShowMoreOrLessProductDescriptionComponent>
                <ShowMoreOrLessProductCharacteristicsComponent :title-class="$style.characteristicsShortTitle"
                                                               title="Характеристики"
                                                               :wrapper-class="$style.characteristicsShort"
                                                               :link="true"/>
            </div>
            <div :class="$style.aSideBlock">
                <div :class="$style.productASide">
                    <div :class="$style.productPrices">
                        <div :class="$style.productPriceLower">
                            {{ product.price }} ₽
                        </div>
                        <div :class="$style.productPriceOld">
                            {{ product.price }} ₽
                        </div>
                    </div>
                    <ButtonComponent :class="$style.button" @click="addItemToBasket(productId)">В корзину
                    </ButtonComponent>
                </div>
            </div>
        </div>
        <div :class="$style.productMain">
            <div :class="$style.productInfo">
                <ShowMoreOrLessProductCharacteristicsComponent title="Характеристики"
                                                               :title-class="$style.characteristicsTitle"/>
                                    <div>
                                        <ShowMoreOrLessProductDescriptionComponent title="Описание"
                                                                                   :title-class="$style.descriptionTitle">
                                            {{ product.description }}
                                        </ShowMoreOrLessProductDescriptionComponent>
                                    </div>
            </div>
        </div>
        <div :class="$style.mobileOrderBlock">
            <div :class="$style.productPrices">
                <div :class="$style.productPriceLower">{{ product.price }} ₽</div>
                <div :class="$style.productPriceOld">{{ product.price }} ₽</div>
            </div>
            <ButtonComponent :class="$style.button" @click="addItemToBasket(productId)">В корзину</ButtonComponent>
        </div>
        <div :class="$style.userActivityAndRating">
            <div :class="$style.userActivityBlock">
                <div :class="$style.userActivityHeader">
                    <div :class="[$style.headerTitle, userActivityContent && $style.headerTitleActive]"
                         @click="() => userActivityContent = true">
                        Отзывы
                    </div>
                    <div :class="[$style.headerTitle, !userActivityContent && $style.headerTitleActive]"
                         @click="() => userActivityContent = false">Вопросы
                    </div>
                </div>
                <div :class="$style.userActivityBody">
                    <ProductCommentComponent v-if="userActivityContent"/>
                    <template v-else>
                        <ProductCommentComponent/>
                        <ProductCommentComponent/>
                        <ProductCommentComponent/>
                    </template>
                </div>
            </div>
            <ProductRatingComponent :class="$style.rating"/>
        </div>
    </div>
</template>

<script setup>


import {computed, ref, watchEffect} from "vue";
import {useRoute} from "vue-router";
import useBasketAddItem from "../hooks/BasketHooks/useBasketAddItem.js";
import StarsRatingComponent from "../components/UI/Raiting/StarsRatingComponent.vue";
import ButtonComponent from "../components/UI/Buttons/ButtonComponent.vue";
import ProductRatingComponent from "../components/Content/Product/ProductRatingComponent.vue";
import ProductCommentComponent from "../components/Content/Product/ProductCommentComponent.vue";
import SwiperProductPageComponent from "../components/Sliders/SwiperProductPageComponent.vue";
import ShowMoreOrLessProductCharacteristicsComponent
    from "../components/UI/ShowMoreOrLess/ShowMoreOrLessProductCharacteristicsComponent.vue";
import ShowMoreOrLessProductDescriptionComponent
    from "../components/UI/ShowMoreOrLess/ShowMoreOrLessProductDescriptionComponent.vue";

const route = useRoute();
const productId = computed(() => route.params.productId);
const product = ref();
const addItemToBasket = useBasketAddItem();
const userActivityContent = ref(true);


watchEffect(async () => {
    try {
        if (productId.value) {
            const response = await axios.get(`/api/product/${productId.value}`);
            product.value = response.data;
        }
    } catch (error) {
        console.log(error);
    }
});
</script>

<style module>
@import "ProductPageComponent.module.scss";
</style>
