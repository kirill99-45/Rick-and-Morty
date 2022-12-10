<template>
    <nav>
        <router-link to="/">Главная страница</router-link>
        <router-link to="/episodes">Эпизоды</router-link>
        <router-link to="/characters">Герои</router-link>
        <router-link to="/locations">Локации</router-link>
    </nav>
</template>

<script lang="ts">

export default {}

</script>

<style lang="scss" scoped>

%line-below-link {
    content: '';
    position: absolute;
    bottom: -5px;
    right: -5px;
    left: -5px;
    height: 2px;
    background-color: $color-green;
}

nav {
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    column-gap: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;
        position: relative;
        text-decoration: none;

        &:not(:last-child):after {
            content: '|';
            position: absolute;
            top: 0;
            bottom: 0;
            right: -15px;
            margin-left: 15px;
            color: #2c3e50;
        }

        &.router-link-exact-active {
            color: $color-green;

            &:before {
                @extend %line-below-link;
            }
        }

        &:hover:before {
            @extend %line-below-link;
        }

        &:focus {
            outline: none;
            transform: scale(105%);
        }

        &:focus::before {
            @extend %line-below-link;
        }
    }
}
</style>