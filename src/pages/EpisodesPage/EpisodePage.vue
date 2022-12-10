<template>
    <div class="episode__wrapper">
        <header>
            <h2>Название: {{ episode.name }}</h2>
            <h2>Серия №{{ episode.id }}</h2>
        </header>
        <main class="episode__characters-wrapper">
            <h2>Герои</h2>
            <ul class="episode__characters-list">
                <CharacterCard v-for="character in episode.characters" :url="character" />
            </ul>
        </main>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { IEpisode } from './EpisodesPage.vue';
import CharacterCard from '../components/CharacterCard.vue';


export default defineComponent({
    data() {
        return {
            episode: {} as IEpisode,
        }
    },
    methods: {
        async fetchEpisode() {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/episode/${this.$route.params.id}`)
            this.episode = data
        },
    },
    components: {
        CharacterCard,
    },
    mounted() {
        this.fetchEpisode()
    },
})

</script>

<style scoped lang="scss">
.episode__wrapper {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;

    header {
        width: 100%;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }

    .episode__characters-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;

        h2 {
            font-weight: 800;
            font-size: 30px;
            color: $color-white;
            align-self: start;
        }

        .episode__characters-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
            width: 100%;
        }
    }
}
</style>