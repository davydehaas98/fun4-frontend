import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import axios from 'axios'
import { connection } from "@/variables"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
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
    ]
})


function checkAuthentication(to, from, next) {
    try {
        let data = JSON.parse(localStorage.getItem('user'))
        const dataStringified = JSON.stringify(data);
        if (dataStringified != 'null') {
            axios.post(connection + '/auth/token', {
                id: data.id,
                token: data.token
            }).then(response => {
                next()
            }).catch(error => {
                localStorage.removeItem("user")
                next({
                    path: '/',
                    query: { redirect: "home"}
                })
            })
        }
        else {
            localStorage.removeItem("user")
            next({
                path: '/',
                query: { redirect: "home"}
            })
        }
    } catch (e) {
        localStorage.removeItem("user")
        next({
            path: '/',
            query: { redirect: "home"}
        })
    }
}