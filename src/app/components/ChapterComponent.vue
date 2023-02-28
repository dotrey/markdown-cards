<script setup lang="ts">
const props = defineProps(["chapter"]);
</script>

<template>
    <div class="chapter">
        <h3>{{ chapter.title }}</h3>
    </div>
</template>

<style scoped>
.chapter {
    padding: 1rem;
    background-color: var(--color-background);
    border-radius: 0.5rem;
}

.chapter h3 {
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
}
</style>
