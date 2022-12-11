<template>
    <div class="locations__filter-wrapper">
        <input placeholder="Поиск..." class="locations__input" v-model="searchQuery" />
        <button @click="searchLocation" class="characters__button"><img src="@/assets/search.svg" /></button>
    </div>
</template>

<script lang="ts">

export default ({
    data() {
        return {
            searchQuery: '',
        }
    }
})

</script>

<style scoped lang="scss">
.locations__filter-wrapper {
    display: flex;

    .locations__input {
        width: 100%;
        padding: 10px;
        border-radius: 6px;
        border: none;
        outline: none;

        &:focus {
            outline: solid $color-green 3px;
        }
    }

    .characters__button {
        width: 30px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 5px;
        border: none;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            padding: 5px;
            object-fit: contain;
        }
    }
}
</style>