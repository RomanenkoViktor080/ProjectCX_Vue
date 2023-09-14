<template>
    <div :class="$style.wrapper" v-bind="$attrs">
        <div :class="[$style.title, titleClass]">{{ title }}</div>
        <div :class="bodyClasses">
            <slot/>
        </div>
        <a @click="link ? null : openOrClose()" :class="[$style.button, buttonClass]">
            {{ link ? "Подробнее" : state ? "Свернуть" : "Развернуть" }}</a>
    </div>
</template>

<script setup>

import {computed, ref, useCssModule} from "vue";

const props = defineProps({
    title: {required: false},
    titleClass: {required: false},
    bodyClass: {required: false},
    buttonClass: {required: false},
    link: {required: false, default: false}
})

const state = ref(false);
const style = useCssModule();
const bodyClasses = computed(() => {
    if (state.value) {
        return [style.body, style.open]
    }
    return style.body;
})

function openOrClose() {
    state.value = !state.value;
}
</script>

<style module>
@import "ShowMoreOrLessProductDescriptionComponent.module.scss";
</style>
