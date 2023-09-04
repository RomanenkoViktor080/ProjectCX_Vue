<template>
    <div :class="$style.app">
        <div :class="$style.catalogTitle">
            <div :class="$style.catalogTitleText">
                {{ category }}
            </div>
            <div :class="$style.catalogProductCount">
                0 товаров
            </div>
        </div>
        <div :class="$style.catalogBody">
            <FilterComponent :class="catalogFilterClasses"
                             :set-catalog-mobile-active="setCatalogMobileActive"
                             :catalog-mobile-active="catalogMobileActive"/>
            <CatalogMainComponent :set-catalog-mobile-active="setCatalogMobileActive"/>
        </div>
    </div>
</template>
<script setup>

import {computed, ref, useCssModule} from "vue";
import {useRoute} from "vue-router";
import CatalogMainComponent from "../components/Content/CatalogComponents/CatalogMainComponent.vue";
import FilterComponent from "../components/Content/CatalogComponents/Filter/FilterComponent.vue";

const route = useRoute()
const category = computed(() => route.params.category);
const catalogMobileActive = ref(false);
const style = useCssModule();
const catalogFilterClasses = computed(() => {
    if (catalogMobileActive.value) {
        return [style.catalogFilter, style.mobile];
    }
    return [style.catalogFilter];
})

function setCatalogMobileActive(status) {
    catalogMobileActive.value = status;
}
</script>
<style module>
@import "CatalogPageComponent.module.scss";

</style>
