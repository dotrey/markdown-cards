<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeftIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  title: string;
  subtitle?: string;
}>();

const hasSubtitle = computed(() => {
  return !!props.subtitle;
});
</script>

<template>
  <header @click="() => $router.back()">
    <ChevronLeftIcon class="backlink" />
    <h1 :class="{ 'with-subtitle': hasSubtitle }">{{ title }}</h1>
    <h2 v-if="hasSubtitle">{{ subtitle }}</h2>
  </header>
</template>

<style scoped>
header {
  background-color: var(--color-background);
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.backlink {
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  top: calc(50% - 0.75rem);
  left: 0.5rem;
}

h1 {
  font-size: 2.5rem;
  font-weight: normal;
  padding: 0;
  margin: 0 2rem;
  color: var(--color-text);
  line-height: 2;
}

h1.with-subtitle {
  font-size: 2rem;
  line-height: 1;
  margin-top: 1rem;
}

h2 {
  font-size: 1rem;
  font-weight: normal;
  line-height: 2;
}
</style>
