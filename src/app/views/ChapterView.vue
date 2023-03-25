<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
import { useMarkdownCardsStore } from '../stores/markdownCards';
import ChapterCardComponent from '../components/ChapterCardComponent.vue';
import LoadSpinnerComponent from '../components/LoadSpinnerComponent.vue';


const props = defineProps<{
  id: string
}>();

const mdc = useMarkdownCardsStore();
let chapter = mdc.library.chapterMap[props.id];
if (!chapter.isLoaded) {
    chapter.load();
}
</script>

<template>
  <HeaderComponent :title="chapter.title" subtitle="Chapter" />
  <main>
    <LoadSpinnerComponent v-if="!chapter.isLoaded" />
    <ChapterCardComponent v-for="card in chapter.cards" :card="card"/>
  </main>
</template>

<style scoped>
main {
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;

  overflow: auto;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1rem;
  padding: 1rem;
}
</style>
