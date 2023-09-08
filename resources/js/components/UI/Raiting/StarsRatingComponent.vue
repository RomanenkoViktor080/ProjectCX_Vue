<template>
    <div :style="{display: 'flex'}">
        <template v-for="(star, i) in maxStars" :key="(i + 1)">
            <font-awesome-icon v-if="(i + 1) <= (rating.valueHover || rating.value)" icon="fa-solid fa-star"
                               @click="setValue(i + 1)" @mouseenter="setHover(i + 1)"
                               @mouseleave="setHover(null)"
                               :style="{color: starColor, cursor: canEdit && 'pointer'}"

            />
            <font-awesome-icon v-else icon="fa-regular fa-star"
                               @click="setValue(i + 1)" @mouseenter="setHover(i + 1)"
                               @mouseleave="setHover(null)"
                               :style="{color: starColor, cursor: canEdit && 'pointer'}"
            />
        </template>
    </div>
</template>

<script setup>
import {reactive} from "vue";

const props = defineProps({
    maxStars: {default: 5},
    startRating: {default: 0},
    canEdit: {default: false},
    starColor: {default: '#0CD9AFFF'}
})

const rating = reactive({value: props.startRating, valueHover: null});

function setValue(value) {
    if (props.canEdit) {
        rating.value = value
    }
}

function setHover(value) {
    if (props.canEdit) {
        rating.valueHover = value;
    }
}

</script>
