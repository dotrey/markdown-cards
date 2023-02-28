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

<style scoped></style>
