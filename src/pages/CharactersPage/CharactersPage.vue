<template>
    <div class="characters__wrapper">
        <div class="characters__filters-wrapper">
            <input placeholder="Поиск по имени персонажа..." v-model="searchQuery" />
            <button @click="searchCHaracters" class="characters__button"><img src="@/assets/search.svg" /></button>
            <div :class="[isFilterActive ? 'select' : 'select-hidden']" @click="handleFilterClick">
                <span>{{ filterState }}</span>
                <img src="@/assets/arrow-down.svg" alt="Close icon" class="icon" />
                <ul class="select__options">
                    <li v-for="option in options"
                        :class="[option === filterState ? 'select__option-hidden' : 'select__option']"
                        @click='setFilterState(option)'>
                        {{ option }}
                    </li>
                </ul>
            </div>
        </div>
        <hr />
        <ul class="characters__list">
            <CharacterCard v-for="character in characters" :url="character.url" :key="character.id" />
        </ul>
        <ul class="pagination">
            <!-- <li v-for="page in totalPages" :key="page"
                :class="[currentPage === page ? 'pagination__link-active' : 'pagination__link']"
                @click="changePage(page)">
                {{ page }}
            </li> -->
            <button class="pagination__button" v-if='prevPage !== null' @click="changePage(prevPage)">Назад</button>
            <button class="pagination__button" v-if='nextPage !== null' @click="changePage(nextPage)">Вперед</button>
        </ul>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import CharacterCard from './../components/CharacterCard.vue';
import { ICharacter } from './../components/CharacterCard.vue';

export default defineComponent({
    data() {
        return {
            characters: [] as ICharacter[],
            currentPage: 1,
            isFilterActive: false,
            filterState: 'All',
            options: ['All', 'Alive', 'Unknown', 'Dead'],
            totalPages: 0,
            searchQuery: '',
            prevPage: null as null | string,
            nextPage: null as null | string,
        }
    },
    methods: {
        async fetchCharacters() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/character', {
                params: {
                    page: this.currentPage,
                }
            })
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
        scrollToTop() {
            window.scrollTo(0, 0)
        },
        async changePage(url: string) {
            console.log(this.nextPage)
            
            const { data } = await axios.get(url)
            this.characters = data.results
            console.log(data.info);
            
            this.nextPage = data.info.next
            this.prevPage = data.info.prev
            this.scrollToTop()
        },
        async searchCHaracters() {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${this.searchQuery}`)
            this.characters = data.results
            this.totalPages = data.info.pages
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
                if (data.info.next) this.nextPage = data.info.next
                if (data.info.prev) this.prevPage = data.info.prev
                // this.totalPages = data.info.pages
                this.characters = data.results
            } else {
                this.fetchCharacters()
            }
        },
    },
    components: {
        CharacterCard,
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

        .select {
            margin-left: 20px;
            display: flex;
            position: relative;
            width: 150px;
            justify-content: center;
            align-items: center;
            background-color: white;
            position: relative;
            border-radius: 6px;
            cursor: pointer;

            .icon {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 10px;
                width: 18px;
                height: 18px;
            }

            .select__options {
                position: absolute;
                width: 100%;
                left: 50%;
                bottom: -10px;
                transform: translate(-50%, 100%);
                background-color: white;
                border-radius: 6px;
                overflow: hidden;

                .select__option-hidden {
                    display: none;
                }

                .select__option {
                    padding: 10px;

                    &:not(:last-child) {
                        border-bottom: solid 1px;
                    }

                    &:hover {
                        background-color: #9e9e9e;
                    }
                }
            }
        }

        .select-hidden {
            @extend .select;
            overflow: hidden;
        }
    }

    .characters__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }

    .pagination {
        height: 50px;
        color: white;
        display: flex;
        column-gap: 10px;
        justify-content: center;
        align-items: center;

        .pagination__link {
            border: solid 1px;
            padding: 2px;
            cursor: pointer;
        }

        .pagination__link-active {
            @extend .pagination__link;
            border: $color-green solid 1px;
        }

        .pagination__button {
            color: $color-white;
            text-decoration: none;
            border: solid $color-white;
            padding: 10px 20px;
            border-radius: 6px;
            transition: 0.2s;
            color: black;
            cursor: pointer;

            &:hover {
                color: #ff9800;
                transform: scale(105%);
                transition: 0.2s;
            }
        }
    }
}
</style>