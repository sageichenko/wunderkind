import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@front/layout'; //

export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: 'index',
                component: () => import('@front/views/index/index'),
                name: 'IndexPage',
            },
        ],
    },
    {
        path: '/tasks',
        component: Layout,
        redirect: '/tasks',
        children: [
            {
                path: '',
                component: () => import('../views/tasks/index'),
                name: 'TasksPage',
            },
        ],
    },
    {
        path: '/task/:id?/:action',
        component: Layout,
        redirect: '/task',
        children: [
            {
                path: '',
                component: () => import('../views/task/index'),
                props: (route) => ({ id: route.params.id, action: route.params.action }),
                name: 'TaskPage',
            },
        ],
    },
];

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
});

const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset routes
}

export default router;
