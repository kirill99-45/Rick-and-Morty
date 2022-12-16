<template>
    <div class="character__wrapper" v-if="!isLoading">
        <div class="img__wrapper">
            <img :src="character.image" alt="Изображение героя" />
        </div>
        <div class="character__info">
            <h1>Знакомьтесь, это {{ character.name }}</h1>
            <h2>Биологически вид: {{ character.species }}</h2>
            <h2>Статус: {{ character.status }}</h2>
            <h2>Гендер: {{ character.gender }}</h2>
            <h2>Родом: {{ character.origin?.name }}</h2>
            <h2>Эпизоды</h2>
            <ul class="character__episodes">
                <li v-for="episode in character.episode">
                    <router-link :to="{ name: 'selected episode', params: { id: getEpisodeId(episode) } }"
                        class="character__episode">
                        {{ getEpisodeId(episode) }}
                    </router-link>
                    <div class="character__tooltype">
                        <h3>Название: Pilot</h3>
                        <h3>Дата выхода: December 2, 2013</h3>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <Loader v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ICharacter } from '@/pages/CharactersPage/types';
import { fetchData } from '@/helpers/api';

import { Loader } from '@/components/index'

export default defineComponent({
    components: {
        Loader,
    },
    data() {
        return {
            character: {} as ICharacter,
            isLoading: false,
            isMoreEpisods: false,
        }
    },
    methods: {
        async fetchCharacter() {
            this.isLoading = true
            const URL = 'https://rickandmortyapi.com/api/character/'
            await fetchData(URL + this.$route.params.id).then(({ data }) => {
                console.log(data);
                this.character = data
            }).catch(error => alert(`Что-то пошло не так: ${error}`)).finally(() => this.isLoading = false)
        },
        getEpisodeId(url: string) {
            const array = url.split('/')
            return array[array.length - 1]
        }
    },
    mounted() {
        this.fetchCharacter()
    },
})

</script>

<style scoped lang="scss">
.character__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: $color-white;
    border-radius: 6px;
    overflow: hidden;
    column-gap: 0.625em;

    .img__wrapper {
        width: 30%;
        height: 18.75em;
        border-radius: 12px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }

    .character__info {
        align-self: start;
        padding: 0.625em;
        width: 70%;
        display: flex;
        flex-direction: column;
        text-align: left;
        row-gap: 0.625em;
        background-color: $color-gray;
        border-radius: 12px;
        min-height: 18.75em;

        .character__episodes {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 0.625em;

            li {
                position: relative;

                .character__episode {
                    border: solid 1px;
                    border-radius: 6px;
                    padding: 0.313em;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: $color-white;
                    text-decoration: none;

                    &:hover {
                        border: solid $color-green 1px;
                    }
                }

                .character__tooltype {
                    visibility: hidden;
                    font-size: 14px;
                    position: absolute;
                    bottom: -10px;
                    right: -100%;
                    left: 0;
                    transform: translateY(100%);
                    padding: 5px;
                    border-radius: 6px;
                    background-color: $color-white;
                    color: $color-orange;
                    z-index: 1;
                }

                &:hover {
                    .character__tooltype {
                        visibility: visible;
                    }

                    &:after {
                        content: '';
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: -10px;
                        height: 10px;
                    }
                }
            }
        }
    }
}

/* MEDIA */

@media (max-width: $breakpoint-laptop) {
    .character__wrapper {
        .character__info {
            .character__episodes {
                grid-template-columns: repeat(5, 1fr);
            }
        }
    }
}


@media (max-width: $breakpoint-tablet) {
    .character__wrapper {
        font-size: 14px;

        .character__info {
            .character__episodes {
                grid-template-columns: repeat(4, 1fr);
            }
        }
    }
}

@media (max-width: $breakpoint-mobile) {
    .character__wrapper {
        font-size: 12px;

        .character__info {
            .character__episodes {
                grid-template-columns: repeat(2, 1fr);

                .character__episode {
                    padding: 0.625em;
                }
            }
        }
    }
}
</style>