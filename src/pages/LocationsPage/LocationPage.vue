<template>
    <div class="location__wrapper">
        <div class="location__info">
            <h1>Планета: <span>{{ location.name }}</span></h1>
            <h2>Измерение: <span>{{ location.dimension }}</span></h2>
        </div>
        <div class="location__characters-wrapper">
            <h3>Жители:</h3>
            <hr />
            <ul v-if="location.residents?.length > 0">
                <CharacterCard v-for="character in location.residents" :url="character" />
            </ul>
            <h3 v-else class="location__characters-emty">Видимо тут пусто...</h3>
        </div>
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .location__info {
        display: flex;
        flex-direction: column;
        align-items: start;
        row-gap: 5px;

        h1, h2 {
            color: #9e9e9e;
            font-size: 18px;

            span {
                color: $color-white;
                font-size: 20px;
            }
        }
    }

    .location__characters-wrapper {
        display: flex;
        flex-direction: column;
        row-gap: 20px;

        h3 {
            text-align: left;
            font-size: 26px;
            color: $color-white;
            font-weight: 800;
        }

        ul {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
        }

        .location__characters-emty {
            text-align: center;
        }
    }
}
</style>

<!-- Локации
- Переход на страницу-карточку локации, где
отобразить основную информацию и всех жителей, с
навигацией по ним. -->