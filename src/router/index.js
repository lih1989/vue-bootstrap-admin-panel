import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminPanel from '../views/AdminPanel.vue'
import Auth from '../views/Auth.vue'
import Contacts from '../views/admin/Contacts.vue'
import Profile from '../views/admin/Profile'
import Home from '../views/admin/Home'
import Root from '../views/admin/Root'
import Crm from '../views/admin/Crm'
import NotFound from '../views/NotFound'
import store from '../store'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: AdminPanel,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                name: 'root',
                path: '/',
                redirect: {name: 'home'},
                component: Root,
                children: [
                    {
                        name: 'home',
                        path: '/',
                        component: Home,
                        meta: {
                            breadcrumbs: [{title: 'Главная', toName: 'root'}]
                        },
                    },
                    {
                        name: 'profile',
                        path: 'profile',
                        component: Profile,
                        meta: {
                            breadcrumbs: [
                                {title: 'Главная', toName: 'root'},
                                {title: 'Профиль пользователя', toName: 'profile'}
                            ]
                        },
                    },
                ]
            },
            {
                name: 'crm',
                redirect: {name: 'contacts'},
                path: 'crm',
                component: Crm,
                children: [
                    {
                        name: 'contacts',
                        path: 'contacts',
                        component: Contacts,
                        meta: {
                            breadcrumbs: [
                                {title: 'Главная', toName: 'root'},
                                {title: 'CRM', toName: 'crm'},
                                {title: 'Контакты', toName: 'contacts'}
                            ]
                        },
                    },
                ]
            },
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
    },
    {
        path: '*',
        redirect: '/404'
    }
];

const router = new VueRouter({
    mode: 'hash',
    base:  process.env.NODE_ENV === 'production'
        ? '/vue-bootstrap-admin-panel/#/'
        : '/',
    routes
});

router.beforeEach((to, from, next) => {
    // console.warn(from.name, from.path, ' ---> ', to.name, store.getters['isToken']);
    // целевой маршрут требует авторизации?
    if (to.matched.some(route => route.meta.requiresAuth)) {
        // При наличии токена пропускаю дальше
        if (store.getters['isToken']) {
            next();
        } else {
            // возвращаем к авторизации
            next({name: 'Auth'});
        }
    } else {
        next();
    }
});

export default router
