<template>
    <div :class="classesWrapper" v-bind="$attrs">
        <div :class="$style.titleHeader">
            <slot name="title"></slot>
            <div :class="$style.button" @click="changeSpoilerState"></div>
            <font-awesome-icon icon="fa-solid fa-angle-down" :class="$style.titleIcon"/>
        </div>
        <div :class="[$style.body, classBody]">
            <slot name="body"/>
        </div>
    </div>
</template>

<script setup>

import {computed, ref, useCssModule} from "vue";

const props = defineProps({
    classBody: String,
    startState: Boolean
});

const style = useCssModule();

const spoilerState = ref(props.startState);
const classesWrapper = computed(() => {
    if (spoilerState.value) {
        return [style.spoiler]
    }
    return [style.spoiler, style.close]
})

function changeSpoilerState() {
    spoilerState.value = !spoilerState.value;
}

</script>

<style module>
@import "SpoilerConvertComponent.module.scss";
</style>
