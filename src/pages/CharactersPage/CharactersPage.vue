<template>
    <div class="characters__wrapper">
        <div class="characters__filters-wrapper">
            <input placeholder="Поиск по имени персонажа..." />
            <div :class="[isFilterActive ? 'select' : 'select-hidden']" @click="handleFilterClick">
                <span>{{ filterState }}</span>
                <img src="@/assets/arrow-down.svg" alt="Close icon" class="icon" />
                <ul class="select__options">
                    <li v-for="option in options"
                        :class="[option === filterState ? 'select__option-hidden' : 'select__option']"
                        @click='setFilterState($event)'
                        >
                        {{ option }}
                    </li>
                </ul>
            </div>
        </div>
        <hr />
        <ul class="characters__list">
            <CharacterCard v-for="character in sortedCharacters" :url="character.url" />
        </ul>
        <ul class="pagination">
            <li v-for="page in getPages">
                {{ page }}
            </li>
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
            characters: [],
            currentPage: 1,
            isFilterActive: false,
            filterState: 'All',
            options: ['All', 'Alive', 'Unknown', 'Dead'],
            pages: 0,
        }
    },
    methods: {
        async fetchCharacters() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/character')
            this.characters = data.results
            this.pages = data.info.pages
        },
        handleFilterClick() {
            return this.isFilterActive = !this.isFilterActive
        },
        setFilterState(event: MouseEvent) {
            const target = event.currentTarget as HTMLElement
            this.filterState = target.innerText
        },
    },
    computed: {
        sortedCharacters(): ICharacter[] {
            if (this.filterState === 'All') {
                return this.characters
            }
            return this.characters.filter((character: ICharacter) => character.status.toLowerCase() === this.filterState.toLowerCase())
        },
        getPages(): number[] {
            return new Array(this.pages).fill(null).map((_, index: number) => index + 1)
        }
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
        column-gap: 30px;

        input {
            width: 40%;
            border-radius: 6px;
            padding: 10px;
            outline: none;
            border: none;
        }

        .select {
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

        li {
            border: solid 1px;
            padding: 2px;
        }
    }
}
</style>