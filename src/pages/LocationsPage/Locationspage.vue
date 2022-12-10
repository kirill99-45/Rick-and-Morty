<template>
    <div class="locations__wrapper">
        <h1>Локации</h1>
        <input placeholder="Поиск..." class="locations__input"/>
        <ul class="locations__list">
            <li v-for="location in locations">
                <router-link :to="'/locations/' + location.id" class="locations__location-card">
                    <h4>Название: <h3>{{ location.name }}</h3></h4>
                    <h4>Тип: <h3>{{ location.type }}</h3></h4>
                    <h4>Измерение: <h3>{{ location.dimension }}</h3></h4>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

export interface ILocation {
    id: number | string,
    name: string,
    type: string,
    dimension: string,
    residents: string[],
    url: string,
    created: string,
}

export default defineComponent({
    data() {
        return {
            locations: [] as ILocation[],
        }
    },
    methods: {
        async fetchLocations() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/location')
            this.locations = data.results
        }
    },
    mounted() {
        this.fetchLocations()
    }
})

</script>

<style scoped lang="scss">

.locations__wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 20px;

    .locations__input {
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: none;
        outline: none;

        &:focus {
            outline: solid $color-green 3px;
        }
    }
    .locations__list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    .locations__location-card {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        text-align: left;
        border: solid $color-white;
        border-radius: 6px;
        padding: 20px;
        text-decoration: none;
        color: $color-white;

        h4 {
            color: #9e9e9e;
            margin-bottom: 5px;

            h3 {
                color: $color-white;
            }
        }

        &:hover {
            border: solid $color-green;
        }
    }
}
}

</style>