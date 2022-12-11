<template>
    <div class="locations__wrapper">
        <SearchInput @search="searchLocation" />
        <ul class="locations__list" v-if="!isLoading">
            <li v-for="location in locations">
                <router-link :to="{ name: 'selected location', params: { id: location.id } }"
                    class="locations__location-card">
                    <h4>Название: <h3>{{ location.name }}</h3>
                    </h4>
                    <h4>Тип: <h3>{{ location.type }}</h3>
                    </h4>
                    <h4>Измерение: <h3>{{ location.dimension }}</h3>
                    </h4>
                </router-link>
            </li>
        </ul>
        <Loader v-else />
        <hr />
        <Pagination :prevPage="prevPage" :nextPage="nextPage" @changePage="updateLocations" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Pagination, SearchInput, Loader } from '@/components/index';

import { changePage, fetchData } from '@/helpers/api';
import { ILocation } from './types';

export default defineComponent({
    components: {
        Pagination,
        SearchInput,
        Loader,
    },
    data() {
        return {
            locations: [] as ILocation[],
            searchQuery: '',
            prevPage: null as null | string,
            nextPage: null as null | string,
            isLoading: false,
        }
    },
    methods: {
        async fetchLocations(url = 'https://rickandmortyapi.com/api/location') {
            this.isLoading = true
            await fetchData(url).then(({ data }) => {
                const { results, info } = data
                this.locations = results
                this.prevPage = info.prev
                this.nextPage = info.next
            }).catch(error => alert(`Что-то пошло не так: ${error}`)).finally(() => this.isLoading = false)
        },
        async searchLocation(query: string) {
            const URL = 'https://rickandmortyapi.com/api/location/?name='
            this.fetchLocations(URL + query)
        },
        async updateLocations(url: string | null) {
            if (url === null) return

            const { data, prev, next } = await changePage(url)
            this.locations = data

            this.prevPage = prev
            this.nextPage = next
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
    row-gap: 1.25em;
    width: 100%;
    justify-content: space-between;

    .locations__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25em;

        .locations__location-card {
            display: grid;
            grid-template-rows: repeat(3, 1fr);
            text-align: left;
            border-radius: 6px;
            padding: 1.25em;
            text-decoration: none;
            color: $color-white;
            background-color: $color-gray;

            h4 {
                color: $color-light-gray;
                margin-bottom: 0.313em;

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

/* MEDIA */

@media (max-width: $breakpoint-tablet) {
    .locations__wrapper {
        .locations__list {
            grid-template-columns: 1fr;
        }
    }
}
</style>