import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

// declare Vue-Router
Vue.use(Router)

// Async components
const Dashboard = () => import('@/components/views/Dashboard')
const Next = () => import('@/components/views/Next')

// Router mapping
const router = new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: {}
        },
        {
            path: '/next',
            name: 'next',
            component: Next,
            meta: {}
        }
    ]
})

// Router guard
router.beforeEach((to, from, next) => {
    // proceed
    if (store.getters.game) {
        store.dispatch('destroyGame')
    } else {
    }
    next()
})

router.afterEach((to, from) => {
    // store.dispatch('initGame', {
    //     width: 500,
    //     height: 500,
    //     el: 'gameScreen',
    //     preload: methods.preload,
    //     create: methods.create,
    //     update: methods.update,
    //     render: methods.render
    // })
})

export default router
