<template>
    <header class="header">
        <nav class="navbar navbar-light">
            <div class="container">
                <router-link class="nav-link" to="/">Home</router-link>
                <router-link v-if="!isLogged" class="nav-link" to="/login">Login</router-link>
                <router-link v-if="!isLogged" class="nav-link" to="/register">Register</router-link>
                <button v-else class="nav-link btn btn-success" @click="logout">Logout</button>
            </div>
        </nav>
    </header>
</template>

<script>
    import { EventBus } from '@/eventBus'

    export default {
        data() {
            return {
                isLogged: this.userLogged()
            }
        },
        methods: {
            userLogged() {
                if (localStorage.getItem('user')) {
                    return true
                }
                return false
            },
            logout () {
                localStorage.removeItem('user')
                this.isLogged = this.userLogged()
                this.$router.push('/login')
            }
        },
        created() {
            EventBus.$on('userLogged', () => {
                this.isLogged = this.userLogged()
            })
        }
    }
</script>


<style>
.navbar {
    background-color: black;
}
</style>
