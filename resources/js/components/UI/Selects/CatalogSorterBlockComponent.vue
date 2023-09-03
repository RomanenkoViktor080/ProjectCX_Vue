<template>
    <div :class="$style.catalogSorter" v-if="sorterData.length">
        <select v-model="selected" @change="changeSort" :class="$style.catalogSelect">
            <option hidden value="default">Сортировка</option>
            <option v-for="[value, title] in sorterData"
                    :value="value"
                    :key="value"
            >
                {{ title }}
            </option>
        </select>
        <font-awesome-icon icon="fa-solid fa-sliders" :class="$style.catalogBurgerMobile"
                           @click="setCatalogMobileActive(true)"/>
    </div>
</template>
<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
    setCatalogMobileActive: {
        required: true
    }
})
const route = useRoute();
const router = useRouter();
const sorterData = ref([]);
const selected = ref("default");
const queryParams = computed(() => route.query);

const changeSort = (e) => {
    router.push({query: {...queryParams.value, sort: e.target.value}});
}

onMounted(() => {
    axios.get('/api/sorter-data').then(response => {
        sorterData.value = Object.entries(response.data);
        if (sorterData.value.some(([i, k]) => i === route.query.sort)) {
            selected.value = route.query.sort;
        }
    })
        .catch(error => {
            console.log(error);
        })
})
</script>

<style module>
@import "CatalogSorterBlockComponent.module.scss";
</style>
