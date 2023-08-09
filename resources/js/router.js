import {createRouter, createWebHistory} from 'vue-router';
import HomePageComponent from "./Pages/HomePageComponent.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => HomePageComponent,
            name: 'home'
        }
    ]
});
export default router;
