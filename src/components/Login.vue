<template>
    <div class="container">
        <form @submit.prevent="login">
            <div class="alert alert-danger" v-if="error">
                {{ error }}
            </div>
            <div class="form-group">
                <input class="form-control" v-model="username" placeholder="Username" type="text">
            </div>
            <div class="form-group">
                <input class="form-control" v-model="password" placeholder="Password" type="password">
            </div>
            <button class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import { connection } from "@/variables"
    
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                error: null
            }
        },
        methods: {
            async login() {
                this.error = null
                if (this.username.length < 4 || this.password.length < 4) {
                    this.error = 'Something was not filled in correctly'
                    return
                }
                await axios.post(connection + '/auth/login', {
                    username: this.username,
                    password: this.password
                }).then(response => {
                    console.log(response)
                    localStorage.setItem('user', JSON.stringify(response.data))
                    this.$router.go(this.$router.currentRoute)
                }).catch(error => {
                    console.log(error)
                    this.error = error
                })
            }
        }
    }
</script>
