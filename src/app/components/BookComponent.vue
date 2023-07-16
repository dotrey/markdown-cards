<script setup lang="ts">
import type { Book } from '@/core/model/Book';
import { computed, ref } from 'vue';
import router from '../router';
import { useMarkdownCardsStore } from '../stores/markdownCards';
import CheckboxComponent from './CheckboxComponent.vue';

const mdc = useMarkdownCardsStore();
const props = defineProps<{
    book: Book
}>();
const checked = computed<boolean>(() => {
    let enabled: number = 0;
    for (const chapter of props.book.chapters) {
        enabled += mdc.enabledChapters.includes(chapter.id) ? 1 : 0;
    }
    partial.value = enabled < props.book.chapters.length;
    return enabled > 0;
});
const partial = ref<boolean>(false);
function change(value: boolean) {
    if (value) {
        mdc.enableChapter(props.book.chapters);
    } else {
        mdc.disableChapter(props.book.chapters);
    }
}
</script>

<template>
    <div class="book shadow">
        <h3 @click="() => router.push({
        name: 'book',
        params: {
            id: book.id
        }
    })">{{  book.title }}</h3>
        <label class="checkbox">
            <CheckboxComponent :checked="checked" :partial="partial" @change="change"></CheckboxComponent>
        </label>
        <div>
        </div>
    </div>
</template>

<style scoped>
.book {
    background-color: var(--card-background);
    color: var(--card-text);
    border-radius: 0.5rem;

    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: auto auto;
    grid-template-areas: 
        "check title"
        "status status"
    ;
}

.book h3 {
    grid-area: title;
    justify-self: start;
    align-self: center;
    padding: 1rem;
    margin: 0;
    font-size: 1.25rem;
}

.checkbox {
    grid-area: check;
    justify-self: center;
    align-self: center;
    width: 2rem;
    height: 2rem;
} 
</style>
