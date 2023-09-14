<template>
    <div :class="[$style.productCharacteristics, wrapperClass]">
    <div :class="[$style.title, titleClass]">{{ title }}</div>
    <div>
        <dl v-for="item in items.slice(0, (quantityToDisplay > items.length || showStatus) ? items.length : quantityToDisplay)" :class="[$style.characteristicsMain, bodyClass]">
        <dt :class="$style.characteristicsItemTitle">
            <span :class="$style.text">{{ item.title }}</span>
        </dt>
        <dd :class="$style.characteristicsItemValue">{{ item.value }}</dd>
        </dl>
    </div>
    <a @click="link ? null : setShowStatus()"
        :class="$style.button">{{ link ? "Подробнее" : showStatus ? "Свернуть" : "Развернуть" }}</a>
    </div>
</template>

<script setup>

import {ref} from "vue";

const props = defineProps({
    quantityToDisplay: {default: 5},
    title: {required: false},
    wrapperClass: {required: false},
    titleClass: {required: false},
    bodyClass: {required: false},
    link: {default: false, required: false}
})

const items = [{title: "Модель", value: "51095YQE"}, {
    title: "Гарантийный срок",
    value: "1 год"
}, {title: "Комплектация", value: "инструкция; смартфон"}, {
    title: "Страна производства",
    value: "Китай"
}, {title: "Модель", value: "51095YQE"}, {title: "Гарантийный срок", value: "1 год"}, {
    title: "Комплектация",
    value: "инструкция; смартфон"
}, {title: "Страна производства", value: "Китай"}];
const showStatus = ref(false)
function setShowStatus(){
    showStatus.value = !showStatus.value;
}
</script>

<style module>
@import "ShowMoreOrLessProductCharacteristicsComponent.module.scss";
</style>
