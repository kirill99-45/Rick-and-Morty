<template>
    <div class="character__wrapper" v-if="!isLoading">
        <div class="img__wrapper">
            <img :src="character.image" alt="Изображение героя" @click="openModal" on.k />
        </div>
        <div class="character__info">
            <h1>Знакомьтесь, это {{ character.name }}</h1>
            <h2>Биологически вид: {{ character.species }}</h2>
            <h2 class="character__status">Статус: <span :style="{ background: circleColor }"></span> {{ character.status
            }}</h2>
            <h2>Гендер: {{ character.gender }}</h2>
            <h2>Родом: {{ character.origin?.name }}</h2>
            <h2>Эпизоды</h2>
            <ul class="character__episodes">
                <li v-for="episode in character.episode">
                    <router-link :to="{ name: 'selected episode', params: { id: getEpisodeId(episode) } }"
                        class="character__episode" @mouseover="handleMouse(episode)">
                        {{ getEpisodeId(episode) }}
                    </router-link>
                    <div class="character__tooltype">
                        <span>Название: <h3>{{ episodes[getCurrentEpisode(episode)]?.name }}</h3></span>
                        <span>Релиз: <h3>{{ episodes[getCurrentEpisode(episode)]?.air_date }}</h3></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="modal__layout" v-if="isModal" @click="clickOutOfModal">
        <div class="modal__wrapper">
            <img :src="character.image" />
            <div class="icon__wrapper" @click="closeModal">
                <img src="@/assets/xmark.svg" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ICharacter } from '@/pages/CharactersPage/types';
import { IEpisode } from '../EpisodesPage/types';
import { fetchData } from '@/helpers/api';

export default defineComponent({
    data() {
        return {
            character: {} as ICharacter,
            isLoading: false,
            isMoreEpisods: false,
            episodes: {} as { [key: string]: IEpisode },
            circleColor: 'white',
            isModal: false,
        }
    },
    methods: {
        async fetchCharacter() {
            this.isLoading = true
            const URL = 'https://rickandmortyapi.com/api/character/'
            await fetchData(URL + this.$route.params.id)
                .then(({ data }) => {
                    this.character = data
                    this.getCircleColor()

                })
                .catch(error => alert(`Что-то пошло не так: ${error}`))
                .finally(() => this.isLoading = false)
        },
        getEpisodeId(url: string) {
            const array = url.split('/')
            return array[array.length - 1]
        },
        getCurrentEpisode(episode: string): string {
            return episode.split('/').reverse()[0]
        },
        async handleMouse(episode: string) {
            const currentEpisode = this.getCurrentEpisode(episode)
            if (this.episodes[currentEpisode]) return


            await fetchData(episode).then(({ data }) => {
                this.episodes[currentEpisode] = data
            })
        },
        getCircleColor() {
            const colors = { green: '#55cc44', red: '#d63d2e', gray: '#9e9e9e' }

            const status = this.character.status.toLowerCase()

            if (status === 'alive') this.circleColor = colors.green
            else if (status === 'dead') this.circleColor = colors.red
            else this.circleColor = colors.gray
        },
        openModal() {
            this.isModal = true
        },
        closeModal() {
            this.isModal = false
        },
        clickOutOfModal(event: MouseEvent) {
            if (!this.isModal) return
            const target = (event.target as HTMLElement)
            if (!target.closest('.modal__wrapper')) {
                this.isModal = false
            }
        }
    },
    mounted() {
        this.fetchCharacter()
    },
})

</script>

<style scoped lang="scss">
.modal__layout {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000db;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal__wrapper {
        width: 50%;
        height: 60%;
        border-radius: 12px;
        overflow: hidden;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .icon__wrapper {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 20px;
            height: 20px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}

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
        cursor: pointer;

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

        .character__status {

            span {
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                transform: translateY(-50%);
                // border-radius: 50%;
            }
        }

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
                    position: relative;

                    &:hover {
                        border: solid $color-green 1px;
                    }

                }

                .character__tooltype {
                    visibility: hidden;
                    font-size: 14px;
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translate(-50%, 100%);
                    padding: 5px;
                    border-radius: 6px;
                    background-color: $color-white;
                    color: $color-green;
                    z-index: 1;

                    span {
                        color: $color-black;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        padding: 10px;

                        h3 {
                            color: $color-green;
                            text-align: center;
                        }
                    }
                }

                &:hover {
                    .character__tooltype {
                        visibility: visible;

                        &:before {
                            content: '';
                            position: absolute;
                            width: 12px;
                            height: 12px;
                            transform: rotate(45deg);
                            top: -6px;
                            left: 50%;
                            background-color: $color-white;
                        }
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