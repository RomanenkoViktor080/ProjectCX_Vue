import {useStore} from "vuex";
import {computed} from "vue";

export default function useBasketProductReload() {
    const store = useStore();
    const isAuth = computed(() => store.state.user.isAuth);

    async function reloadBasket() {
        const localBasket = JSON.parse(localStorage.getItem('basket'))
        const response = await axios.post('/api/basket-data', !isAuth.value && {products: localBasket?.basketProducts});
        store.dispatch('changeBasketProductReload', response.data)
    }

    return reloadBasket;

}
