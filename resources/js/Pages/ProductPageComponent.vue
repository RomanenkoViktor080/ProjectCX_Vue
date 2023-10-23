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
                                                           :class="$style.descriptionShort" link="description">
                    {{ product.description }}
                </ShowMoreOrLessProductDescriptionComponent>
                <ShowMoreOrLessProductCharacteristicsComponent :title-class="$style.characteristicsShortTitle"
                                                               title="Характеристики"
                                                               :wrapper-class="$style.characteristicsShort"
                                                               link="characteristic" :items="product.characteristics"/>
            </div>
            <div :class="$style.aSideBlock">
                <div :class="$style.productASide">
                    <div :class="$style.productPrices">
                        <div :class="$style.productPriceLower">
                            {{ product.price }} ₽
                        </div>
<!--                        <div :class="$style.productPriceOld">
                            {{ product.price }} ₽
                        </div>-->
                    </div>
                    <ProductBasketActionsComponent :product="product"/>
                </div>
            </div>
        </div>
        <div :class="$style.productMain">
            <div :class="$style.productInfo">
                <ShowMoreOrLessProductCharacteristicsComponent id="characteristic" title="Характеристики"
                                                               :title-class="$style.characteristicsTitle"
                                                               :items="product.characteristics"/>
                <div>
                    <ShowMoreOrLessProductDescriptionComponent id="description" title="Описание"
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
            <ProductBasketActionsComponent :product="product"/>
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
import StarsRatingComponent from "../components/UI/Raiting/StarsRatingComponent.vue";
import ProductRatingComponent from "../components/Content/Product/ProductRatingComponent.vue";
import ProductCommentComponent from "../components/Content/Product/ProductCommentComponent.vue";
import SwiperProductPageComponent from "../components/Sliders/SwiperProductPageComponent.vue";
import ShowMoreOrLessProductCharacteristicsComponent
    from "../components/UI/ShowMoreOrLess/ShowMoreOrLessProductCharacteristicsComponent.vue";
import ShowMoreOrLessProductDescriptionComponent
    from "../components/UI/ShowMoreOrLess/ShowMoreOrLessProductDescriptionComponent.vue";
import ProductBasketActionsComponent from "../components/Content/Product/ProductBasketActionsComponent.vue";

const route = useRoute();
const productId = computed(() => route.params.productId);
const product = ref();
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
