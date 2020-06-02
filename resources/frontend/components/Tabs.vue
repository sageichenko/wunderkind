<template>
    <keep-alive>
        <div class="tabs">
            <div
                v-for="(tabOptions, id) in options"
                :key="(tabOptions, id)"
                class="tabs__item"
            >
                <big-tag :options="getTabOptions(tabOptions, id)" @select="selectTag" />
            </div>
        </div>
    </keep-alive>
</template>

<script>
    import BigTag from '@front/components/BigTag';

    export default {
        name: 'Tabs',
        components: {
            BigTag,
        },
        props: {
            options: {
                type: Object,
                required: true,
                default: () => {},
            },
        },
        methods: {
            selectTag(tagId) {
                for (const tabId in this.options) {
                    if (!this.options.hasOwnProperty(tabId)) {
                        return;
                    }
                    this.options[tabId].active = tabId === tagId;
                }

                this.$emit('change', tagId);
            },
            getTabOptions(tabOptions, id) {
                return Object.assign(tabOptions, { id: id });
            },
        },
    };
</script>

<style lang="scss">
    @import "@front/styles/_variables.scss";

    .tabs {
        &__item {
            display: inline-block;
            margin: .5rem 1rem .5rem 0;
            flex: none;

            @media #{$tablet} {
                margin-right: 1.6rem;
            }
        }
    }
</style>
