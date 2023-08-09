import './bootstrap';
import '../../resources/sass/app.scss'
import {createApp} from 'vue';
import AppVueComponent from './components/App.vue';
import router from "./router.js";

const appVue = createApp(AppVueComponent);
appVue.mount('#app');
appVue.use(router);
