<template>
    <div :class="classesWrapper" v-bind="$attrs">
        <div :class="[$style.title, classTitle]" @click="changeStatusSpoiler">
            <slot name="title"/>
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
    classTitle: [String, Array],
    classBody: [String, Array],
})

const spoilerStatus = ref(true);
const style = useCssModule();
const classesWrapper = computed(() => {
    if (spoilerStatus.value) {
        return style.spoiler;
    }
    return [style.spoiler, style.close];
})

function changeStatusSpoiler() {
    spoilerStatus.value = !spoilerStatus.value;
}
</script>

<style module>
@import "SpoilerComponent.module.scss";
</style>
