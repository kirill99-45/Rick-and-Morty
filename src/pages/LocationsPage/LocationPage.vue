<template>
    <div class="location__wrapper" v-if="!isLoading">
        <div class="location__info">
            <h1>Планета: <span>{{ location.name }}</span></h1>
            <h2>Измерение: <span>{{ location.dimension }}</span></h2>
        </div>
        <div class="location__characters-wrapper">
            <h3>Герои:</h3>
            <hr />
            <ul v-if="location.residents?.length > 0">
                <CharacterCard v-for="character in location.residents" :url="character" />
            </ul>
            <h3 v-else class="location__characters-emty">Видимо тут пусто...</h3>
        </div>
    </div>
    <Loader v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ILocation } from './types';
import { fetchData } from '@/helpers/api';

import CharacterCard from '../../components/CharacterCard.vue'
import { Loader } from '@/components/index';


export default defineComponent({
    components: {
        CharacterCard,
        Loader,
    },
    data() {
        return {
            location: {} as ILocation,
            isLoading: false,
        }
    },
    methods: {
        async fetchLocation() {
            this.isLoading = true

            const URL = 'https://rickandmortyapi.com/api/location/'

            await fetchData(URL + this.$route.params.id).then(({ data }) => {                                
                this.location = data
            }).catch(error => alert(`Что-то пошло не так: ${error}`)).finally(() => this.isLoading = false)
        }
    },
    mounted() {
        this.fetchLocation()
    },
})

</script>

<style scoped lang="scss">
.location__wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1.25em;

    .location__info {
        display: flex;
        flex-direction: column;
        align-items: start;
        row-gap: 0.313em;

        h1,
        h2 {
            color: $color-light-gray;
            font-size: 1.125em;

            span {
                color: $color-white;
                font-size: 1.25em;
            }
        }
    }

    .location__characters-wrapper {
        display: flex;
        flex-direction: column;
        row-gap: 1.25em;

        h3 {
            text-align: left;
            font-size: 1.625em;
            color: $color-white;
            font-weight: 800;
        }

        ul {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25em;
        }

        .location__characters-emty {
            text-align: center;
        }
    }
}

/* MEDIA */

@media (max-width: $breakpoint-tablet) {
    .location__wrapper {
        .location__characters-wrapper {

            ul {
                grid-template-columns: 1fr;
            }
        }
    }
}

@media (max-width: $breakpoint-mobile) {
    .location__wrapper {    
        font-size: 14px;
    }
}

@media (max-width: $breakpoint-mobile-mini) {
    .location__wrapper {    
        font-size: 12px;
    }
}
</style>