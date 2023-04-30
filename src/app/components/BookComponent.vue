<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import CheckboxComponent from './CheckboxComponent.vue';

const props = defineProps(['book']);
const checked = ref(false);
function change(value: boolean) {
    checked.value = value;
}
</script>

<template>
    <div class="book shadow">
        <h3 @click="() => router.push({
        name: 'book',
        params: {
            id: book.id
        }
    })">{{  book.title }}</h3>
        <label class="checkbox">
            <CheckboxComponent :checked="checked" :partial="true" @change="change"></CheckboxComponent>
        </label>
        <div>
        </div>
    </div>
</template>

<style scoped>
.book {
    background-color: var(--card-background);
    color: var(--card-text);
    border-radius: 0.5rem;

    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: auto auto;
    grid-template-areas: 
        "check title"
        "status status"
    ;
}

.book h3 {
    grid-area: title;
    justify-self: start;
    align-self: center;
    padding: 1rem;
    margin: 0;
    font-size: 1.25rem;
}

.checkbox {
    grid-area: check;
    justify-self: center;
    align-self: center;
    width: 2rem;
    height: 2rem;
} 
</style>
