<template>
    <nav>
        <router-link :to="{ name: 'home' }">Главная</router-link>
        <router-link :to="{ name: 'episodes' }" exact-path> Эпизоды</router-link>
        <router-link :to="{ name: 'characters' }" exact-path> Герои</router-link>
        <router-link :to="{ name: 'locations' }" exact-path> Локации</router-link>
    </nav>
</template>

<script lang="ts">

export default {
}

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
    padding: 1.875em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    column-gap: 1.875em;

    .router-link-exact-path-active {
        border: solid red;
    }

    .active {
        border: solid red;
    }

    a {
        font-weight: bold;
        color: $color-black;
        position: relative;
        text-decoration: none;

        &:not(:last-child):after {
            content: '|';
            position: absolute;
            top: 0;
            bottom: 0;
            right: -15px;
            margin-left: 15px;
            color: $color-black;
        }

        &.router-link-active {
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

/* MEDIA */ 

@media (max-width: $breakpoint-tablet) {
    nav {
        font-size: 14px;
    }
}

@media (max-width: $breakpoint-mobile-mini) {
    nav {
        font-size: 12px;
    }
}

</style>