import { MarkdownCards } from '@/core/MarkdownCards';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useMarkdownCardsStore = defineStore('markdownCards', () => {
    const library = ref(new MarkdownCards());

    return {
        library
    }
});
