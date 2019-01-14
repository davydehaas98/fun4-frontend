<template>
    <div class="register">
        <div class="alert alert-danger" v-if="error">
            {{ error }}
        </div>
        <form @submit.prevent="register">
            <div class="form-group">
                <input class="form-control" name="username" v-model="username" placeholder="Username" type="text">
            </div>
            <div class="form-group">
                <input class="form-control" name="password" v-model="password" placeholder="Password" type="password">
            </div>
            <div class="form-group">
                <input class="form-control"  name="passwordconfirmation" v-model="passwordConfirmation" placeholder="Confirm Password" type="password">
            </div>
            <button class="btn btn-primary" name="register">Register</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import { connection } from '@/variables'

    export default {
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
                if (this.username.length < 3 || this.password.length < 6 || this.password !== this.passwordConfirmation) {
                    this.error = 'Something was not filled in correctly'
                    return
                }

                await axios.post(connection + '/auth/register', {
                    username: this.username,
                    password: this.password
                }).then(response => {
                    if (response.data != '') {
                        this.$router.push('/login')
                    }
                }).catch(error => {
                    this.error = error
                })
            }
        }
    }
</script>
