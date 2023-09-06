<template>
    <SpoilerComponent :class="$style.filterChooseBlock" v-bind="$attrs">
        <template v-slot:title>
            <div :class="$style.titleBlock">
                <span :class="$style.titleText">{{ title }}</span>
                <span v-if="queryParams.get(name)" :class="$style.resetButton" @click="resetParam">Сбросить</span>
            </div>
        </template>
        <template v-slot:body>
            <div :class="$style.content">
                <template
                    v-for="value in values.slice(0, (quantityToDisplay > values.length || showStatus === true) ? values.length : quantityToDisplay)">
                    <CheckboxComponent v-if="type === 0"
                                       @change="setQueryParams"
                                       :id="value.id   + value.id"
                                       :name="name"
                                       :value="value.id"
                                       v-model="localChooseBlockParams"
                                       :key="name + value.id">

                        <span :class="$style.titleItemText">{{ value.value }}</span>
                        <span :class="$style.titleItemCount">{{ value.productCount }}</span>
                    </CheckboxComponent>
                    <RadioComponent v-else-if="type === 1"
                                    @change="setQueryParams"
                                    :id="value.id   + value.id"
                                    :name="name"
                                    :value="value.id"
                                    :checked="isRadioChecked(value.id)"
                                    v-model="localChooseBlockParams"
                                    :key="name + value.id">
                        <span :class="$style.titleItemText">{{ value.value }}</span>
                        <span :class="$style.titleItemCount">{{ value.productCount }}</span>
                    </RadioComponent>
                </template>
            </div>
            <span v-if="!showStatus && values?.length > quantityToDisplay" :class="$style.moreLessText"
                  @click="showStatus = !showStatus">
                Развернуть
            </span>
        </template>
    </SpoilerComponent>
</template>

<script setup>
import SpoilerComponent from "../../../UI/Spoiler/SpoilerComponent.vue";
import {ref} from "vue";
import CheckboxComponent from "../../../UI/Checkboxes/CheckboxComponent.vue";
import {isArray, isEmpty} from "lodash";
import RadioComponent from "../../../UI/Radio/RadioComponent.vue";

const props = defineProps({
    title: {
        required: true
    },
    queryParams: {
        required: true,
        type: URLSearchParams
    },
    values: {
        required: true
    },
    getFilterData: {
        required: true,
    },
    type: {
        required: true
    },
    name: {
        required: true
    },
    quantityToDisplay: {
        default: 5
    }
});


const localChooseBlockParams = ref(props.queryParams.get(props.name)?.split("ZZ") ?? [])
const showStatus = ref(false);

function isRadioChecked(value) {
    return localChooseBlockParams.value == value
}

function setQueryParams() {
    let paramValues = localChooseBlockParams.value
    if (isEmpty(paramValues)) {
        deleteSearchParam();
        return;
    }
    props.queryParams.set(props.name, isArray(paramValues) ? paramValues.join("ZZ") : paramValues)
    props.getFilterData(props.queryParams)
}

function resetParam(event) {
    event.stopPropagation();
    deleteSearchParam();
}

function deleteSearchParam() {
    props.queryParams.delete(props.name)
    localChooseBlockParams.value = [];
    props.getFilterData(props.queryParams)
}


</script>

<style module>
@import "FilterChooseBlock.module.scss";
</style>
