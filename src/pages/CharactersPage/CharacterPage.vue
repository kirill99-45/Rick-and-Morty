<template>
    <div class="character__wrapper">
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
                    <router-link :to="'/episodes/' + episode.split('/').at(-1)" class="character__episode">
                        {{ episode.split('/').at(-1) }}
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { ICharacter } from '../components/CharacterCard.vue';

export default defineComponent({
    data() {
        return {
            character: {} as ICharacter,
        }
    },
    methods: {
        async fetchCharacter() {
            const { id } = this.$route.params
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            this.character = data
        },

    },
    mounted() {
        this.fetchCharacter()
    },
})

</script>

<style scoped lang="scss">
.character__wrapper {
    width: 80%;
    display: flex;
    justify-content: space-between;
    background-color: #3c3e44;
    color: $color-white;
    border-radius: 6px;
    overflow: hidden;

    .img__wrapper {
        width: 40%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .character__info {
        align-self: start;
        padding: 10px;
        width: 60%;
        display: flex;
        flex-direction: column;
        text-align: left;
        row-gap: 10px;

        .character__episodes {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 10px;

            .character__episode {
                border: solid 1px;
                border-radius: 12px;
                padding: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: $color-white;
                text-decoration: none;

                &:hover {
                    border: solid $color-green 1px;
                }
            }
        }
    }
}
</style>