import {createRouter, createWebHistory} from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./Pages/HomePageComponent.vue'),
            name: 'home'
        },
        {
            path: '/catalog/:category',
            component: () => import('./Pages/CategoryPageComponent.vue'),
            name: 'category'
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('./Pages/NotFoundPageComponent.vue'),
            name: '404'
        }
    ]
});
export default router;
