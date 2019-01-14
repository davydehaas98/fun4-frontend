<template>
    <div v-if="movie" class="movie" :id="id">
        <img id="image" :src="movie.imageUrl" />
        <p>{{ movie.title }}</p>
    </div>
</template>

<script>
    import axios from 'axios'
    import { connection } from '@/variables'

    export default {
        props: {
            id: String
        },
        data() {
            return {
                movieId: null,
                movie: null
            }
        },
        async mounted() {
            this.movieId = parseInt(this.id)
            this.getMovie()
        },
        methods: {
            async getMovie() {
                await axios.get(connection + '/movies/' + this.movieId)
                .then(response => {
                    this.movie = response.data
                }).catch()
            }
        }
    }
</script>
