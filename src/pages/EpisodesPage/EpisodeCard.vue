<template>
    <li class="episode__card">
        <router-link :to="{ name: 'selected episode', params: { id: episode.id }}">
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
    },
})

</script>

<style scoped lang="scss">
.episode__card {
    background-color: $color-gray;
    border-radius: 12px;
    padding: 0.625em;
    overflow: hidden;
    border: solid $color-gray;


    a {
        text-decoration: none;
        color: $color-white;
        font-size: 1em;
        display: flex;
        flex-direction: column;
        align-items: start;
        row-gap: 0.625em;

        h4 {
            color: $color-light-gray;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            row-gap: 0.313em;
            width: 100%;
            justify-content: center;

            h3 {
                color: $color-white;
            }
            .card__title, .card__date {
                @extend %tpl-text-ellipsis;
                text-align: left;
            }
        }
    }

    &:hover {
        border: solid $color-orange;
    }
}

</style>