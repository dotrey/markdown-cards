<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useMarkdownCardsStore } from './stores/markdownCards';
const mdc = useMarkdownCardsStore();
mdc.library.load();
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
