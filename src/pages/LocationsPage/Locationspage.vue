<template>
    <div class="locations__wrapper">
        <SearchInput />
        <ul class="locations__list">
            <li v-for="location in locations">
                <router-link :to="{ name: 'selected location', params: { id : location.id }}" class="locations__location-card">
                    <h4>Название: <h3>{{ location.name }}</h3>
                    </h4>
                    <h4>Тип: <h3>{{ location.type }}</h3>
                    </h4>
                    <h4>Измерение: <h3>{{ location.dimension }}</h3>
                    </h4>
                </router-link>
            </li>
        </ul>
        <Pagination :prevPage="prevPage" :nextPage="nextPage" @changePage="changePage" />
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { Pagination, SearchInput } from '@/components/index';

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
            searchQuery: '',
            prevPage: null as null | string,
            nextPage: null as null | string,
        }
    },
    methods: {
        async fetchLocations() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/location')
            const { prev, next } = data.info

            this.prevPage = prev
            this.nextPage = next

            this.locations = data.results
        },
        async searchLocation() {
            try {
                const { data } = await axios.get(`https://rickandmortyapi.com/api/location/?name=${this.searchQuery}`)
                this.locations = data.results
            } catch (e) {
                alert('Что-то пошло не так...')
                this.searchQuery = ''
            }
        },
        async changePage(url: string | null) {
            if (url !== null) {
                const { data } = await axios.get(url)

                const { prev, next } = data.info

                this.prevPage = prev
                this.nextPage = next

                this.locations = data.results
            }
        }
    },
    components: {
        Pagination,
        SearchInput,
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
    padding: 20px;
    width: 80%;

    .locations__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;

        .locations__location-card {
            display: grid;
            grid-template-rows: repeat(3, 1fr);
            text-align: left;
            border-radius: 6px;
            padding: 20px;
            text-decoration: none;
            color: $color-white;
            background-color: #3c3e44;

            h4 {
                color: #9e9e9e;
                margin-bottom: 5px;

                h3 {
                    color: $color-white;
                }
            }

            &:hover {
                outline: solid $color-orange;
            }
        }
    }

}
</style>