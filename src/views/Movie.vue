<template>
  <div class="container">
      <Movie :id="id" />
  </div>
</template>

<script>
    import Movie from '@/components/Movie.vue'

    export default {
        components: {
            Movie
        },
        props: {
            id: String
        }
    }
</script>