<script setup lang="ts">
const props = defineProps(["card"]);
</script>

<template>
    <div class="card shadow">
        <h3>{{ card.sides[0].text.title }}</h3>
        <p>{{  card.sides[0].text.body  }}</p>
        <hr>
        <h3>{{ card.sides[1].text.title }}</h3>
        <p>{{  card.sides[1].text.body  }}</p>
    </div>

</template>

<style scoped>
.card {
    padding: 1rem;
    background-color: var(--card-background);
    color: var(--card-text);
    border-radius: 0.5rem;
}

.card h3 {
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
}
</style>