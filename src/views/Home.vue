<template>
  <div class="home">
    <Login />
    <br>
    <Register />
  </div>
</template>

<script>
    import Login from '@/components/Login.vue'
    import Register from '@/components/Register.vue'

    export default {
        name: 'home',
        components: {
            Login,
            Register
        }
    }
</script>
