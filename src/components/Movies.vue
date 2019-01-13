<template>
    <div class="container">
        <div id="movies">
            <p v-if="!movies">Loading movies...</p>
            <div id="movie" v-else v-for="movie in movies" v-bind:key="movie.id" @click="getMovie(movie.id)">
                <p>Id: {{ movie.id }}</p>
                <p>Title: {{ movie.title }}</p>
                <p>Release Date: {{ movie.releaseDate }}</p>
                <p>Image URL: {{ movie.imageUrl }}</p>
                <p>Genres: {{ movie.genres }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
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
            .then(response => {
                console.log(response.data)
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
