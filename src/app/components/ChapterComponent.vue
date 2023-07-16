<script setup lang="ts">
import type { Chapter } from '@/core/model/Chapter';
import { computed, ref } from 'vue';
import router from '../router';
import { useMarkdownCardsStore } from '../stores/markdownCards';
import CheckboxComponent from './CheckboxComponent.vue';

const mdc = useMarkdownCardsStore();
const props = defineProps<{
    chapter: Chapter
}>();

const checked = computed<boolean>(() => {
    return mdc.enabledChapters.includes(props.chapter.id);
});
function change(value: boolean) {
    if (value) {
        mdc.enableChapter(props.chapter);
    } else {
        mdc.disableChapter(props.chapter);
    }
}
</script>

<template>
    <div class="chapter shadow" >    
        <label class="checkbox">
            <CheckboxComponent :checked="checked" @change="change"></CheckboxComponent>
        </label>
        <h3 @click="() => router.push({
        name: 'chapter',
        params: {
            id: chapter.id
        }
    })">{{ chapter.title }}</h3>
    </div>
</template>

<style scoped>
.chapter {
    background-color: var(--card-background);
    color: var(--card-text);
    border-radius: 0.5rem;
    
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: auto;
    grid-template-areas: 
        "check title";
}

.chapter h3 {
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
