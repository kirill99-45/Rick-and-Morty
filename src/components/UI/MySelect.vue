<template>
    <div :class="[isSelectActive ? 'select' : 'select-hidden']" @click="selectHandleClick">
        <span>{{ filterState }}</span>
        <img src="@/assets/arrow-down.svg" alt="Close icon" class="icon" />
        <ul class="select__options" @click="selectHandleClick">
            <li v-for="option in options" :class="[option === filterState ? 'select__option-hidden' : 'select__option']"
                @click='setFilterState(option)' :key="option">
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    props: {
        options: {
            type: Array as PropType<string[]>,
            required: true,
        },
        filterState: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isSelectActive: false,
        }
    },
    methods: {
        setFilterState(option: string) {
            this.$emit('setFilter', option)
            this.isSelectActive = false
            
        },
        selectHandleClick() {
            this.isSelectActive = !this.isSelectActive
        },
        getClick(event: MouseEvent) {
            if (this.isSelectActive) {

                const target = (event.target as HTMLElement)
                const parentWrapper = target.closest('.select')

                if (!parentWrapper) {
                    this.isSelectActive = false
                }
            }
        }
    },
    mounted() {
        window.addEventListener('click', this.getClick)
    },
    unmounted() {
        window.removeEventListener('click', this.getClick)
        
    },
})

</script>

<style scoped lang="scss">
.select {
    display: flex;
    position: relative;
    width: 150px;
    justify-content: center;
    align-items: center;
    background-color: white;
    position: relative;
    border-radius: 6px;
    cursor: pointer;

    .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.625em;
        width: 1.125em;
        height: 1.125em;
    }

    .select__options {
        position: absolute;
        width: 100%;
        left: 50%;
        bottom: -10px;
        transform: translate(-50%, 100%);
        background-color: white;
        border-radius: 6px;
        overflow: hidden;

        .select__option-hidden {
            display: none;
        }

        .select__option {
            padding: 10px;

            &:not(:last-child) {
                border-bottom: solid 1px;
            }

            &:hover {
                background-color: #9e9e9e;
            }
        }
    }
}

.select-hidden {
    @extend .select;
    overflow: hidden;
}
</style>