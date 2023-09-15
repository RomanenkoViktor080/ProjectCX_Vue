<template>
<slot v-if="isAuth"/>
</template>

<script setup>
import {useStore} from "vuex";
import {computed, watchEffect} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const store = useStore();
const isAuth = computed(() => store.state.user.isAuth)

watchEffect(() => {
    if(!isAuth.value){
        store.dispatch('changeAuthPopupState', true);
        router.replace({name: 'home'})
    }
})

</script>
