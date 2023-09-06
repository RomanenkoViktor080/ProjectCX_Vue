import {createRouter, createWebHistory} from 'vue-router';
const User = {
    template: `<div>User {{ $route.params.id }}</div>`,
}

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
            component: () => import('./Pages/CatalogPageComponent.vue'),
            name: 'category'
        },
        {
            path: '/basket',
            component: () => import('./Pages/BasketPage.vue'),
            name: 'basket'
        },
        {
            path: '/profile',
            component: () => import('./Pages/ProfilePageComponent.vue'),
            name: 'profile',
            children: [
                {
                    path: '',
                    component: () => import('./components/Content/Profile/ProfileDesktopHomeComponent.vue'),
                    name: 'profile-home'
                },
                {
                    path: 'settings',
                    component: () => import('./components/Content/Profile/ProfileSettingsComponent.vue'),
                    name: 'settings'
                }
            ]
        },
        {
            path: '/:catchAll(.*)',
            component: () => import('./Pages/NotFoundPageComponent.vue'),
            name: '404'
        }
    ]
});
export default router;
