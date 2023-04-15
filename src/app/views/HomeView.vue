<script setup lang="ts">
import { ref, type Ref } from 'vue';

const count: Ref<string | number> = ref(10);
</script>

<template>
  <main>
    <div class="center">
      <div class="start-button shadow">
        <span>Start Quiz!</span>
      </div>

      <div class="count-button low-count shadow" :class="{ selected: count === 10 }" @click="count = 10">
        10
      </div>
      <div class="count-button mid-count shadow" :class="{ selected: count === 25 }" @click="count = 25">
        25
      </div>
      <div
        class="count-button high-count shadow"
        :class="{ selected: count === 'all' }"
        @click="count = 'all'"
      >
        all
      </div>
    </div>

    <RouterLink to="/library" class="library-button shadow"> Library </RouterLink>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  display: grid;
  grid-template-rows: 5rem 1fr 5rem;
  grid-template-columns: 10% 80% 10%;
}

.library-button {
  grid-row: 3/3;
  grid-column: 2/2;
  justify-self: stretch;
  align-self: center;

  background-color: var(--card-background);
  border-radius: 0.5rem;

  text-align: center;
  line-height: 3rem;
}

.center {
  grid-row: 2 / 2;
  grid-column: 2 / 2;
  justify-self: stretch;
  align-self: center;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 10rem 3rem;
  justify-items: stretch;
  align-items: stretch;
  gap: 0.5rem;
}

.start-button {
  grid-row: 1 / 1;
  grid-column: 1 / span 3;
  background-color: var(--card-background);
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
}

.count-button {
  background-color: var(--card-background);
  border-radius: 0.5rem;
  text-align: center;
  align-self: center;
  line-height: 3;
}

.count-button.selected {
  font-weight: bold;
}

.low-count {
  grid-row: 2/2;
  grid-column: 1/1;
}

.mid-count {
  grid-row: 2/2;
  grid-column: 2/2;
}

.high-count {
  grid-row: 2/2;
  grid-column: 3/3;
}
</style>
