<template>
    <div class="locations__wrapper">
        <h1>Локации</h1>
        <div class="locations__filter-wrapper">
            <input placeholder="Поиск..." class="locations__input" v-model="searchQuery" />
            <button @click="searchLocation" class="characters__button"><img src="@/assets/search.svg" /></button>
        </div>
        <ul class="locations__list">
            <li v-for="location in locations">
                <router-link :to="'/locations/' + location.id" class="locations__location-card">
                    <h4>Название: <h3>{{ location.name }}</h3>
                    </h4>
                    <h4>Тип: <h3>{{ location.type }}</h3>
                    </h4>
                    <h4>Измерение: <h3>{{ location.dimension }}</h3>
                    </h4>
                </router-link>
            </li>
        </ul>
        <nav>
            <ul>
                <li v-for="page in totalPages" :key="page"
                    :class="[currentPage === page ? 'pagination__link-active' : 'pagination__link']"
                    @click="changePage(page)">
                    {{ page }}
                </li>
            </ul>
        </nav>
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
            searchQuery: '',
            currentPage: 1,
            totalPages: 0,
        }
    },
    methods: {
        async fetchLocations() {
            const { data } = await axios.get('https://rickandmortyapi.com/api/location')
            this.locations = data.results
            this.totalPages = data.info.pages
        },
        async searchLocation() {
            try {
                const { data } = await axios.get(`https://rickandmortyapi.com/api/location/?name=${this.searchQuery}`)
                this.locations = data.results
                this.totalPages = data.info.pages
            } catch(e) {
                alert('Что-то пошло не так...')
                this.searchQuery = ''
            }
        },
        changePage(page: number) {
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
    row-gap: 20px;

    .locations__filter-wrapper {
        display: flex;

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

    nav {
        width: 100%;
        padding: 10px;

        ul {
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 10px;

            .pagination__link {
                border: solid $color-white;
                color: $color-white;
                padding: 10px;
                cursor: pointer;

                &:hover {
                    border: solid $color-green;

                }
            }

            .pagination__link-active {
                @extend .pagination__link;
                border: solid $color-green;
            }
        }
    }
}
</style>