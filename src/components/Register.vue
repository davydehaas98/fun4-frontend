<template>
    <div class="container">
        <form @submit.prevent="register">
            <div class="alert alert-danger" v-if="error">
                {{ error }}
            </div>
            <div class="form-group">
                <input class="form-control" v-model="username" placeholder="Username" type="text">
            </div>
            <div class="form-group">
                <input class="form-control" v-model="password" placeholder="Password" type="password">
            </div>
            <div class="form-group">
                <input class="form-control" v-model="passwordConfirmation" placeholder="Confirm Password" type="password">
            </div>
            <button class="btn btn-primary">Register</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import { connection } from "@/variables"
    
    export default {
        name: 'Register',
        data () {
            return {
                username: '',
                password: '',
                passwordConfirmation: '',
                error: null
            }
        },
        methods: {
            async register() {
                this.error = null
                if (this.username.length < 4 || this.password.length < 4 || this.password !== this.passwordConfirmation) {
                    this.error = 'Something was not filled in correctly'
                    return
                }

                await axios.post(connection + '/auth/register', {
                    username: this.username,
                    password: this.password
                }).then(response => {
                    console.log(response)
                    this.$router.go(this.$router.currentRoute)
                }).catch(error => {
                    console.log(error)
                    this.error = error
                })
            }
        }
    }
</script>
