<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
import { useMarkdownCardsStore } from '../stores/markdownCards';
import ChapterComponent from '../components/ChapterComponent.vue';

const props = defineProps<{
  id: string
}>();

const mdc = useMarkdownCardsStore();
let book = mdc.library.bookMap[props.id];
</script>

<template>
  <HeaderComponent :title="book.title" subtitle="Book" />
  <main>
    <ChapterComponent v-for="chapter in book.chapters" :chapter="chapter"/>
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
