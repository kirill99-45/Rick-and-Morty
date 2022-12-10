<template>
    <li class="episode__card">
        <router-link :to="('/episodes/' + episode.id)">
            <h4>Название: <h3 class="card__title">{{ episode.name }}</h3>
            </h4>
            <h4>Серия № <h3>{{ episode.id }}</h3>
            </h4>
            <h4>Дата релиза <h3 class="card__date">{{ episode.air_date }}</h3>
            </h4>
        </router-link>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    props: {
        episode: {
            type: Object,
            required: true,
        }
    }
})

</script>

<style scoped lang="scss">
.episode__card {
    border: solid $color-green;
    background-color: #3c3e44;
    border-radius: 12px;
    padding: 10px;
    overflow: hidden;

    a {
        text-decoration: none;
        color: #f5f5f5;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        align-items: start;
        row-gap: 10px;

        h4 {
            color: #9e9e9e;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            row-gap: 5;
            width: 100%;
            justify-content: center;

            h3 {
                color: #f5f5f5;
            }
            .card__title, .card__date {
                @extend %tpl-text-ellipsis;
                text-align: left;
            }
        }
    }
}
</style>