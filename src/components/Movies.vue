<template>
    <div class="container">
        <div id="movies">
            <p v-if="!movies">Loading movies...</p>
            <div id="movie" v-else v-for="movie in movies" v-bind:key="movie.id" @click="getMovie(movie.id)">
                <img id="image" :src="movie.imageUrl" />
                <p id="title">{{ movie.title }}</p>
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
#movies {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
#movie {
    background-color: rgb(0, 0, 0);
    margin: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
#movie:hover {
    opacity: .5;
    cursor: pointer;
}
#image {
    max-height: 300px;
}
#title {
    color: white;
    text-align: center;
}
</style>
