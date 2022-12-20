<template>
    <div class="episode__wrapper">
        <my-search-input @search="searchEpisode" />
        <ul class="episode__seasons-wrapper" v-if="!isLoading">
            <li v-for="season in getSortedSeasons"
                :class="[season.episodes.length > 0 ? 'episode__season-wrapper' : 'episode__season-hidden']">
                <h2>Сезон {{ season.id }}</h2>
                <ul class="episode__cards-wrapper">
                    <EpisodeCard v-for="episode in season.episodes" :key="episode.id" :episode="episode" />
                </ul>
            </li>
        </ul>
        <my-loader v-else />
        <my-pagination v-if="totalPages > 1" :url="url" :currentPage="currentPage" :totalPages="totalPages"
            @updatePage="changePage" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import EpisodeCard from './EpisodeCard.vue';
import { MySearchInput } from '@/components/UI/index';

import { MyPagination, MyLoader } from '@/components/index';

import { mapActions, mapGetters, mapState } from 'vuex';

export default defineComponent({
    components: {
        EpisodeCard,
        MyPagination,
        MySearchInput,
        MyLoader,
    },
    methods: {
        ...mapActions({
            fetchEpisodes: 'episodes/fetchEpisodes',
            searchEpisode: 'episodes/searchEpisode',
            changePage: 'episodes/changePage',
        })
    },
    computed: {
        ...mapState({
            episodes: (state: any) => state.episodes.episodes,
            searchQuery: (state: any) => state.episodes.searchQuery,
            isLoading: (state: any) => state.episodes.isLoading,
            currentPage: (state: any) => state.episodes.currentPage,
            totalPages: (state: any) => state.episodes.totalPages,
            url: (state: any) => state.episodes.url,
        }),
        ...mapGetters({
            getSortedSeasons: 'episodes/getSortedSeasons',
        }),
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
    width: 100%;
    min-height: 100vh;

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