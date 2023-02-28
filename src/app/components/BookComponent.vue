<script setup lang="ts">
import type { Book } from '@/core/model/Book';

const props = defineProps(['book']);
</script>

<template>
    <div>
        {{  book.title }}
    </div>
</template>

<style scoped></style>
