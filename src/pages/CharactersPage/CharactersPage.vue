<template>
    <div class="characters__wrapper">
        <div class="characters__filters-wrapper">
            <SearchInput />
            <CustomSelect :options="options" :filterState="filterState" @setFilter="setFilterState(option)"/>
        </div>
        <hr />
        <ul class="characters__list">
            <CharacterCard v-for="character in characters" :url="character.url" :key="character.id" />
        </ul>
        <Pagination :prevPage="prevPage" :nextPage="nextPage" @changePage="changePage" />
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import CharacterCard from './../components/CharacterCard.vue';
import { ICharacter } from './../components/CharacterCard.vue';
import { Pagination, SearchInput, CustomSelect } from '@/components/index';

export default defineComponent({
    data() {
        return {
            characters: [] as ICharacter[],
            isFilterActive: false,
            filterState: 'All',
            options: ['All', 'Alive', 'Unknown', 'Dead'],
            searchQuery: '',
            prevPage: null as null | string,
            nextPage: null as null | string,
        }
    },
    methods: {
        async fetchCharacters() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/character')
            this.characters = data.results
            if (data.info.next) this.nextPage = data.info.next
            if (data.info.prev) this.prevPage = data.info.prev
        },
        handleFilterClick() {
            return this.isFilterActive = !this.isFilterActive
        },
        setFilterState(option: string) {
            this.filterState = option
        },
        async changePage(url: string | null) {
            if (url !== null) {
                const { data } = await axios.get(url)
                this.characters = data.results

                this.nextPage = data.info.next
                this.prevPage = data.info.prev
            }
        },
        async searchCHaracters() {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${this.searchQuery}`)
            this.characters = data.results
        }
    },
    computed: {
        sortedCharacters(): ICharacter[] {
            if (this.filterState === 'All') {
                return this.characters
            }
            return this.characters.filter((character: ICharacter) => character.status.toLowerCase() === this.filterState.toLowerCase())
        },
    },
    watch: {
        async filterState(newValue) {
            if (newValue !== 'All') {
                const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=rick&status=${this.filterState.toLowerCase()}`)
                const { prev, next } = data.info

                this.nextPage = next
                this.prevPage = prev

                this.characters = data.results
            } else {
                this.fetchCharacters()
            }
        },
    },
    components: {
        CharacterCard,
        Pagination,
        SearchInput,
        CustomSelect,
    },
    mounted() {
        this.fetchCharacters()
    }
})

</script>

<style scoped lang="scss">
.characters__wrapper {
    padding: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .characters__filters-wrapper {
        display: flex;

        input {
            width: 40%;
            border-radius: 6px;
            padding: 10px;
            outline: none;
            border: none;
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
    .characters__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }
}
</style>