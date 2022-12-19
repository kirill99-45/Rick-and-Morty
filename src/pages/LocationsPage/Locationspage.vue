<template>
    <div class="locations__wrapper">
        <my-search-input @search="searchLocation" />
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
        <my-loader v-else />
        <hr />
        <my-pagination :url="url" :currentPage="currentPage" :totalPages="totalPages" @updatePage="changePage"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { MyPagination, MyLoader } from '@/components/index';
import { MySearchInput } from '@/components/UI/index';

import { fetchData } from '@/helpers/api';
import { ILocation } from './types';

export default defineComponent({
    components: {
        MyPagination,
        MySearchInput,
        MyLoader,
    },
    data() {
        return {
            locations: [] as ILocation[],
            searchQuery: '',
            prevPage: null as null | string,
            nextPage: null as null | string,
            isLoading: false,
            url: '',
            currentPage: 1,
            totalPages: 0,
        }
    },
    methods: {
        async fetchLocations(url = 'https://rickandmortyapi.com/api/location') {
            this.isLoading = true
            await fetchData(url)
                .then(({ data }) => {
                    const { results, info } = data
                    this.locations = results
                    this.url = info.prev || info.next
                    this.totalPages = info.pages
                    
                })
                .catch(error => alert(`Что-то пошло не так: ${error}`))
                .finally(() => this.isLoading = false)
        },
        async searchLocation(query: string) {
            const URL = 'https://rickandmortyapi.com/api/location/?name='
            this.fetchLocations(URL + query)
        },
        async changePage({ url, page }:{ url: string, page: number}) {
            this.fetchLocations(url)
            this.currentPage = page
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
            border: solid $color-gray;

            h4 {
                color: $color-light-gray;
                margin-bottom: 0.313em;

                h3 {
                    color: $color-white;
                }
            }

            &:hover {
                border: solid $color-orange;
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