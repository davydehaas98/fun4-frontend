import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Movie from '@/views/Movie.vue'
import { connection } from '@/variables'
import axios from 'axios'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            beforeEnter: checkAuth
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/movie',
            name: 'movie',
            component: Movie,
            props: (route) => ({
                id: route.query.id
            }),
            beforeEnter: checkAuth
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})

function checkAuth(to, from, next) {
    var user = JSON.parse(localStorage.getItem('user'))

    if (user != null) {
        axios.post(connection + '/auth/token', {
            id: user.id,
            token: user.token
        }).then(() => {
                next()
        }).catch(() => {
                localStorage.removeItem('user')
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            })
        }
    else {
        localStorage.removeItem('user')
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    }
}