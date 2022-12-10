<template>
    <li class="episode__character-card">
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
                    <span>{{ character.location?.name }}</span>
                </h3>
            <router-link to="/" class="character-card__link">
                Узнать больше
            </router-link>
        </div>
    </li>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';

interface ICharacter {
    created: string,
    name: string,
    episode: string[],
    gender: string,
    id: number,
    image: string,
    location: {
        name: string,
        url: string,
    },
    origin: {
        name: string,
        url: string,
    },
    species: string,
    status: string,
    type: string,
    url: string,
}

export default defineComponent({
    data() {
        return {
            character: {} as ICharacter,
            circleColor: '',
        }
    },
    props: {
        url: {
            type: String,
            required: true,
        }
    },
    methods: {
        async getAll() {
            const { data } = await axios.get(this.url)
            this.character = data
            this.circleColor = this.getCircleColor(data.status)
        },
        getCircleColor(status: string) {
            const GREEN = '#55cc44'
            const RED = '#d63d2e'
            const GRAY = '#9e9e9e'

            status = status.toLowerCase()
            if (status === 'alive') return GREEN
            else if (status === 'dead') return RED
            else return GRAY
        }
    },
    mounted() {
        this.getAll()
    }
})

</script>

<style scoped lang="scss">
.episode__character-card {
    display: flex;
    background-color: #3c3e44;
    border-radius: 12px;
    overflow: hidden;

    &:hover {
        outline: solid #ff9800;
    }
    .img__wrapper {
        width: 50%;
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
        color: #ff9800;
        row-gap: 20px;

        .character-card__name {
            text-align: left;
            font-size: 24px;
            font-weight: 800;
        }

        .character-card__status {
            display: flex;
            position: relative;
            padding-left: 10px;
            font-size: 16px;
            color: $color-white;

            .circle {
                position: absolute;
                left: 0; top: 50%;
                transform: translateY(-50%);
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: white;
            }
            
        }

        .character-card__location {
            text-align: left;
            color: #9e9e9e;
            font-size: 14px;

            span {
                color: $color-white;
                font-size: 16px;
                font-weight: normal;

            }
        }

        .character-card__link {
            color: $color-white;
            text-decoration: none;
            border: solid $color-white;
            padding: 10px 20px;
            border-radius: 6px;
            transition: 0.2s;

            &:hover {
                color: #ff9800;
                transform: scale(105%);
                transition: 0.2s;
            }
        }
    }
}
</style>