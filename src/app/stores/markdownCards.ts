import { MarkdownCards } from '@/core/MarkdownCards';
import type { Chapter } from '@/core/model/Chapter';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

export const useMarkdownCardsStore = defineStore('markdownCards', () => {
    const library = ref(new MarkdownCards());
    const enabledChapters = ref<string[]>([]);

    function enableChapter(chapter: Chapter|Chapter[]) {
        library.value.enableChapter(chapter)
            .then((set) => {
                enabledChapters.value = [...set.chapters];
            });        
    }

    function disableChapter(chapter: Chapter|Chapter[]) {
        library.value.disableChapter(chapter)
            .then((set) => {
                enabledChapters.value = [...set.chapters];
            });        
    }

    (() => {
        library.value.getQuizSet()
            .then((set) => {
                enabledChapters.value = [...set.chapters];
            });
    })();

    return {
        library, enabledChapters, enableChapter, disableChapter
    }
});
