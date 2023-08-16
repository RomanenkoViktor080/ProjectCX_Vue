<template>
    <div :class="$style.catalogSorter" v-if="isLoaded">
        <select v-model="sortCurrValue" @change="changeSort" :class="$style.catalogSelect">
            <option hidden value="">Сортировка</option>
            <option v-for="[key, item] in sorterData"
                    :value="key"
                    :key="key"
            >
                {{ item }}
            </option>
        </select>
        <font-awesome-icon icon="fa-solid fa-sliders" :class="$style.catalogBurgerMobile"/>
        <!--        <GoSettings :class="$style.catalogBurgerMobile" onClick={() => setCatalogMobileActive(true)}/>-->
    </div>
</template>
<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const isLoaded = ref(false);
const sorterData = ref([]);
const sortCurrValue = ref("");
const route = useRoute();
const router = useRouter();
const queryParams = computed(() => route.query);

const changeSort = (e) => {
    let resultQueryParams = {...queryParams.value, sort: e.target.value};
    router.push({query: resultQueryParams});
}

onMounted(() => {
    axios.get('/api/sorter-data').then(response => {
        sorterData.value = Object.entries(response.data);
        if (sorterData.value.some(([i, k]) => i === route.query.sort)) {
            sortCurrValue.value = route.query.sort;
        }
        isLoaded.value = true;
    })
        .catch(error => {
            console.log(error);
        })
})
</script>

<style module>
@import "CatalogSorterBlockComponent.module.scss";
</style>
