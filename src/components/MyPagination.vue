<template>
    <nav class="pagination">
        <ul class="pagination__pages-wrapper">
            <button v-if="currentPage > 4" class="pagination__button" @click="updatePage(1)">В начало</button>
            <li v-for="page in getPages" class="pages__page"
                :class="[currentPage === page ? 'active' : '']" @click="updatePage(page)">
                {{ page }}
            </li>
            <div v-if="currentPage + 4 < totalPages" class="pages__separate-wrapper">
                <span>...</span>
                <li class="pages__page" @click="updatePage(totalPages)">{{ totalPages }}</li>
            </div>
            <button v-if="currentPage + 1 <= totalPages" class="pagination__button"
                @click="updatePage(currentPage + 1)">Дальше</button>
        </ul>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    props: {
        url: {
            required: true,
            type: String,
        },
        totalPages: {
            required: true,
            type: Number,
        },
        currentPage: {
            required: true,
            type: Number,
        }
    },
    methods: {
        updatePage(page: string | number) {
            const newPage = `page=${page}`

            const res = this.url.replace(/page=([0-9][0-9]{0,2})/, newPage)
            this.$emit('updatePage', { url: res, page: page })

            this.scrollToTop()
        },
        scrollToTop() {
            window.scrollTo(0, 0)
        }
    },
    computed: {
        getPages() {
            const result = []

            const currentPage: any = this.currentPage

            const { start, end } = currentPage > 2 ?
                { start: currentPage - 2, end: currentPage + 2 } :
                { start: currentPage - 1, end: currentPage + 4 }

            for (let i = start; i < end; i += 1) {
                if (i <= this.totalPages && i !== 0) result.push(i)
            }
            return result
        }
    },
    mounted() {
        console.log(this.url);
        
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

    .pagination__pages-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;

        .pages__page {
            color: $color-white;
            padding: 1.25em;
            outline: solid $color-white 1px;
            border-radius: 6px;
            cursor: pointer;

            &:hover {
                outline: solid $color-green 2px;
            }

            &.active {
                outline: solid $color-green 2px;

            }
        }

        .pages__separate-wrapper {
            color: $color-white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            column-gap: 10px;

        }
    }

}
</style>