<template>
    <div :class="[$style.productCharacteristics, wrapperClass]">
        <div :class="[$style.title, titleClass]">{{ title }}</div>
        <div>
            <dl v-for="item in items.slice(0, (quantityToDisplay > items.length || showStatus) ? items.length : quantityToDisplay)"
                :class="[$style.characteristicsMain, bodyClass]">
                <dt :class="$style.characteristicsItemTitle">
                    <span :class="$style.text">{{ item.title }}</span>
                </dt>
                <dd :class="$style.characteristicsItemValue">{{ item.value }}</dd>
            </dl>
        </div>
        <a v-if="items.length > quantityToDisplay" @click="link ? linkScrollTo() : setShowStatus()" :class="$style.button">
            {{ link ? "Подробнее" : showStatus ? "Свернуть" : "Развернуть" }}
        </a>
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
    link: {default: false, required: false},
    items: {required: true}

})

const showStatus = ref(false)

function setShowStatus() {
    showStatus.value = !showStatus.value;
}

function linkScrollTo() {
    const element = document.getElementById(props.link)
    if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'center'})
    }
}

</script>

<style module>
@import "ShowMoreOrLessProductCharacteristicsComponent.module.scss";
</style>
