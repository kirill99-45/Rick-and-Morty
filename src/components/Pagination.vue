<template>
    <nav class="pagination">
        <button class="pagination__button" v-if="prevPage !== null" @click="changePage(prevPage)">Назад</button>
        <button class="pagination__button" v-if="nextPage !== null" @click="changePage(nextPage)">Вперед</button>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    props: {
        nextPage: {
            required: true,
        },
        prevPage: {
            required: true,
        },
    },
    methods: {
        changePage(url: string | null) {
            if (url !== null) {
                this.$emit('changePage', url)
                this.scrollToTop()
            }
        },
        scrollToTop() {
            window.scrollTo(0,0)
        }
    }
})

</script>

<style scoped lang="scss">
.pagination {
    width: 100%;
    display: block;

    .pagination__button {
        background-color: $color-white;
        padding: 1.25em;
        margin-left: 0.625em;
        font-size: 1em;
        border: none;
        outline: none;
        opacity: 0.3;
        transition: 0.2s;
        cursor: pointer;
        text-decoration: none;
        border-radius: 6px;

        &:hover {
            opacity: 1;
            transition: 0.2s;
            transform: scale(105%);
            color: $color-orange;
        }

        &:active {
            outline: none;
        }
    }

    .pagination__button-active {
        @extend .pagination__button;
        opacity: 1;
    }

}
</style>