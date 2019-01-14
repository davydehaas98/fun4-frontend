<template>
    <div class="login">
        <div class="alert alert-danger" v-if="error">
            {{ error }}
        </div>
        <form @submit.prevent="login">
            <div class="form-group">
                <input class="form-control" name="username" v-model="username" placeholder="Username" type="text">
            </div>
            <div class="form-group">
                <input class="form-control" name="password" v-model="password" placeholder="Password" type="password">
            </div>
            <button class="btn btn-primary" name="login">Login</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import { connection } from '@/variables'
    import { EventBus } from '@/eventBus'
    
    export default {
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
                if (this.username.length < 3 || this.username.length > 32) {
                    return this.error = 'Username is not the correct length'
                } else if (this.password.length < 6 || this.password.length > 32) {
                    return this.error = 'Password is not the correct length'
                }
                await axios.post(connection + '/auth/login', {
                    username: this.username,
                    password: this.password,
                }).then(response => {
                    if (response.data != '') {
                        localStorage.setItem('user', JSON.stringify(response.data))
                        EventBus.$emit('userLogged')
                        this.$router.push('/')
                    } else {
                        this.error = 'Username or password was not filled in correctly'
                    }
                }).catch(error => {
                    this.error = error
                })
            }
        },
        beforeMount() {
            localStorage.removeItem('user')
        }
    }
</script>
