<script setup lang="ts">
import router from '../router';

const props = defineProps(["chapter"]);
</script>

<template>
    <div class="chapter shadow" @click="() => router.push({
        name: 'chapter',
        params: {
            id: chapter.id
        }
    })">
        <h3>{{ chapter.title }}</h3>
    </div>
</template>

<style scoped>
.chapter {
    padding: 1rem;
    background-color: var(--card-background);
    color: var(--card-text);
    border-radius: 0.5rem;
}

.chapter h3 {
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
}
</style>
