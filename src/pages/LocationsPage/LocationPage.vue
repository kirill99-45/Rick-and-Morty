<template>
    <div class="location__wrapper">
        <h2>Страница локации {{ location.name }} !!!!</h2>
        <h3>Жители</h3>
        <ul>
            <CharacterCard v-for="character in location.residents" :url="character" />
        </ul>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { ILocation } from './Locationspage.vue';
import CharacterCard from './../components/CharacterCard.vue'

export default defineComponent({
    data() {
        return {
            location: {} as ILocation,
        }
    },
    methods: {
        async fetchLocation() {
            const { id } = this.$route.params
            const { data } = await axios.get(`https://rickandmortyapi.com/api/location/${id}`)
            this.location = data
        }
    },
    mounted() {
        this.fetchLocation()
    },
    components: {
        CharacterCard,
    }
})

</script>

<style scoped lang="scss">
.location__wrapper {
    width: 80%;

    ul {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
}
</style>

<!-- Локации
- Переход на страницу-карточку локации, где
отобразить основную информацию и всех жителей, с
навигацией по ним. -->