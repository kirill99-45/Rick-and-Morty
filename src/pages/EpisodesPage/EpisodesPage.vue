<template>
    <div class="episode__wrapper">
        <input v-model="searchQuery" class="episode__input" placeholder="Поиск..." />
        <ul class="episode__seasons-wrapper">
            <li v-for="season in sortedSeasons"
                :class="[season.episodes.length > 0 ? 'episode__season-wrapper' : 'episode__season-hidden']">
                <h2>Сезон {{ season.id }}</h2>
                <ul class="episode__cards-wrapper">
                    <EpisodeCard v-for="episode in season.episodes" :key="episode.id" :episode="episode" />
                </ul>
            </li>
        </ul>
        <nav class="episode__pagination">
            <button class="pagination__button" v-if="prevPage !== null"
                @click="changePage(this.prevPage)">Назад</button>
            <button class="pagination__button" v-if="nextPage !== null"
                @click="changePage(this.nextPage)">Вперед</button>
        </nav>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import EpisodeCard from './EpisodeCard.vue';

export interface IEpisode {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string,
    created: string,
}

interface ISeason {
    id: number,
    episodes: IEpisode[],
    lastEpisode: number,
}

export default defineComponent({
    data() {
        return {
            episodes: [] as IEpisode[],
            totalPages: null as null | number,
            searchQuery: '',
            prevPage: null,
            nextPage: null,
            seasons: [
                { id: 1, episodes: [], lastEpisode: 11 },
                { id: 2, episodes: [], lastEpisode: 21 },
                { id: 3, episodes: [], lastEpisode: 31 },
                { id: 4, episodes: [], lastEpisode: 41 },
                { id: 5, episodes: [], lastEpisode: 51 },
            ] as ISeason[],
        }
    },
    methods: {
        async fetchEpisodes() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/episode')
            const { pages, prev, next } = data.info

            this.episodes = data.results

            this.totalPages = pages
            this.prevPage = prev
            this.nextPage = next
        },
        getSeason(episode: number) {
            if (episode < 12) return 1
            if (episode > 11 && episode < 22) return 2
            if (episode > 22 && episode < 32) return 3
            if (episode > 32 && episode < 42) return 4
            else return 5
        },
        async changePage(url: string | null) {
            if (url !== null) {
                const { data } = await axios.get(url)
                const { pages, prev, next } = data.info

                this.episodes = data.results

                this.totalPages = pages
                this.prevPage = prev
                this.nextPage = next
            }
        }
    },
    computed: {
        searchedEpisodes(): IEpisode[] {
            return this.episodes.filter((episode: IEpisode) => episode.name.toLowerCase().includes(this.searchQuery))
        },
        sortedSeasons(): ISeason[] {
            this.episodes.forEach((episode: IEpisode) => {
                this.seasons[this.getSeason(episode.id) - 1].episodes.push(episode)
            })
            return this.seasons
        },
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
.episode__wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 80%;
    padding: 20px;
    overflow: hidden;
    row-gap: 30px;

    .episode__input {
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: none;
        outline: none;

        &:focus {
            outline: solid $color-green 3px;
        }
    }

    .episode__seasons-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        row-gap: 40px;

        .episode__season-wrapper {
            display: flex;
            flex-direction: column;
            align-items: start;
            row-gap: 10px;
            position: relative;

            &:not(:last-child):after {
                content: '';
                position: absolute;
                bottom: -20px;
                left: 0;
                right: 0;
                height: 2px;
                background-color: $color-green;
            }

            .episode__cards-wrapper {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
        }

        .episode__season-hidden {
            display: none;
        }
    }

    .episode__pagination {
        width: 100%;
        display: block;

        .pagination__button {
            background-color: $color-white;
            padding: 20px;
            margin-left: 10px;
            font-size: 20px;
            border: none;
            outline: none;
            opacity: 0.3;
            transition: 0.2s;
            cursor: pointer;
            text-decoration: none;
            font-weight: 800;

            &:hover {
                opacity: 1;
                transition: 0.2s;
            }

            &:active {
                outline: none;
            }
        }

        .pagination__button-active {
            @extend .pagination__button;
            opacity: 1;

        }

    }
}
</style>