<script setup lang="ts">
const props = defineProps<{
    checked: boolean,
    partial?: boolean
}>();
const emit = defineEmits<{
    (e: "change", checked: boolean): void
}>();
</script>

<template>
    <label :class="{ checked: props.checked, partial: props.partial }">
        <input type="checkbox" :checked="props.checked" @change="$emit('change', !props.checked)" />
    </label>
</template>

<style scoped>
label {
    display: grid;
    grid-template-columns: 5% 90% 5%;
    grid-template-rows: 5% 90% 5%;
    grid-template-areas: 
        ". . ."
        ". c ."
        ". . ."
    ;
    justify-items: stretch;
    align-items: stretch;

    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
}

label input {
    opacity: 0;
    position: absolute;
    pointer-events: none;
}

label::before {
    grid-area: c;
    display: block;
    content: "";
    border: 2px solid var(--main-text);
    border-radius: 4px;
}

label.checked::after {
    grid-area: c;
    display: block;
    content: "";
    width: 59%;
    aspect-ratio: 1 / 1;
    background: var(--accent);
    justify-self: center;
    align-self: center;
    border-radius: 4px;
}

label.partial.checked::after {
    background: repeating-linear-gradient(
        -45deg,
        var(--accent),
        var(--accent) 0.2rem,
        transparent 0.2rem,
        transparent 0.4rem
    );
}
</style>