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
        <!-- <nav class="episode__pagination">
            <ul class="paganation__wrapper">
            <router-link :to="'/episodes/' + page" v-for="page in getPages" :key="page"
                :class="[page === getCurrentPage ? 'pagination__button-active' : 'pagination__button']">
                <li>
                    {{ page }}
                </li>
            </router-link>
            </ul>
        </nav> -->
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
            pages: 0,
            searchQuery: '',
            totalCount: 0,
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
        async fetchEpisodes(page: string | number) {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/episode?&page=${page}`)
            this.episodes = data.results
            this.pages = data.info.pages
        },
    },
    computed: {
        searchedEpisodes(): IEpisode[] {
            return this.episodes.filter((episode: IEpisode) => episode.name.toLowerCase().includes(this.searchQuery))
        },
        sortedSeasons(): ISeason[] {
            let currentEpisode = 0 // Так как нам нужно пройти по массиву всех сезонов и мы будем обращаться по индексу тукещего сезона, то начинаем с нуля       
            return this.seasons.map((season: ISeason, index: number) => {
                for (let i = currentEpisode; i < season.lastEpisode; i += 1) {
                    if (this.episodes[currentEpisode] !== undefined) {
                        season.episodes.push(this.episodes[currentEpisode]) // Здесь мы добавляем каждому эпизоду указание на сезон, к которому он относится
                        currentEpisode += 1
                    }
                }
                return season
            })
        },
        getPages(): string[] {
            return new Array(this.pages).fill(null).map((_, pageNumber) => {
                const page = pageNumber + 1
                return page.toString()
            })
        },
        // getCurrentPage() {
        //     console.log(this.$route.params);
            
        //     return this.$route.params.page
        // },
    },
    mounted() {
        this.fetchEpisodes(1)
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
        .paganation__wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
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
}
</style>