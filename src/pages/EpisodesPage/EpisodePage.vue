<template>
    <div class="episode__wrapper" v-if="!isLoading">
        <header>
            <h2>Эпизод: {{ episode.name }}</h2>
            <h2>Серия №{{ episode.id }}</h2>
        </header>
        <main class="episode__characters-wrapper">
            <h2>Герои</h2>
            <ul class="episode__characters-list">
                <CharacterCard v-for="character in episode.characters" :url="character" />
            </ul>
        </main>
    </div>
    <Loader v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { IEpisode } from './types';
import { fetchData } from '@/helpers/api';

import CharacterCard from '../components/CharacterCard.vue';
import { Loader } from '@/components/index'

export default defineComponent({
    components: {
        CharacterCard,
        Loader,
    },
    data() {
        return {
            episode: {} as IEpisode,
            isLoading: false,
        }
    },
    methods: {
        async fetchEpisode() {
            this.isLoading = true
            const URL = 'https://rickandmortyapi.com/api/episode/'
            await fetchData(URL + this.$route.params.id).then(({ data }) => {
                this.episode = data
            }).catch(error => alert(`Что-то пошло не так: ${error}`)).finally(() => this.isLoading = false)
        },
    },
    mounted() {
        this.fetchEpisode()
    },
})

</script>

<style scoped lang="scss">
.episode__wrapper {
    width: 100%;
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
        row-gap: 0.625em;

        h2 {
            font-weight: 800;
            font-size: 1.875em;
            color: $color-white;
            align-self: start;
        }

        .episode__characters-list {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.875em;
            width: 100%;
        }
    }
}

/* MEDIA */

@media (max-width: $breakpoint-tablet) {
    .episode__wrapper {
        .episode__characters-wrapper {

            .episode__characters-list {
                grid-template-columns: 1fr;
            }
        }
    }
}

@media (max-width: $breakpoint-mobile) {
    .episode__wrapper { 
        font-size: 14px;

        header {
            font-size: 12px;
        }
    }
}

@media (max-width: $breakpoint-mobile-mini) {
    .episode__wrapper { 
        font-size: 12px;

        header {
            font-size: 10px;
        }


    }
}
</style>