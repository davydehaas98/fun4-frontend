<template>
    <div class="container">
        <div id="movies">
            <p v-if="!movies">Loading movies...</p>
            <div id="movie" v-else v-for="movie in movies" v-bind:key="movie.id" @click="getMovie(movie.id)">
                <p> {{ movie.id }}</p>
                <p> {{ movie.title }}</p>
                <p> {{ movie.releaseDate }} </p>
                <p> {{ movie.genres }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { connection } from '@/variables'

export default {
    name: 'Movies',
    data() {
        return {
            movies: null,
            error: null
        }
    },
    mounted() {
        this.getMovies()
    },
    methods: {
        async getMovies() {
            await axios.get(connection + '/movies')
            .then(response => {
                this.movies = response.data
            })
            .catch(error => {
                this.error = error
            })
        },
        async getMovie(id) {
            await axios.get(connection + '/movies/' + id)
            .then(repsonse => {
                this.$router.push('/')
            })
        }
    }
}
</script>

<style>
#movie {
    background-color: lightseagreen;
    margin: 20px;
    padding: 20px;
    border-radius: 10px;
}
</style>
