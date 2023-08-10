import './bootstrap';
import '../../resources/sass/app.scss'
import {createApp} from 'vue'
import AppVueComponent from './components/App.vue';
import router from "./router.js";
import store from "./store";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faBars, faCartShopping, faMagnifyingGlass, faPhone, faUser, faUsers, faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";


library.add(faPhone, faUser, faBars, faMagnifyingGlass, faUsers, faCartShopping, faAngleDown);
const Vue = createApp(AppVueComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(router);
Vue.use(store);
Vue.mount('.wrapper');
