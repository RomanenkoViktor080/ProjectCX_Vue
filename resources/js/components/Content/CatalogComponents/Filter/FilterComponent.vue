<template>
    <div :class="$style.filter" v-bind="$attrs">
        <!--    {
            FilterBlocksList
            }
            {
            !isEmpty(filters) && <ButtonComponent
            classWrapper={classes.closeMobileCatalogButton}
            onClick={applyFilter}>Применить</ButtonComponent>
            }-->

    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
    catalogMobileActive: {
        required: true
    },
    setCatalogMobileActive: {
        required: true
    }
})

const route = useRoute();
const router = useRouter();
const filters = ref([]);
const category = computed(() => route.params.category);
const localSearchParams = computed(() => route.query)
watch(localSearchParams, (searchParams) => {
    getFilterData(searchParams)
}, {immediate: true})

onMounted(() => {

});

function getFilterData(searchParams) {
    axios.get(`/api/catalog/filter-data/${category.value}${getSearchParams(searchParams)}`)
        .then(response => {
            filters.value = response.data;
        })
}
function getSearchParams(searchParams) {
    const paramsString = new URLSearchParams(searchParams).toString();
    if (paramsString === "") {
        return paramsString
    }
    return `?${paramsString}`;
}

function applyFilter() {
    props.setCatalogMobileActive(false)
    // router.push({query: localSearchParams})
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
        return (
            filters.map(item =>
                item.type === 2 ?
                    <FilterRangeComponent searchParams={localSearchParams} getFilterData={getFilterDataDebounce}
                                          minTotal={item.values.min} maxTotal={item.values.max} title={item.title}
                                          name={item.slug} key={item.slug}/>
                    : <FilterChooseBlock searchParams={localSearchParams} getFilterData={getFilterDataDebounce}
                                         type={item.type} name={item.slug} title={item.title} values={item.values}
                                         key={item.slug}
                    />
            )
        )
    }, [filters, localSearchParams, searchParams])

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
