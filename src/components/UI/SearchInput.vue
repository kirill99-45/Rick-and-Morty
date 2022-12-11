<template>
    <div class="input__wrapper">
        <input :placeholder="placeholder" class="input__field" v-model="searchQuery" />
        <button @click="searchHandleClick" class="input__button"><img src="@/assets/search.svg" /></button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    props: {
        placeholder: {
            type: String,
            default: 'Поиск...'
        }
    },
    data() {
        return {
            searchQuery: '',
        }
    },
    methods: {
        searchHandleClick() {
            this.$emit('search', this.searchQuery)
        }
    }
})

</script>

<style scoped lang="scss">
.input__wrapper {
    display: flex;
    column-gap: 0.313em;

    .input__field {
        width: 100%;
        padding: 0.625em;
        border-radius: 6px;
        border: none;
        outline: none;

        &:focus {
            outline: solid $color-green 3px;
        }
    }

    .input__button {
        width: 1.875em;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.313em;
        border: none;
        cursor: pointer;
        background-color: $color-white;

        img {
            width: 100%;
            height: 100%;
            padding: 0.313em;
            object-fit: contain;
        }
    }
}
</style>