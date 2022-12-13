<template>
    <div class="characters__wrapper">
        <div class="characters__filters-wrapper">
            <SearchInput class="input" @search="searchCharacters" />
            <CustomSelect :options="options" :filterState="filterState" @setFilter="setFilterState" class="select" />
        </div>
        <hr />
        <ul class="characters__list" v-if="!isLoading">
            <CharacterCard v-for="character in characters" :url="character.url" :key="character.id" />
        </ul>
        <Loader v-else />
        <Pagination :url="url" :currentPage="currentPage" :totalPages="totalPages" @updatePage="changePage" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { CharacterCard } from '@/components/index';
import { ICharacter } from './types';

import { SearchInput, CustomSelect } from '@/components/UI/index';
import { Pagination, Loader } from '@/components/index';

import { fetchData } from '@/helpers/api';

export default defineComponent({
    components: {
        CharacterCard,
        Pagination,
        SearchInput,
        CustomSelect,
        Loader,
    },
    data() {
        return {
            characters: [] as ICharacter[],
            isFilterActive: false,
            filterState: 'All',
            options: ['All', 'Alive', 'Unknown', 'Dead'],
            searchQuery: '',
            isLoading: false,
            url: '',
            currentPage: 1,
            totalPages: 0,
        }
    },
    methods: {
        async fetchCharacters(url = 'https://rickandmortyapi.com/api/character') {
            this.isLoading = true
            await fetchData(url)
                .then(({ data }) => {
                    const { results, info } = data
                    this.characters = results
                    this.totalPages = info.pages
                    this.url = info.next || info.prev
                })
                .catch(error => alert(`Что-то пошло не так: ${error}`))
                .finally(() => this.isLoading = false)
        },
        handleFilterClick() {
            return this.isFilterActive = !this.isFilterActive
        },
        setFilterState(option: string) {
            this.filterState = option
        },
        async changePage({ url, page }: { url: string, page: number }) {
            this.fetchCharacters(url)
            this.currentPage = page
        },
        async searchCharacters(qeury: string) {
            const URL = 'https://rickandmortyapi.com/api/character/?name='
            this.fetchCharacters(URL + qeury)
        }
    },
    watch: {
        async filterState(newFilterState) {
            if (newFilterState === 'All') this.fetchCharacters()
            else {
                const URL = 'https://rickandmortyapi.com/api/character/?name=rick&status='
                this.fetchCharacters(URL + newFilterState)
            }
        },
    },
    mounted() {
        this.fetchCharacters()
    }
})

</script>

<style scoped lang="scss">
.characters__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 1.25em;
    width: 100%;

    .characters__filters-wrapper {
        display: flex;

        .input {
            width: 35em;
        }

        .select {
            width: 9.375em;
            margin-left: 0.625em;

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

    .characters__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.875em;
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