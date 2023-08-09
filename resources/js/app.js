import './bootstrap';
import '../../resources/sass/app.scss'
import {createApp} from 'vue'
import AppVueComponent from './components/App.vue';
import router from "./router.js";
import store from "./store";
import vuex from 'vuex'
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPhone, faUser, faBars, faMagnifyingGlass, faUsers, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


library.add(faPhone, faUser, faBars, faMagnifyingGlass, faUsers, faCartShopping);
const Vue = createApp(AppVueComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(store);
Vue.use(router);
Vue.mount('.wrapper');
