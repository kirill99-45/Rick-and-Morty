<template>
    <div class="home__wrapper">
        <ul>
            <li class="routes-card__wrapper" :class="route.path" title="Перейти" v-for="route in routes">
                <router-link :to="{ name: route.path, query : { status : 'All', page : '1' }}" class="img__wrapper">
                    <img :src="route.img" alt="Изображение ссылки" />
                    <h3>{{ route.title }}</h3>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {
            routes: [
                { path: 'episodes', img: 'https://www.kp.ru/putevoditel/serialy/wp-content/uploads/2021/06/rik-i-morti-4-8.jpg', title: 'Эпизоды' },
                { path: 'characters', img: 'https://proprikol.ru/wp-content/uploads/2020/12/kartinki-rik-i-morti-29.jpg', title: 'Герои'},
                { path: 'locations', img: 'https://preview.redd.it/j6aefx4h98e31.png?auto=webp&s=6d8c306a1e2ae121f5cc6788e458824cb4f824e6', title: 'Локации' },
            ]
        }
    },
})
</script>

<style scoped lang="scss">
.home__wrapper {
    padding: 1.25em;
    width: 100%;

    ul {
        display: grid;
        grid-template-areas:
            'episodes characters'
            'locations locations';
        gap: 1.25em;
        grid-template-rows: 30vh 50vh;

        .episodes {
            grid-area: episodes;
        }

        .characters {
            grid-area: characters;
        }

        .locations {
            grid-area: locations;
        }

        .routes-card__wrapper {
            border-radius: 12px;
            display: flex;
            overflow: hidden;
            position: relative;
            width: 100%;

            .img__wrapper {
                width: 100%;

                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
            }

            h3 {
                position: absolute;
                top: 0.625em;
                left: 0.625em;
                padding: 0.625em 2.5em;
                border-radius: 12px;
                background-color: $color-black;
                color: $color-green;
            }
        }
    }

}

/* MEDIA */

@media (max-width: $breakpoint-tablet) {
    .home__wrapper {
        font-size: 14px;
    }
}

@media (max-width: $breakpoint-mobile) {
    .home__wrapper {
        font-size: 12px;

        ul {
            grid-template-areas:
                'episodes'
                'characters'
                'locations';
            gap: 1.25em;
            grid-template-rows: 30vh 30vh 30vh;
        }
    }
}
</style>