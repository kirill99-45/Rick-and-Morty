<template>
    <div class="home__wrapper">
        <ul>
            <li class="routes-card__wrapper" title="Перейти">
                <router-link to="/episodes">
                    <img src="https://www.kp.ru/putevoditel/serialy/wp-content/uploads/2021/06/rik-i-morti-4-8.jpg" alt="Изображение ссылки"/>
                    <h3>Эпизоды</h3>
                </router-link>
            </li>
            <li class="routes-card__wrapper" title="Перейти">
                <router-link to="/characters">
                    <img src="https://proprikol.ru/wp-content/uploads/2020/12/kartinki-rik-i-morti-29.jpg" alt="Изображение ссылки"/>
                    <h3>Герои</h3>
                </router-link>
            </li>
            <li class="routes-card__wrapper" title="Перейти">
                <router-link to="/locations">
                    <img
                        src="https://preview.redd.it/j6aefx4h98e31.png?auto=webp&s=6d8c306a1e2ae121f5cc6788e458824cb4f824e6" alt="Изображение ссылки"/>
                    <h3>Локации</h3>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {

        }
    }
}

</script>

<style scoped lang="scss">
.home__wrapper {

    ul {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        .routes-card__wrapper {
            width: 800px;
            height: 300px;
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