<template>
    <h1>{{ state }}</h1>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {
            state : {},
        }
    },
    methods: {
        async fetchEpisode() {
            const response = await axios.get(`https://rickandmortyapi.com/api/episode/${this.$route.params.id}`)
            this.state = response.data
        }
    },
    mounted() {
        this.fetchEpisode()
    },
})

</script>

<style>

</style>