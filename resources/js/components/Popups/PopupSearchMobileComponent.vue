<template>
    <div :class="popupWrapperClasses" @click="setActive(false)">
        <div :class="$style.body" @click.stop>
            <div :class="$style.backButton" @click="setActive(false)">назад</div>
            <InputHeaderSearchComponent :class="$style.searchContainer"/>
        </div>
    </div>
</template>

<script setup>

import InputHeaderSearchComponent from "../UI/Inputs/InputHeaderSearchComponent.vue";
import {computed, useCssModule} from "vue";

const props = defineProps({
    setActive: Function,
    active: Boolean
})

const style = useCssModule();
const popupWrapperClasses = computed(() => {
    if (props.active) {
        return [style.categoryPopup, style.popupaAtive]
    }
    return style.categoryPopup
})
</script>

<style module>
@import "PopupSearchMobileComponent.module.scss";
</style>
