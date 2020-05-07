import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'


Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        name: 'Index',
        component: Index
    },
    {

        path:'/filmDetails',
        name: 'filmDetails',
        component: () => import('../views/FilmDetails.vue'),
        props: castRouteParamsId
    },
    {
    path: '*',
    redirect: '/'
  }];

    function castRouteParamsId(route) {
        return {
            id: Number(route.params.id),
        };
    }
const router = new VueRouter({
    mode: 'history',
    routes
});

export default router
