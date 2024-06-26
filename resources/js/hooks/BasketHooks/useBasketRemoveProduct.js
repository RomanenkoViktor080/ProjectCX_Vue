import {useStore} from "vuex";
import {computed} from "vue";

export default function useBasketRemoveProduct() {
    const store = useStore();
    const products = computed(() => store.state.basket.basketProducts);
    const isAuth = computed(() => store.state.user.isAuth);

    function deleteItemFunction(id) {
        if (products.value.some(product => Number(product?.id) === Number(id))) {
            store.dispatch('changeBasketRemoveProduct', id);
            if (isAuth.value) {
                axios.delete(`/api/basket/${id}`);
            }
        }

    }

    return deleteItemFunction;
};

