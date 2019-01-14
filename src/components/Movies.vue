<template>
    <div class="movies">
        <p v-if="!movies">Loading movies...</p>
        <router-link v-else v-for="movie in movies" :key="movie.id" :to="{ path: 'movie', query: { id: movie.id.toString() }}" id="movie">
            <img id="image" :src="movie.imageUrl" />
            <p id="title">{{ movie.title }}</p>
        </router-link>
    </div>
</template>

<script>
    import axios from 'axios'
    import { connection } from '@/variables'

    export default {
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
            }
        }
    }
</script>

<style>
.movies {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}
#movie {
    background-color: rgb(0, 0, 0);
    margin: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-decoration-line: none;
}
#movie:hover {
    opacity: .7;
    cursor: pointer;
}
#image {
    height: 300px;
}
#title {
    color: rgb(255, 255, 255);
    text-align: center;
}
</style>
