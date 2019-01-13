<template>
  <div id="app">
    <Header />
    <router-view id="router-view"/>
    <!-- <Footer /> -->
  </div>
</template>

<script>
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'

    export default {
        components: {
            Header,
            //Footer
        }
    }
</script>

<style>
#app {
    justify-content: space-between;
}
#router-view {
    padding: 50px;
    align-items: center;
}
</style>

