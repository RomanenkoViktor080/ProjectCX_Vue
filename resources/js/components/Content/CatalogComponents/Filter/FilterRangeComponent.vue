<template>
    <SpoilerComponent :class-title="$style.title" :class-body="$style.body">
        <template v-slot:title>
            <div :class="$style.titleBlock">
                <span :class="$style.titleText">{{ title }}</span>
                <span v-if="range.length" :class="$style.resetButton" @click="resetParam">Сбросить</span>
            </div>
        </template>
        <template v-slot:body>
            <div :class="[$style.inputBlock, $style.right]">
                <div :class="$style.hText">От</div>
                <input :placeholder="minTotal" @input="inputMinChange"
                       @blur="(e) => saveLocalSearchMinParams(e.target.value)"
                       v-model="inputMin" type="text"/>
            </div>
            <div :class="[$style.inputBlock, $style.left]">
                <div :class="$style.hText">До</div>
                <input :placeholder="maxTotal" @input="inputMaxChange"
                       @blur="(e) => saveLocalSearchMaxParams(e.target.value)"
                       v-model="inputMax" type="text"/>
            </div>
        </template>
    </SpoilerComponent>
</template>

<script setup>
import SpoilerComponent from "../../../UI/Spoiler/SpoilerComponent.vue";
import {computed, ref} from "vue";

const props = defineProps({
    title: {
        default: 'Ошибка'
    },
    queryParams: {
        required: true,
        type: URLSearchParams
    },
    minTotal: {
        required: true
    },
    maxTotal: {
        required: true
    },
    name: {
        required: true
    },
    getFilterData: {
        required: true
    }
});

const range = computed(() => props.queryParams.get(props.name) ? props.queryParams.get(props.name).toString().split("ZZ") : []);
const check = computed(() => range.value.length > 1 && Number(range.value[0].replace(/[^0-9]/g, "")) < Number(range.value[1].replace(/[^0-9]/g, "")))
const inputMin = ref(check.value ? range.value[0].replace(/[^0-9]/g, "") : props.minTotal);
const inputMax = ref(check.value ? range.value[1].replace(/[^0-9]/g, "") : props.maxTotal);

function inputMinChange(e) {
    inputMin.value = Number(e.target.value.replace(/[^0-9]/g, ""));
}

function inputMaxChange(e) {
    inputMax.value = Number(e.target.value.replace(/[^0-9]/g, ""));
}

function saveLocalSearchMinParams(minValue) {
    let maxValue = Number(inputMax.value);
    if (Number(minValue) >= maxValue) {
        maxValue = Number(minValue) + 200;
        inputMax.value = maxValue;
    }
    setSearchParamsFn(minValue, maxValue);
}

function saveLocalSearchMaxParams(maxValue) {
    let minValue = Number(inputMin.value);
    if (Number(maxValue) <= minValue) {
        minValue = Number(maxValue) <= 200 ? 0 : (Number(maxValue) - 200)
        inputMin.value = minValue;
    }
    setSearchParamsFn(minValue, maxValue);
}

function setSearchParamsFn(minTotal, maxTotal) {
    props.queryParams.set(props.name, minTotal + 'ZZ' + maxTotal)
    props.getFilterData(props.queryParams)
}

function resetParam(event) {
    event.stopPropagation();
    deleteSearchParamFn();
}

function deleteSearchParamFn() {
    props.queryParams.delete(props.name)
    props.getFilterData(props.queryParams)
}

</script>

<style module>
@import "FilterRangeComponent.module.scss";
</style>
