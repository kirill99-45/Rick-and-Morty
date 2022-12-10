<template>
    <h1>
        <h3>{{ totalCount }}</h3>
        <ul class="episode__cards-wrapper">
            <EpisodeCard v-for="episode in episodes" :key="episode.id" :episode="episode"/>
        </ul>
    </h1>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import EpisodeCard from './EpisodeCard.vue';

export default defineComponent({
    data() {
        return {
            episodes: [],
            pages: null,
            totalCount: null,
        }
    },
    methods: {
        async fetchEpisodes() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/episode')
            this.episodes = data.results
            this.pages = data.info.pages
            this.totalCount = data.info.count
        }
    },
    mounted() {
        this.fetchEpisodes()
    },
    components: {
        EpisodeCard,
    }
})

</script>

<style scoped lang="scss">
.episode__cards-wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}
</style>