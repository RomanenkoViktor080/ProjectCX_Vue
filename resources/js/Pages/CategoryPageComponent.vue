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
            <!--            <FilterComponent classProp={catalogFilterClasses.join(" ")}
                        CatalogMobileActive={catalogMobileActive}
                        setCatalogMobileActive={setCatalogMobileActive}
                        />-->
            <CatalogMainComponent/>
<!--            <CatalogMainComponent setCatalogMobileActive={setCatalogMobileActive}/>-->
        </div>
    </div>
</template>
<script setup>

import {computed} from "vue";
import {useRoute} from "vue-router";
import CatalogMainComponent from "../components/Content/CatalogComponents/CatalogMainComponent.vue";

const route = useRoute()
const category = computed(() => route.params.category);
/*
const [catalogMobileActive, setCatalogMobileActive] = useState(false);
const {category} = useParams();
const catalogFilterClasses = useMemo(() => {
if (catalogMobileActive) {
return [classes.catalogFilter, classes.mobile];
}
return [classes.catalogFilter];
}, [catalogMobileActive])

* */
</script>
<style module>
@import "CatalogPageComponent.module.scss";

</style>
