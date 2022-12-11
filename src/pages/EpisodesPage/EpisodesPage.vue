<template>
    <div class="episode__wrapper">
        <SearchInput @search="searchEpisode" />
        <ul class="episode__seasons-wrapper" v-if="!isLoading">
            <li v-for="season in sortedSeasons"
                :class="[season.episodes.length > 0 ? 'episode__season-wrapper' : 'episode__season-hidden']">
                <h2>Сезон {{ season.id }}</h2>
                <ul class="episode__cards-wrapper">
                    <EpisodeCard v-for="episode in season.episodes" :key="episode.id" :episode="episode" />
                </ul>
            </li>
        </ul>
        <Loader v-else />
        <Pagination :prevPage="prevPage" :nextPage="nextPage" @changePage="updateEpisodes" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import EpisodeCard from './EpisodeCard.vue';
import { Pagination, SearchInput, Loader } from '@/components/index';

import { changePage, fetchData } from '@/helpers/api';
import { createSeasons, getSeason } from './hepler';
import { IEpisode, ISeason } from './types';

export default defineComponent({
    components: {
        EpisodeCard,
        Pagination,
        SearchInput,
        Loader,
    },
    data() {
        return {
            episodes: [] as IEpisode[],
            searchQuery: '',
            prevPage: null,
            nextPage: null,
            isLoading: false,
        }
    },
    methods: {
        async fetchEpisodes(url = 'https://rickandmortyapi.com/api/episode') {
            this.isLoading = true
            await fetchData(url).then(({ data }) => {
                const { results, info } = data
                this.episodes = results
                this.prevPage = info.prev
                this.nextPage = info.next
            }).catch(error => alert(`Что-то пошло не так: ${error}`)).finally(() => this.isLoading = false)
        },
        async searchEpisode(query: string) {
            const URL = 'https://rickandmortyapi.com/api/episode/?name='
            this.fetchEpisodes(URL + query)
        },
        async updateEpisodes(url: string | null) {
            if (url === null) return

            const { data, prev, next } = await changePage(url)
            this.episodes = data

            this.prevPage = prev
            this.nextPage = next
        }
    },
    computed: {
        sortedSeasons(): ISeason[] {
            const seasons = createSeasons()

            this.episodes.forEach((episode: IEpisode) => {
                seasons[getSeason(episode.id)].episodes.push(episode)
            })

            return seasons
        },
    },
    mounted() {
        this.fetchEpisodes()
    },
})

</script>

<style scoped lang="scss">
.episode__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 1.875em;
    min-height: 100vh;
    width: 100%;

    .episode__filter {
        width: 100%;
        display: flex;

        .episode__input {
            width: 95%;
            padding: 0.625em;
            border-radius: 6px;
            border: none;
            outline: none;

            &:focus {
                outline: solid $color-green 3px;
            }
        }

        .characters__button {
            width: 1.875em;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 0.313em;
            border: none;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                padding: 0.313em;
                object-fit: contain;
            }
        }
    }

    .episode__seasons-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        row-gap: 2.5em;

        .episode__season-wrapper {
            display: flex;
            flex-direction: column;
            align-items: start;
            row-gap: 0.625em;
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
                gap: 0.625em;
            }
        }

        .episode__season-hidden {
            display: none;
        }
    }
}

/* MEDIA */

@media (max-width: $breakpoint-mobile) {
    .episode__wrapper {
        font-size: 14px;
        .episode__seasons-wrapper {

            .episode__season-wrapper {
                .episode__cards-wrapper {
                    width: 100%;
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 0.625em;
                }
            }

        }

    }
}
</style>