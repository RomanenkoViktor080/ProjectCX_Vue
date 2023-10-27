<template>
    <font-awesome-icon v-if="liked" icon="fa-solid fa-heart" :class="[$style.likeItem, propClass]" @click="setLiked"/>
    <font-awesome-icon v-else icon="fa-regular fa-heart" :class="[$style.likeItem, propClass]" @click="setLiked"/>
</template>

<script setup>
import {ref} from "vue";

const props = defineProps({
    propClass: {
        required: false
    }
})
const liked = ref(false);

function setLiked() {
    liked.value = !liked.value;
}
</script>

<style module>
.likeItem {
    color: var(--main-first-color);
    cursor: pointer;
    display: block;
}
</style>
