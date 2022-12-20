<template>
    <div class="characters__wrapper">
        <div class="characters__filters-wrapper">
            <my-search-input class="input" @search="searchCharacters" />
            <my-select :options="options" :filterState="filterState" @setFilter="setFilterState" class="select" />
        </div>
        <hr />
        <ul class="characters__list" v-show="!isLoading">
            <character-card v-for="character in characters" :url="character.url" :key="character.id" />
        </ul>
        <my-loader v-show="isLoading" />
        <my-pagination :url="url" :currentPage="currentPage" :totalPages="totalPages" @updatePage="changePage"
            class="characters__pagination" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { CharacterCard } from '@/components/index';
import { ICharacter } from './types';

import { MySearchInput, MySelect } from '@/components/UI/index';
import { MyPagination, MyLoader } from '@/components/index';

import { fetchData } from '@/helpers/api';

export default defineComponent({
    components: {
        CharacterCard,
        MyPagination,
        MySearchInput,
        MySelect,
        MyLoader,
    },
    data() {
        return {
            characters: [] as ICharacter[],
            filterState: '',
            options: ['All', 'Alive', 'Unknown', 'Dead'],
            searchQuery: '',
            isLoading: false,
            url: '',
            currentPage: 1 as number,
            totalPages: 0,
        }
    },
    methods: {
        async fetchCharacters(url = 'https://rickandmortyapi.com/api/character') {
            if (Number(this.$route.query.page) !== 1 && url === 'https://rickandmortyapi.com/api/character') {
                url = `https://rickandmortyapi.com/api/character?page=${this.$route.query.page}`
            }

            this.isLoading = true
            await fetchData(url)

                .then(({ data }) => {
                    const { results, info } = data

                    this.characters = results
                    this.totalPages = info.pages

                    this.url = info.prev || info.next

                    this.currentPage = Number(this.$route.query.page)
                    this.filterState = this.$route.query.status?.toString() || 'All'
                })
                .catch(error => alert(`Что-то пошло не так: ${error}`))
                .finally(() => this.isLoading = false)
        },
        setFilterState(option: string) {

            if (option === this.filterState) return
            this.$router.push({ query: { page: 1, status: option } })

            if (option === 'All') this.fetchCharacters()

            else {
                const URL = 'https://rickandmortyapi.com/api/character/?status='
                this.fetchCharacters(URL + option)
            }
        },
        async changePage({ url, page }: { url: string, page: number }) {
            this.$router.push({ query: { page: page, status: this.filterState } })
            this.fetchCharacters(url)
        },
        async searchCharacters(query: string) {
            const URL = 'https://rickandmortyapi.com/api/character/?name='
            this.fetchCharacters(URL + query)
        },
    },
    mounted() {
        if (this.$route.query.status?.toString() !== 'All') {
            const URL = `https://rickandmortyapi.com/api/character/?page=${this.$route.query.page || 1}&status=${this.$route.query.status}`
            this.fetchCharacters(URL)
        } else {
            this.fetchCharacters()
        }
    }
})

</script>

<style scoped lang="scss">
.characters__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 1.25em;
    width: 100%;
    min-height: 80vh;

    .characters__filters-wrapper {
        display: flex;

        .input {
            width: 35em;
        }

        .select {
            width: 9.375em;
            margin-left: 0.625em;
        }
    }

    .characters__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(auto-fill, 1fr);
        gap: 1.875em;
        min-height: 100vh;
    }
}

/* MEDIA */

@media (max-width: $breakpoint-tablet) {
    .characters__wrapper {
        .characters__list {
            grid-template-columns: 1fr;

        }
    }
}

@media (max-width: $breakpoint-mobile) {
    .characters__wrapper {
        font-size: 14px;
    }
}

@media (max-width: $breakpoint-mobile-mini) {
    .characters__wrapper {
        font-size: 12px;
    }
}
</style>