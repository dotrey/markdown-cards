<script setup lang="ts">
import HeaderComponent from '../components/HeaderComponent.vue';
import { useMarkdownCardsStore } from '../stores/markdownCards';
import BookComponent from '../components/BookComponent.vue';

const mdc = useMarkdownCardsStore();
</script>

<template>
  <HeaderComponent title="Library" />
  <main>
    <BookComponent v-for="book in mdc.library.books" :book="book"/>
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
