<template>
    <div class="characters__wrapper">
        <ul class="characters__list">
            <CharacterCard v-for="character in characters" :url="character.url" />
        </ul>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import CharacterCard from './../components/CharacterCard.vue';

export default defineComponent({
    data() {
        return {
            characters: [],
            currentPage: 1,
        }
    },
    methods: {
        async fetchCharacters() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/character')

            this.characters = data.results
            console.log(data.results);

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
    .characters__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }
}
</style>