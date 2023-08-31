<template>
    <div :class="popupState" @click="setActive(false)">
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
    classWrapper: {
        default: null,
    },
    classBody: {
        default: null,
    }
});

const style = useCssModule();

const popupState = computed(() => {
    if (props.active) {
        return [style.popupCenter, props.classWrapper, style.active]
    }
    return [style.popupCenter, props.classWrapper]
})
</script>

<style module>
@import "PopupCenterComponent.module.scss";
</style>
