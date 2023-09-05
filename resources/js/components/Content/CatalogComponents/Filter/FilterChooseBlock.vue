<template>
    <SpoilerComponent :class="$style.filterChooseBlock">
        <template v-slot:title>
            <div :class="$style.titleBlock">
                <span :class="$style.titleText">{{ title }}</span>
                <span v-if="queryParams.get(name)" :class="$style.resetButton" @click="resetParam">Сбросить</span>
            </div>
        </template>
        <template v-slot:body>
            <div :class="$style.content">
                <CheckboxComponent v-if="type === 0" v-for="value in values"
                                   @change="setQueryParams"
                                   :id="name + value.id"
                                   :name="name"
                                   :value="value.id"
                                   v-model="localChooseBlockParams"
                                   :key="name + value.id">

                    <span :class="$style.titleItemText">{{ value.value }}</span>
                    <span :class="$style.titleItemCount">{{ value.productCount }}</span>
                </CheckboxComponent>
                <!--

                                                   title={<TitleItem count={value.productCount} value={value.value}-->


                <!--
                                values ? values.slice(0, (quantityToDisplay > values.length || showStatus === true) ? values.length : quantityToDisplay).map((value) =>
                                Number(type) === 0 ?
                                <CheckboxComponent checked={checkBoxIsChecked(value.id)} id={name + value.id}
                                                   value={value.id}
                                                   title={<TitleItem count={value.productCount} value={value.value}/>}
                                    name={name}
                                    onChange={changeCheckBox}
                                    key={value.id}
                                    /> :
                                    Number(type) === 1 ?
                                    <RadioComponent checked={radioIsChecked(value.id)} id={name + value.id} value={value.id}
                                                    title={<TitleItem count={value.productCount} value={value.value}/>}
                                        name={name}
                                        onChange={changeRadio}
                                        key={value.id}
                                        /> :
                                        <div>Error</div>
                                        )
                                        : <div>Error</div>
                                        -->
            </div>
            <!--{
            values && values.length > quantityToDisplay ?
            <div :class="$style.moreLessText"
                 onClick={() => setShowStatus(!showStatus)}>{showStatus ? "Свернуть" : "Развернуть"}
            </div>
            : null
            }-->
        </template>
    </SpoilerComponent>
</template>

<script setup>
import SpoilerComponent from "../../../UI/Spoiler/SpoilerComponent.vue";
import {ref} from "vue";
import CheckboxComponent from "../../../UI/Checkboxes/CheckboxComponent.vue";
import {isEmpty} from "lodash";

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

/*
function changeRadio(event) {
    let value = event.target.value;
    let isChecked = event.target.checked
    if (isChecked) {
        setQueryParams(value)
    } else {
        deleteSearchParam()
    }
}
*/
function setQueryParams() {
    let paramValues = localChooseBlockParams.value
    if(isEmpty(paramValues)){
        deleteSearchParam();
        return;
    }
    props.queryParams.set(props.name, paramValues.join("ZZ"))
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
