<script setup lang="ts">
</script>

<template>
    <div class="spinner-container">
        <div class="spinner">
        </div>
    </div>
</template>

<style scoped>
    .spinner-container {
        position: relative;
        width: 100%;
        height: 8em;

        display: grid;
        place-items: center;
    }

    .spinner {
        position: relative;
        width: 4em;
        height: 4em;

        border: 5px solid var(--main-text-sub);
        border-right-color: var(--accent);
        border-radius: 50%;
        animation: rotateSpinner 800ms linear infinite;
    }

    @keyframes rotateSpinner {
        to {
            transform: rotate(360deg);
        }
    }
</style>