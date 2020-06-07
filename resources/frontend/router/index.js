import Vue from 'vue';
import Router from 'vue-router';

/**
 * Layzloading will create many files and slow on compiling, so best not to use lazyloading on devlopment.
 * The syntax is lazyloading, but we convert to proper require() with babel-plugin-syntax-dynamic-import
 * @see https://doc.laravue.dev/guide/advanced/lazy-loading.html
 */

Vue.use(Router);

/* Layout */
import Layout from '@front/layout';

/**
 * Sub-menu only appear when children.length>=1
 * @see https://doc.laravue.dev/guide/essentials/router-and-nav.html
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'routes-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin', 'editor']   Visible for these roles only
    permissions: ['view menu zip', 'manage user'] Visible for these permissions only
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb (default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
 **/

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
    {
        path: '/create-task',
        component: Layout,
        redirect: '/create-task',
        children: [
            {
                path: '',
                component: () => import('../views/new-task/index'),
                name: 'NewTaskPage',
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
