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

import { MySearchInput, MySelect } from '@/components/UI/index';
import { MyPagination, MyLoader } from '@/components/index';

import { mapActions, mapState } from 'vuex';

export default defineComponent({
    components: {
        CharacterCard,
        MyPagination,
        MySearchInput,
        MySelect,
        MyLoader,
    },
    methods: {
        ...mapActions({
            fetchCharacters: 'characters/fetchCharacters',
            setFilterState: 'characters/setFilterState',
            changePage: 'characters/changePage',
            searchCharacters: 'characters/searchCharacters',
        }),
    },
    computed: {
        ...mapState({
            characters: (state: any) => state.characters.characters,
            isFilterActive: (state: any) => state.characters.isFilterActive,
            filterState: (state: any) => state.characters.filterState,
            options: (state: any) => state.characters.options,
            searchQuery: (state: any) => state.characters.searchQuery,
            currentPage: (state: any) => state.characters.currentPage,
            totalPages: (state: any) => state.characters.totalPages,
            isLoading: (state: any) => state.characters.isLoading,
            url: (state: any) => state.characters.url,
        }),
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