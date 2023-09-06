<template>
    <div :class="$style.app">
        <div :class="$style.messageBlock">
            <div :class="$style.title">Ошибка 404</div>
            <div :class="$style.message">Страница ненайдена!</div>
            <div :class="$style.actions">
                <router-link :to="{name: 'home'}">
                    <ButtonComponent>На главную</ButtonComponent>
                </router-link>
                <ButtonComponent @click="goBack">Назад</ButtonComponent>
            </div>
        </div>
        <!--    <SwiperAdvertisementProductsComponent title={"Недавно просмотренные"}/>-->
    </div>
</template>

<script setup>
import ButtonComponent from "../components/UI/Buttons/ButtonComponent.vue";
import {useRouter} from "vue-router";

const router = useRouter();

function goBack() {
    router.go(-1);
}
</script>

<style module>
@import "NotFoundPageComponent.module.scss";
</style>
