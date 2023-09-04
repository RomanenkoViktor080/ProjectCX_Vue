<template>
    <div :class="$style.filter" v-bind="$attrs">
        <template v-if="filters">
            <template v-for="filter in filters">
                <!--                <FilterRangeComponent v-if="filter.type === 2" :search-params="localQueryParams"
                                                      :get-filter-data="getFilterDataDebounce"
                                                      :min-total="filter.values.min" :max-total="filter.values.max"
                                                      :title="filter.title"
                                                      :name="filter.slug" :key="filter.slug"/>-->
                <!--                <FilterChooseBlock v-else queryParams={localQueryParams} getFilterData={getFilterDataDebounce}
                                                     type={item.type} name={item.slug} title={item.title} values={item.values}
                                                     key={item.slug}-->
            </template>
            <ButtonComponent :class="$style.closeMobileCatalogButton" @click="applyFilter">Применить</ButtonComponent>
        </template>
    </div>
</template>

<script setup>
import {computed, reactive, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import ButtonComponent from "../../../UI/Buttons/ButtonComponent.vue";

const props = defineProps({
    catalogMobileActive: {
        required: true
    },
    setCatalogMobileActive: {
        type: Function,
        required: true
    }
})

const route = useRoute();
const router = useRouter();
const filters = ref();
const category = computed(() => route.params.category);
const queryParams = computed(() => route.query)
const localQueryParams = reactive({params: new URLSearchParams})

watch([queryParams, category], ([newQueryParams, newCategory]) => {
    if (newCategory) {
        getFilterData(newQueryParams)
        localQueryParams.params = new URLSearchParams(newQueryParams);
    }
}, {immediate: true})

function getFilterData(queryParams) {
    axios.get(`/api/catalog/filter-data/${category.value}${getSearchParams(queryParams)}`)
        .then(response => {
            filters.value = response.data;
        })
}

function getSearchParams(queryParams) {
    const paramsString = new URLSearchParams(queryParams).toString();
    if (paramsString === "") {
        return paramsString
    }
    return `?${paramsString}`;
}

function applyFilter() {
    props.setCatalogMobileActive(false)
    router.push({query: Object.fromEntries(localQueryParams.params.entries())})
}

</script>

<style module>
@import "FilterComponent.module.scss";
</style>
<!--
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import classes from "./FilterComponent.module.scss";
import FilterChooseBlock from "./FilterChooseBlock";
import FilterRangeComponent from "./FilterRangeComponent";
import ButtonComponent from "../../../UI/Buttons/ButtonComponent.vue";
import {useParams, useSearchParams} from "react-router-dom";
import axios from "axios";
import {debounce, isEmpty} from "lodash";

const FilterComponent = ({classProp, setCatalogMobileActive, CatalogMobileActive}) => {
    const getFilterDataDebounce = useMemo(() => debounce(getFilterData, 150), [category]);
    const FilterBlocksList = useMemo(() => {
        return

        )
    }, [filters, localQueryParams, queryParams])

    useEffect(() => {
        if (CatalogMobileActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => document.body.style.overflow = "auto";
    }, [CatalogMobileActive])

    return (


    );
};

export default FilterComponent;
-->
