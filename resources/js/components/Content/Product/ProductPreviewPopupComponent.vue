<template>
    <PopupCenterComponent :class-body="$style.popupBody"
                          :active="productPreviewPopupState"
                          :set-active="setProductPreviewPopupState">
        <div :class="$style.wrapper">
            <Swiper
                :space-between="10"
                :direction="'vertical'"
                :modules="[Thumbs, Navigation]"
                :watch-slides-progress="true"
                :slides-per-view="4"
                :class="$style.navSlider"
                @swiper="setThumbsSwiper"
            >
                <SwiperPrevSlideButton :class="$style.prevSlideButton"/>
                <SwiperNextSlideButton :class="$style.nextSlideButton"/>
                <SwiperSlide v-for="image in product.images" :key="image.id" :class="$style.slide"><img
                    :src="image.path" alt=""/></SwiperSlide>

            </Swiper>
            <Swiper
                :direction="'vertical'"
                :slides-per-view="1"
                :class="$style.mainSlider"
                :modules="[Thumbs, Navigation]"
                :thumbs="{swiper: thumbsSwiper}"
            >
                <SwiperSlide v-for="image in product.images" :key="image.id" :class="$style.slide">
                    <img :src="image.path" alt=""/>
                </SwiperSlide>
            </Swiper>

            <div :class="$style.productContent">
                <router-link :to="{name: 'product', params: {productId: product.id}}"
                             @click="setProductPreviewPopupState(false)" :class="$style.title">
                    {{ product.title }}
                </router-link>
                <StarsRatingComponent/>
                <div :class="$style.productPrices">
                    <span :class="$style.productPriceLower">{{ product.price }} ₽</span>
<!--                    <span :class="$style.productPriceOld">{{ product.price }} ₽</span>-->
                </div>
                <div :class="$style.actions">
                    <ProductBasketActionsComponent :product="product"/>
                    <LikeComponent :prop-class="$style.like"/>
                </div>
            </div>
        </div>
    </PopupCenterComponent>
</template>

<script setup>
import PopupCenterComponent from "../../Popups/PopupCenterComponent.vue";
import {Swiper, SwiperSlide} from "swiper/vue";
import {Navigation, Thumbs} from "swiper/modules";
import {computed, ref} from "vue";
import {useStore} from "vuex";
import StarsRatingComponent from "../../UI/Raiting/StarsRatingComponent.vue";
import ButtonComponent from "../../UI/Buttons/ButtonComponent.vue";
import LikeComponent from "../../UI/LikeComponent/LikeComponent.vue";
import SwiperPrevSlideButton from "../../Sliders/SwiperPrevSlideButton.vue";
import SwiperNextSlideButton from "../../Sliders/SwiperNextSlideButton.vue";
import 'swiper/css';
import ProductBasketActionsComponent from "./ProductBasketActionsComponent.vue";

const store = useStore();
const productPreviewPopupState = computed(() => store.state.productPreview.productPreviewPopupState)
const product = computed(() => store.state.productPreview.productPreviewData)
const setProductPreviewPopupState = (state) => store.dispatch('changeProductPreviewPopupState', state)

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper;
};
</script>

<style module>
@import "ProductPreviewPopupComponent.module.scss";
</style>
