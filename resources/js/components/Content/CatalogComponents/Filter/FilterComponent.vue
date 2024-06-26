<template>
    <div :class="$style.filter" v-bind="$attrs">
        <template v-if="filters">
            <template v-for="filter in filters">
                <FilterRangeComponent v-if="filter.type === 2"
                                      :title="filter.title"
                                      :query-params="localQueryParams.params"
                                      :min-total="filter.values.min" :max-total="filter.values.max"
                                      :name="filter.slug"
                                      :get-filter-data="getFilterDataDebounce"
                                      :key="localQueryParams.params.get(filter.slug)"
                />
                <FilterChooseBlock v-else
                                   :title="filter.title"
                                   :query-params="localQueryParams.params"
                                   :values="filter.values"
                                   :get-filter-data="getFilterDataDebounce"
                                   :type="filter.type"
                                   :name="filter.slug"
                                   :key="localQueryParams.params.get('sort') + filter.slug + filter.values.length"
                />
            </template>
            <ButtonComponent :class="$style.closeMobileCatalogButton" @click="applyFilter">Применить</ButtonComponent>
        </template>
    </div>
</template>

<script setup>
import {computed, reactive, ref, watch, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import ButtonComponent from "../../../UI/Buttons/ButtonComponent.vue";
import FilterRangeComponent from "./FilterRangeComponent.vue";
import {debounce} from "lodash";
import FilterChooseBlock from "./FilterChooseBlock.vue";

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
const localQueryParams = reactive({params: new URLSearchParams(queryParams.value)})


watchEffect(() => {
    if (category.value) {
        localQueryParams.params = new URLSearchParams(queryParams.value)
        getFilterData(new URLSearchParams(queryParams.value))
    }
})

function getFilterData(queryParams) {
    axios.get(`/api/catalog/filter-data/${category.value}${getSearchParams(queryParams)}`)
        .then(response => {
            filters.value = response.data;
        })
}

const getFilterDataDebounce = debounce(getFilterData, 150);

function getSearchParams(queryParams) {
    const paramsString = queryParams.toString();
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
