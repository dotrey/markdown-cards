<script setup lang="ts">
import router from '../router';

const props = defineProps(['book']);
</script>

<template>
    <div class="book" @click="() => router.push({
        name: 'book',
        params: {
            id: book.id
        }
    })">
        <h3>{{  book.title }}</h3>
        <div>

        </div>
    </div>
</template>

<style scoped>
.book {
    padding: 1rem;
    background-color: var(--color-background);
    border-radius: 0.5rem;
}

.book h3 {
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
}
</style>
