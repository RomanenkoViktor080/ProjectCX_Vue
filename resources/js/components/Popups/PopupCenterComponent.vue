<template>
    <div :class="popupState" @click="setActive(false)" v-bind="$attrs">
        <div :class="[$style.body, classBody]" @click.stop>
            <font-awesome-icon icon="fa-solid fa-xmark" @click="setActive(false)" :class="$style.closeButton"/>
            <slot/>
        </div>
    </div>
</template>

<script setup>
import {computed, useCssModule} from "vue";

const props = defineProps({
    active: {
        default: false,
    },
    setActive: {
        required: true,
    },
    classBody: {
        default: null,
    }
});

const style = useCssModule();

const popupState = computed(() => {
    if (props.active) {
        return [style.popupCenter, style.active]
    }
    return style.popupCenter
})
</script>

<style module>
@import "PopupCenterComponent.module.scss";
</style>
