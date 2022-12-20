<template>
    <li class="character-card" v-if="!isLoading">
        <div class="img__wrapper">
            <img :src="character.image" />
        </div>
        <div class="character-card__info">
            <h3 class="character-card__name">{{ character.name }}</h3>
            <div>
                <h3 class="character-card__status">
                    <div class="circle" :style="{ background: circleColor }"></div>
                    {{ character.status }} - {{ character.species }}
                </h3>
            </div>
            <h3 class="character-card__location">
                Location:
                <router-link :to="{ name: 'selected location', params: { id: getLocationId } }">{{
                        character.location?.name
                }}</router-link>
            </h3>
            <router-link :to="{ name: 'selected character', params: { id: getCharacterId } }"
                class="character-card__link ">
                Узнать больше
            </router-link>
        </div>
    </li>
</template>

<script lang="ts">
import { fetchData } from '@/helpers/api';

import { defineComponent } from 'vue';
import { ICharacter } from '@/pages/CharactersPage/types';

import { MyLoader } from '@/components/index';


export default defineComponent({
    components: {
        MyLoader,
    },
    props: {
        url: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            character: {} as ICharacter,
            circleColor: '',
            isLoading: true,
            location: ''
        }
    },
    methods: {
        async getChatacter() {
            await fetchData(this.url).then(({ data }) => {
                this.character = data
                this.getCircleColor()
            }).catch(error => alert(`Что-то пошло не так: ${error}`)).finally(() => {
                this.isLoading = false
            })
        },
        getCircleColor() {
            const colors = { green: '#55cc44', red: '#d63d2e', gray: '#9e9e9e' }

            const status = this.character.status.toLowerCase()

            if (status === 'alive') this.circleColor = colors.green
            else if (status === 'dead') this.circleColor = colors.red
            else this.circleColor = colors.gray
        },
    },
    computed: {
        getCharacterId(): string {
            const array = this.url.split('/')
            return array[array.length - 1]
        },
        getLocationId() {
            return this.character.url.split('/').reverse()[0]
        }
    },
    mounted() {
        this.getChatacter()
    },
})

</script>

<style scoped lang="scss">
.character-card {
    display: flex;
    background-color: $color-gray;
    border-radius: 12px;
    overflow: hidden;
    border: solid $color-gray;
    outline: none;

    &:hover {
        border: solid $color-orange;
    }

    .img__wrapper {
        width: 50%;
        height: 100%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .character-card__info {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-between;
        width: 50%;
        color: $color-orange;
        row-gap: 1.25em;

        .character-card__name {
            text-align: left;
            font-size: 1.5em;
            font-weight: 800;
        }

        .character-card__status {
            display: flex;
            position: relative;
            padding-left: 0.625em;
            font-size: 1em;
            color: $color-white;

            .circle {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: $color-white;
            }

        }

        .character-card__location {
            text-align: left;
            color: $color-light-gray;
            font-size: 0.875em;

            a {
                text-decoration: none;
                color: $color-white;
                color: $color-white;
                font-size: 1em;
                font-weight: normal;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        .character-card__link {
            color: $color-white;
            text-decoration: none;
            border: solid $color-white;
            padding: 0.625em 1.25em;
            border-radius: 6px;
            transition: 0.2s;

            &:hover {
                color: $color-orange;
                transform: scale(105%);
                transition: 0.2s;
            }

            &:focus {
                outline: none;
                color: $color-orange;
                border: solid $color-orange;
            }
        }
    }
}
</style>