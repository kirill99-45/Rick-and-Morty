<template>
    <div class="home__wrapper">
        <ul>
            <li class="routes-card__wrapper" :class="route.path" title="Перейти" v-for="route in routes">
                <router-link :to="{ name: route.path }">
                    <img :src="route.img" alt="Изображение ссылки" />
                    <h3>{{ route.title }}</h3>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            routes: [
                { path: 'episodes', img: 'https://www.kp.ru/putevoditel/serialy/wp-content/uploads/2021/06/rik-i-morti-4-8.jpg', title: 'Эпизоды' },
                { path: 'characters', img: 'https://proprikol.ru/wp-content/uploads/2020/12/kartinki-rik-i-morti-29.jpg', title: 'Герои' },
                { path: 'locations', img: 'https://preview.redd.it/j6aefx4h98e31.png?auto=webp&s=6d8c306a1e2ae121f5cc6788e458824cb4f824e6', title: 'Локации' },
            ]
        }
    }
}

</script>

<style scoped lang="scss">
.home__wrapper {
    padding: 20px;

    ul {
        display: grid;
        grid-template-areas:
            'episodes characters'
            'locations locations';
        gap: 20px;
        grid-template-rows: 300px 600px;

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

            img {
                width: 100%;
                aspect-ratio: 16/9;
                object-fit: cover;
            }

            h3 {
                position: absolute;
                top: 10px;
                left: 10px;
                padding: 10px 40px;
                border-radius: 12px;
                background-color: #202329d1;
                color: $color-green;
            }
        }
    }

}
</style>