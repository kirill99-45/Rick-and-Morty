<template>
    <div class="episode__wrapper">
        <SearchInput />
        <ul class="episode__seasons-wrapper">
            <li v-for="season in sortedSeasons"
                :class="[season.episodes.length > 0 ? 'episode__season-wrapper' : 'episode__season-hidden']">
                <h2>Сезон {{ season.id }}</h2>
                <ul class="episode__cards-wrapper">
                    <EpisodeCard v-for="episode in season.episodes" :key="episode.id" :episode="episode" />
                </ul>
            </li>
        </ul>
        <Pagination :prevPage="prevPage" :nextPage="nextPage" @changePage="changePage" />
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { Pagination, SearchInput } from '@/components/index';
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
            searchQuery: '',
            prevPage: null,
            nextPage: null,
        }
    },
    methods: {
        async fetchEpisodes() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/episode')
            const { prev, next } = data.info

            this.episodes = data.results

            this.prevPage = prev
            this.nextPage = next
        },
        async searchEpisode() {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${this.searchQuery}`)

            const { prev, next } = data.info

            this.episodes = data.results

            this.prevPage = prev
            this.nextPage = next
        },
        getSeason(episode: number) {
            if (episode < 12) return 1
            if (episode > 11 && episode < 22) return 2
            if (episode > 21 && episode < 32) return 3
            if (episode > 31 && episode < 42) return 4
            else return 5
        },
        async changePage(url: string | null) {
            if (url !== null) {
                const { data } = await axios.get(url)
                const { pages, prev, next } = data.info

                this.episodes = data.results

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
            const seasons: ISeason[] = [
                { id: 1, episodes: [], lastEpisode: 11 },
                { id: 2, episodes: [], lastEpisode: 21 },
                { id: 3, episodes: [], lastEpisode: 31 },
                { id: 4, episodes: [], lastEpisode: 41 },
                { id: 5, episodes: [], lastEpisode: 51 },
            ]

            this.episodes.forEach((episode: IEpisode) => {
                seasons[this.getSeason(episode.id) - 1].episodes.push(episode)
            })
            return seasons
        },
    },
    mounted() {
        this.fetchEpisodes()
    },
    components: {
        EpisodeCard,
        Pagination,
        SearchInput,
    }
})

</script>

<style scoped lang="scss">
.episode__wrapper {
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: 20px;
    overflow: hidden;
    row-gap: 30px;
    min-height: 100vh;

    .episode__filter {
        width: 100%;
        display: flex;

        .episode__input {
            width: 95%;
            padding: 10px;
            border-radius: 6px;
            border: none;
            outline: none;

            &:focus {
                outline: solid $color-green 3px;
            }
        }

        .characters__button {
            width: 30px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 5px;
            border: none;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                padding: 5px;
                object-fit: contain;
            }
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
}
</style>